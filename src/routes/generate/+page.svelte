<script lang='ts'>
	import { onMount } from 'svelte';
	import CardResults from '$lib/components/generate/CardResults.svelte';
	import FigureModal from '$lib/components/generate/FigureModal.svelte';
	import GenerateDialogs from '$lib/components/generate/GenerateDialogs.svelte';
	import LoadingState from '$lib/components/generate/LoadingState.svelte';
	import SegmentSelector from '$lib/components/generate/SegmentSelector.svelte';
	import SelectionActions from '$lib/components/generate/SelectionActions.svelte';
	import UploadSection from '$lib/components/generate/UploadSection.svelte';
	import { card_front, card_back, card_color, card_image, card_citation, segments, segment, customization_input_who, customization_input_what, card_title, card_description, card_summary, card_third, card_evidence, fileDir, tooltip_data, disclaimer_open } from '$lib/js/store.js';
	import { cardDefaultHTML, cardCustomHTML, cardCSS, capitalizeFirstLetter, jsonConcat, truncateText, authenticatedJsonFetch, getGeminiApiKey } from '$lib/js/toolkit.js';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import { useToast } from 'svelte-easy-toast/toast.store.svelte.js';

	let ToastStore = useToast();
	
	$: card_default = cardDefaultHTML($card_front, $card_back[thirdIndex == 0 ? 0 : 1]);
	$: card_custom = cardCustomHTML((($card_third.length != 0) && (thirdIndex != 0)) ? $card_third[thirdIndex-1] : "");
	$: card_css = cardCSS($card_color);

	const baseURL = "https://136.117.14.148.nip.io"

	type PaperSegment = [number, string, string];
	type TooltipData = Record<string, string>;

	let files: File[] | null = null;

	let cardID = "";

	let isLoading = false;
	let isThirdLoading = false;

	let isReady = false;

	$: thirdIndex = 0;

	let stage = [false, false, false];

	let isPaperUploaded = false;
	let isSelectingSegments = false;

	let segmentIdx: number[] = [];

	let savedCardPath = "";

	function resolveAssetUrl(url: string) {
		if (!url) {
			return '';
		}

		if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
			return url;
		}

		const normalizedPath = url.startsWith('/') ? url : `/${url}`;
		return `${baseURL}${normalizedPath}`;
	}

	async function saveCard(url: string) {
		return authenticatedJsonFetch(`${baseURL}/cards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			title: $card_title,
			description: $card_description,
			summary: $card_summary,
			evidence: $card_evidence,
			color: $card_color,
			citation: $card_citation,
			image_url: url
			})
		});
	}

	async function saveFeedback() {
		await authenticatedJsonFetch(`${baseURL}/cards/${cardID}/feedback`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ feedback: cardFeedback, rating: cardScore })
		});
	}

	async function upload() {
		isLoading = true;
		try {
			if (!files?.[0]) {
				showError('Please choose a PDF first.');
				isLoading = false;
				return;
			}

			var data = new FormData()
			data.append('file', files[0])

			let result_json = await authenticatedJsonFetch(`${baseURL}/store`, { method: 'POST', body: data });

			if (!Array.isArray(result_json["segments"]) || result_json["segments"].length === 0) {
				isLoading = false;
				isPaperUploaded = false;
				showError('We could not extract any paragraphs from this PDF.');
				return;
			}

			$fileDir = result_json["filename"];
			$segments = result_json["segments"];

			isLoading = false;
			isPaperUploaded = true;
		}
		catch (error) {
			isLoading = false;
			isPaperUploaded = false;
			showError(error instanceof Error ? error.message : undefined);
		}	
	};

	async function paragraphChosen(text: string) {
		isLoading = true;
		isPaperUploaded = true;

		try {
			$card_back = [];
			$card_third = [];

			$segment = text;

			if (!getGeminiApiKey()) {
				showError('Set your Gemini API key in the header first.');
				isLoading = false;
				return;
			}

			let result_json = await authenticatedJsonFetch(`${baseURL}/card` + '?' + new URLSearchParams({
				filename: $fileDir,
				design_implication: text
			}), {
				method: 'POST'
			});
				
			const cardImageUrl = resolveAssetUrl(result_json["card_image"]);
			$card_front = result_json["card_front"].replace('IMAGE_LINK', cardImageUrl);
			($card_back as string[]).push(result_json["card_back"]);
			$card_back = $card_back;

			card_default = cardDefaultHTML($card_front, $card_back[0]);
			card_css = cardCSS(result_json["card_color"]);

			$customization_input_who = "";
			$customization_input_what = "";

			$card_color = result_json["card_color"];
			$card_image = cardImageUrl;

			$card_title = result_json["card_title"]
			$card_description = result_json["card_description"]
			$card_summary = result_json["card_summary"]
			$card_citation = result_json["card_citation"]

			$card_evidence = result_json["card_evidence"]

			let savedCard = await saveCard($card_image);

			cardID = savedCard["id"];
			savedCardPath = savedCard["card_path"];
			thirdIndex = $card_third.length;

			isLoading = false;
			isReady = true;
		}
		catch (error) {
			isLoading = false;
			isPaperUploaded = false;
			showError(error instanceof Error ? error.message : undefined);
		}
	};

	async function customizationInput(input_who: string, input_what: string, input_stage: boolean[]) {
		isThirdLoading = true;
		try {
			if (!getGeminiApiKey()) {
				showError('Set your Gemini API key in the header first.');
				isThirdLoading = false;
				return;
			}

			let result_json = await authenticatedJsonFetch(`${baseURL}/card_customize` + '?' + new URLSearchParams({
				id: $fileDir,
				segment: $segment,
				who: input_who,
				what: input_what,
				stage_1: input_stage[0] ? "yes":"no",
				stage_2: input_stage[1] ? "yes":"no",
				stage_3: input_stage[2] ? "yes":"no",
				summary_1: $card_summary[0],
				summary_2: $card_summary.length == 2 ? $card_summary[1] : "",
				evidence: $card_evidence,
				citation: $card_citation,
				is_regeneration: $card_third.length.toString()
			}), {
				method: 'POST'
			})

			if ($card_third.length == 0) {
				($card_back as string[]).push(result_json["card_back_custom"]);
				$card_back = $card_back;

				$tooltip_data = result_json["card_data"];
			}
			else {
				$tooltip_data = jsonConcat($tooltip_data, result_json["card_data"]);
			}
			
			($card_third as string[]).push(result_json["card_third"]);
			$card_third = $card_third;

			thirdIndex = $card_third.length;
			isThirdLoading = false;

			checkTooltipAndImage();
		}
		catch (error) {
			isThirdLoading = false;
			showError(error instanceof Error ? error.message : undefined);
		}
	};
	
	let file_url = "";
	let isDragging = false;
	
	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		if (event.dataTransfer?.files?.length) {
			const droppedFile = event.dataTransfer.files[0];
			if (droppedFile.type === "application/pdf") {
				files = [droppedFile];
			} else {
				showError("Only PDF format is accepted!");
			}
		}
	}

	function handleFilesChange(nextFiles: File[]) {
		files = nextFiles.length > 0 ? nextFiles : null;
	}

	async function fetchAndStorePDF(url: string) {
		try {
			const response = await fetch(url); // don't encode it
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const pdfBlob = await response.blob();
			const pdfFile = new File([pdfBlob], 'downloaded_from_url.pdf', { type: 'application/pdf' });
			
			return pdfFile;
		} catch (error) {
			showError();
			throw new Error(String(error));
		}
	}

	function checkTooltipAndImage() {
		setTimeout(() => {
				try {
					if (!isScrollable(document.getElementsByClassName("customization-super-container")[0])) {
						document.getElementsByClassName("customization-container")[0].setAttribute('style', 'margin: 10px !important');
					}
				}
				catch {}

			const candidates = ["method_1", "method_2", "custom_method_1", "custom_method_2", "custom_metric_1", "custom_metric_2", "custom_understanding_1", "custom_understanding_2"]
			const data = $tooltip_data as TooltipData;
			for (let candidate of candidates) {
				if (data.hasOwnProperty(`${candidate}_detail`)) {
					tippy(`#${candidate}`, {
						interactive: true,
						allowHTML: true,
						content: `
						<div style="padding: 5px 0">
							<p style="font-size: 11px !important; font-weight: 500 !important;">${data[`${candidate}_detail`]}</p>
							<div style="background-color: #efefef; padding: 5px 7px !important; margin-top: 7px; border-radius: 3px;">
								<p style="font-size: 10px !important; line-height: 12px; color: #333; font-style: italic;">"${truncateText(data[`${candidate}_section_text`].replace(/(\r\n|\n|\r)/gm, ""), 500)}" ('${data[`${candidate}_section_title`]}' section)</p>
							</div>
						</div>
						`,
					});
				}
			}
			if ((document.getElementById("figure_modal") != null) && (document.getElementById("figure_image") != null) && (document.getElementById("img01") != null)) {
				var modal = document.getElementById("figure_modal")!;
				var img = document.getElementById("figure_image") as HTMLImageElement;
				var modalImg = document.getElementById("img01") as HTMLImageElement;
				img.onclick = function() {
					modal.style.display = "block";
					modalImg.src = img.src;
				}
				modal.onclick = function() {
					modal.style.display = "none";
				}
			}
			var span = document.getElementsByClassName("close")[0] as HTMLElement;
			span.onclick = function() {
				modal.style.display = "none";
			}
		}, 50);
	}

	function showError(error="Server is not running. Contact developer!") {
		console.error("[paper2card]", error);
	    ToastStore.show({
			type: 'error',
			position: 'top-right',
			title: 'Error',
			delay: 3000,
			text: error,
	    });
	}
	
	function isScrollable(e: any){
		if (e.scrollTopMax !== undefined) {
			return e.scrollTopMax > 0;
		}
		if (e == document.scrollingElement) {
			return e.scrollHeight > e.clientHeight;
		}
		return e.scrollHeight > e.clientHeight && ["scroll", "auto"].indexOf(getComputedStyle(e).overflowY) >= 0;
	}
	
	onMount(()=> {
		thirdIndex = $card_third.length;
		checkTooltipAndImage();
	})

	let isSavingOpen = false;

	let isSaved = true;
	let isCopied = false;
	let isGenerationTried = false;
	let savedLink = "";

	let isFeedbackOpen = false;
	let config = {
		readOnly: false,
		countStars: 5,
		range: { min: 0, max: 5, step: 0.5 },
		score: 0,
		showScore: true,
		scoreFormat: function(){ return `(${this.score.toFixed(1)}/${this.countStars})` },
		starConfig: { size: 20, fillColor: '#F9ED4F', strokeColor: "#000000", unfilledColor: '#fff', strokeUnfilledColor: '#000000' }
	}
	let cardScore = 5;
	let cardFeedback = "";

	function handleSegmentSelect(idx: number) {
		isSelectingSegments = true;
		segmentIdx.push(idx);
		segmentIdx = segmentIdx;
	}

	function resetSelection() {
		isSelectingSegments = false;
		segmentIdx = [];
	}

	function generateFromSelection() {
		let segmentTexts = ($segments as PaperSegment[]).map((x) => x[2]);
		let finalSegment = segmentTexts.slice(Math.min(...segmentIdx), Math.max(...segmentIdx) + 1).join("\n");
		isSelectingSegments = false;
		paragraphChosen(finalSegment);
	}

	function openShareDialog() {
		isSavingOpen = true;
		isSaved = false;
		savedLink = "";
		isCopied = false;
		isGenerationTried = false;

		savedLink = `${baseURL}${savedCardPath}`;
		isSaved = true;
		isGenerationTried = true;
	}

	function copySavedLink() {
		alert(savedLink);
		isCopied = true;
	}

	async function submitPdfUrl() {
		try {
			const pdf = await fetchAndStorePDF(file_url);
			files = [pdf];
		} catch {
			showError();
		}
	}

</script>


<svelte:head>
	<title>Generate cards</title>
	<meta name="description" content="Interface of Paper to Card" />
</svelte:head>

<GenerateDialogs
	bind:isSavingOpen
	{isGenerationTried}
	{isSaved}
	{savedLink}
	{isCopied}
	bind:isFeedbackOpen
	bind:cardFeedback
	onCopy={copySavedLink}
	onCloseSave={() => { isSavingOpen = false; }}
	onFeedbackSubmit={() => {
		saveFeedback();
		isFeedbackOpen = false;
	}}
/>

<section class="bg-gray-50 px-1">
	<div class="flex flex-col items-center justify-center antialiased mb-4 text-gray-800 w-full">
		{#if isLoading}
		<LoadingState />
		{:else}
		{#if isReady}
		<CardResults
			{isThirdLoading}
			cardDefaultHtml={card_default}
			cardCustomHtml={card_custom}
			cardCss={card_css}
			bind:customizationWho={$customization_input_who}
			bind:customizationWhat={$customization_input_what}
			{stage}
			disclaimerOpen={$disclaimer_open}
			onShare={openShareDialog}
			onCustomize={() => {customizationInput($customization_input_who, $customization_input_what, stage);}}
			onDismissDisclaimer={() => {$disclaimer_open = true;}}
		/>
		
		{:else}
		{#if !isPaperUploaded}
			<UploadSection
				{files}
				bind:fileUrl={file_url}
				bind:isDragging
				onDrop={handleDrop}
				onFilesChange={handleFilesChange}
				onUpload={upload}
				onReset={() => { files = null; }}
				onFileUrlSubmit={submitPdfUrl}
			/>
		{:else}
		<SegmentSelector segments={$segments as PaperSegment[]} selectedIndices={segmentIdx} onSelect={handleSegmentSelect} />
		{/if}
	{/if}
	{/if}
	</div>

	{#if isSelectingSegments}
	<SelectionActions selectedIndices={segmentIdx} onReset={resetSelection} onGenerate={generateFromSelection} />
	{/if}
</section>

<FigureModal />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	:global(.mdc-circular-progress__indeterminate-circle-graphic){ 
		stroke: rgb(64, 64, 64) !important
	}
	:global(.mdc-dialog__title) {
		font-size: 15px !important;
		padding-bottom: 0 !important;
	}
	:global(.mdc-dialog__content) {
		font-size: 13px !important;
		padding-bottom: 10px !important;
	}
	:global(.show-score) {
		font-size: 13px !important;
	}
	:global(.mdc-button__label) {
		font-size: 13px !important;
	}
	:global(.stars > svg > path) {
		stroke-width: 5 !important;
	}
	:global(.slider) {
		width: 100% !important;
	}
	:global(.tooltip_hyperlink) {
		text-decoration: underline;
		color: #ffffff !important;
	}
	:global(.tooltip_hyperlink:visited) {
		color: #ffffff !important;
	}

</style>
