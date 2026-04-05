<script lang='ts'>
	import { onMount } from 'svelte';
	import Icon from "$lib/images/favicon.png"
	import CircularProgress from '@smui/circular-progress';
	import { card_front, card_back, card_color, card_image, card_citation, segments, segment, customization_input_who, customization_input_what, card_title, card_description, card_summary, card_third, card_evidence, fileDir, tooltip_data, disclaimer_open } from '$lib/js/store.js';
	import { cardDefaultHTML, cardCustomHTML, cardCSS, capitalizeFirstLetter, jsonConcat, truncateText, saveForStudy, authenticatedJsonFetch, getGeminiApiKey } from '$lib/js/toolkit.js';
	import StarRating from "@ernane/svelte-star-rating";
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import { useToast } from 'svelte-easy-toast/toast.store.svelte.js';

	let ToastStore = useToast();
	
	$: card_default = cardDefaultHTML($card_front, $card_back[thirdIndex == 0 ? 0 : 1]);
	$: card_custom = cardCustomHTML((($card_third.length != 0) && (thirdIndex != 0)) ? $card_third[thirdIndex-1] : "");
	$: card_css = cardCSS($card_color);

	const baseURL = "http://0.0.0.0:8000"

	let card_id = "";
	let files;

	let cardID = "";

	let isLoading = false;
	let isThirdLoading = false;

	let isReady = false;

	$: thirdIndex = 0;

	let stage = [false, false, false];

	let isPaperUploaded = false;
	let isSelectingSegments = false;

	let segmentIdx = [];
	let savedCardPath = "";

	function resolveAssetUrl(url) {
		if (!url) {
			return '';
		}
		if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
			return url;
		}
		const normalizedPath = url.startsWith('/') ? url : `/${url}`;
		return `${baseURL}${normalizedPath}`;
	}

	async function saveCard(url) {
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
			var data = new FormData()
			data.append('file', files[0])

			let result_json = await authenticatedJsonFetch(`${baseURL}/store`, { method: 'POST', body: data });

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

	async function paragraphChosen(text) {
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
			$card_back.push(result_json["card_back"]);
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

	async function customizationInput(input_who, input_what, input_stage) {
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
				$card_back.push(result_json["card_back_custom"]);
				$card_back = $card_back;

				$tooltip_data = result_json["card_data"];
			}
			else {
				$tooltip_data = jsonConcat($tooltip_data, result_json["card_data"]);
			}
			
			$card_third.push(result_json["card_third"]);
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

	async function fetchAndStorePDF(url) {
		try {
			const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(url));
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const pdfBlob = await response.blob();
			const pdfFile = new File([pdfBlob], 'downloaded_from_url.pdf', { type: 'application/pdf' });
			
			return pdfFile;
		} catch (error) {
			showError();
			throw new Error(error);
		}
	}

	function checkTooltipAndImage() {
		setTimeout(() => {
			const candidates = ["method_1", "method_2", "custom_method_1", "custom_method_2", "custom_metric_1", "custom_metric_2", "custom_understanding_1", "custom_understanding_2"]
			for (let candidate of candidates) {
				if ($tooltip_data.hasOwnProperty(`${candidate}_detail`)) {
					tippy(`#${candidate}`, {
						interactive: true,
						allowHTML: true,
						content: `
						<div style="padding: 5px 0">
							<p style="font-size: 11px !important; font-weight: 500 !important;">${$tooltip_data[`${candidate}_detail`]}</p>
							<div style="background-color: #efefef; padding: 5px 7px !important; margin-top: 7px; border-radius: 3px;">
								<p style="font-size: 10px !important; line-height: 12px; color: #333; font-style: italic;">"${truncateText($tooltip_data[`${candidate}_section_text`], 500)}" ('${$tooltip_data[`${candidate}_section_title`]}' section)</p>
							</div>
						</div>
						`,
					});
				}
			}
			if ((document.getElementById("figure_modal") != null) && (document.getElementById("figure_image") != null) && (document.getElementById("img01") != null)) {
				var modal = document.getElementById("figure_modal")!;
				var img = document.getElementById("figure_image")!;
				var modalImg = document.getElementById("img01")!;
				img.onclick = function(){
					modal.style.display = "block";
					modalImg.src = this.src;
				}
				modal.onclick = function() {
					modal.style.display = "none";
				}
			}
			var span = document.getElementsByClassName("close")[0];
			span.onclick = function() {
				modal.style.display = "none";
			}
		}, 50);
	}

	function showError(error='Server is not running. Contact developer!') {
		console.error("[paper2card]", error);
		ToastStore.show({
			type: 'error',
			position: 'top-right',
			title: 'Error',
			delay: 3000,
			text: error,
	    });
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

</script>


<svelte:head>
	<title>Generate cards</title>
	<meta name="description" content="Interface of Paper to Card" />
</svelte:head>

<section class="bg-gray-50 px-1">
	<div class="flex flex-col items-center justify-center antialiased mb-4 text-gray-800 w-full">
		{#if isLoading}
		<div class="flex items-center">
			<CircularProgress style="height: 80px; width: 80px;" indeterminate />
		</div>
		<p class="font-heading mt-4 text-lg font-bold lg:text-xl text-center">Loading..<br><span class="text-md lg:text-lg font-light">This may take up to 1 minute</span></p>
		{:else}
		{#if isReady}
		<div class="flex items-start">
			<div class="flex flex-col">
				{#if !isThirdLoading}
				<div class="flex mb-6 items-center">
					<div>
						<input bind:value={card_id} type="url" id="url" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md block w-full p-2.5" placeholder="N_s_1, N_s_2, N_d_1, N_d_2" required/>
					</div>
					<div class="grow">
						<button class="bg-gray-300 ms-5 hover:bg-gray-500 text-xs text-black font-medium py-1 px-1.5 rounded" on:click={() => {
							saveForStudy(card_id, $card_front, $card_back[$card_back.length-1], $card_citation, $card_color, $card_evidence, $fileDir, $segment, $card_summary)
						}}>
							<span>Save for study</span>
						</button>
					</div>
				</div>
				<!--
				<div class="flex items-center mb-4">
					<div class="flex-none bg-white px-3 py-2 border rounded-md">
						<p class="text-xs text-center mb-2 font-medium">Rate this card!</p>
						<StarRating bind:config on:change={() => { cardScore = config.score;  isFeedbackOpen = true; }}/>
					</div>
				</div>
				-->
				{/if}
				<div contenteditable="false" id="card_div" class="mb-8" bind:innerHTML={card_default} />
				<div contenteditable="false" id="card_div" bind:innerHTML={card_custom} />
				<div contenteditable="false" bind:innerHTML={card_css}/>
			</div>
			{#if isThirdLoading}
			<div class="px-6">
				<div class="flex items-center justify-center">
					<CircularProgress style="height: 50px; width: 50px;" indeterminate />
				</div>
				<p class="font-heading mt-3 text-lg font-bold text-center">Customizing cards..<br><span class="text-sm lg:text-md font-light">This may take up to 1 minute</span></p>
			</div>
			{/if}
			{#if !isThirdLoading}
			<form class="bg-white shadow-xl rounded-lg ml-8 p-3.5 mt-12 hidden sm:block">
				<div class="mb-5">
					<p class="mt-1 mb-1 text-xs font-medium leading-4">How do you want to customize these<br>cards for your own design work?</p>
					<p class="block mt-2 mb-4 font-light text-xs text-gray-900">In a plain language, describe:</p>
					<div class="mt-5">
						<label for="message" class="block mb-2 font-light text-xs text-gray-900"><span class="font-medium">What</span> are you designing for?</label>
						<textarea id="message" rows="2" class="block p-1.5 w-full text-xs text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-xs" placeholder="ex) modality, pain points, client/company, domain, metric" bind:value={$customization_input_who}></textarea>
					</div>
					<div class="mt-4">
						<label for="message" class="block mb-2 font-light text-xs text-gray-900"><span class="font-medium">Who</span> are you designing for?</label>
						<textarea id="message" rows="2" class="block p-1.5 w-full text-xs text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-xs" placeholder="ex) description of the target user, demographics, or persona" bind:value={$customization_input_what}></textarea>
					</div>
					<div class="my-4">
						<p class="block mb-2 font-normal text-xs text-gray-900"><span class="font-medium">Why</span> do you need this? <span class="font-light">(optional)</span></p>
						<div class="flex mb-2">
							<label class="w-56 text-xs font-light">
								<input type="checkbox" bind:checked={stage[0]} />
								<span class="font-normal ps-1">Research</span>: Investigating the problem space design is intended to address
							</label>
						</div>
						<div class="flex mb-2">
							<label class="w-56 text-xs font-light">
								<input type="checkbox" bind:checked={stage[1]} />
								<span class="font-normal ps-1">Ideate</span>: Generating design ideas through creative brainstorming
							</label>
						</div>
						<div class="flex">
							<label class="w-56 text-xs font-light">
								<input type="checkbox" bind:checked={stage[2]} />
								<span class="font-normal ps-1">Evaluate</span>: Assessing if and how people can use the design solution
							</label>
						</div>
					</div>
				</div>
				<div class="flex text-center justify-center">
					<button class="bg-gray-300 hover:bg-slate-500 text-black font-medium text-xs py-1.5 px-3 rounded focus:outline-none focus:shadow-outline" type="button" on:click={() => {customizationInput($customization_input_who, $customization_input_what, stage);}}>
					Customize!
					</button>
				</div>
			</form>
			{/if}
		</div>
		
		{:else}
		{#if !isPaperUploaded}
			{#if files}
			<div class="w-full max-w-3xl">
				<p class="font-heading mb-4 text-lg font-bold lg:text-xl text-gray-700">Do you want to use this PDF to generate design card?</p>
				<div class="flex flex-col items-center justify-center w-full">
					<div class="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-400 bg-gray-100">
						<div class="flex flex-col items-left justify-center py-6">
							<p class="mb-2 text-md text-gray-600"><span class="font-semibold">File name</span>&nbsp;&nbsp;&nbsp;{files[0].name}</p>
							<p class="text-md text-gray-600"><span class="font-semibold">File size</span>&nbsp;&nbsp;&nbsp;{(files[0].size / (1024*1024)).toFixed(2)}MB</p>
						</div>
					</div>
					<div class="flex mt-6">
						<button on:click={upload} class="bg-slate-500 mr-4 hover:bg-slate-700 text-white font-bold py-2 mt-4 px-4 rounded">
						Upload PDF
						</button>
						<button on:click={() => {
							files = null;
						}} class="bg-gray-300 hover:bg-gray-400 text-gray-500 hover:text-white font-bold py-2 mt-4 px-4 rounded">
						Choose again
						</button>
					</div>
				</div> 
			</div>
			{:else}
			<div class="w-full max-w-3xl">
				<p class="font-heading mb-6 text-lg font-bold lg:text-xl text-gray-700">First, upload a PDF paper.</p>

				<div>
					<label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100">
						<div class="flex flex-col items-center justify-center pt-5 pb-6">
							<svg class="w-8 h-8 mb-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
							</svg>
							<p class="mb-2 text-sm text-gray-600"><span class="font-semibold">Click to upload</span></p>
							<p class="text-xs text-gray-600">* PDF only</p>
						</div>
						<input bind:files id="dropzone-file" name="dropzone-file" accept='.pdf' type="file" class="hidden" />
					</label>
				</div>
				<div class="mt-6">
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900">Or, add a link to PDF file:</label>
					<div class="flex gap-2">
						<input bind:value={file_url} type="url" id="url" class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md block w-full p-2.5" placeholder="https://abc.com/file.pdf" required/>
						<button disabled={file_url == ""} type="submit" class="text-gray-800 bg-gray-300 hover:bg-gray-500 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-2 text-center" on:click={() => {
							fetchAndStorePDF(file_url)
							.then(pdf_file => {
								files = [pdf_file];
							})
							.catch((error) => {
								showError();
							})
						}}>Submit</button>
					</div>
				</div>
			</div>
		{/if}
		{:else}
		<div class="w-full max-w-3xl my-6">
			<p class="font-heading mb-4 text-lg font-bold lg:text-xl text-gray-700">Next, select the range of paragraph(s) that you want to generate design card from.</p>

			{#if ["guideline", "implication"].some(phrase => ($segments.map(elem => {return (elem[0].toString()+elem[1]).toLowerCase()}).join("").includes(phrase)))}
			<p class="font-heading mt-6 mb-4 text-md lg:text-md text-gray-700">Recommended paragraphs:</p>
			{/if}
			{#each $segments as segment, idx}
			{#if ["guideline", "implication"].some(phrase => (segment[0].toString()+segment[1]).toLowerCase().includes(phrase))}
			<div class="border-2 border-gray-400 {((segmentIdx.length != 0) && (Math.max(...segmentIdx) >= idx) && (Math.min(...segmentIdx) <= idx)) ? 'bg-gray-200':'bg-white'} p-4 mb-4 flex flex-col justify-between leading-normal">
				<a href="#" on:click={() => {isSelectingSegments = true; segmentIdx.push(idx); segmentIdx=segmentIdx;}}><!--paragraphChosen(segment[2])-->
					{#if segment[0] != -1}
					<div class="text-gray-700 font-bold text-xs mb-2">Section {segment[0]}: {capitalizeFirstLetter(segment[1].replace('.', '').toLowerCase())}</div>
					{:else}
					<div class="text-gray-600 font-bold text-xs mb-2">Section '{segment[1]}'</div>
					{/if}
					<p class="text-gray-600 text-xs">{segment[2]}</p>
				</a>
			</div>
			{/if}
			{/each}


			<p class="font-heading mt-6 pt-6 mb-4 text-md lg:text-md text-gray-700">All paper paragraphs:</p>
			{#each $segments as segment, idx}
			<div class="border-2 border-gray-400 {((segmentIdx.length != 0) && (Math.max(...segmentIdx) >= idx) && (Math.min(...segmentIdx) <= idx)) ? 'bg-gray-200':'bg-white'} p-4 mb-4 flex flex-col justify-between leading-normal">
				<a href="#" on:click={() => {isSelectingSegments = true; segmentIdx.push(idx); segmentIdx=segmentIdx;}}><!--paragraphChosen(segment[2])-->
					{#if segment[0] != -1}
					<div class="text-gray-700 font-bold text-xs mb-2">Section {segment[0]}: {capitalizeFirstLetter(segment[1].replace('.', '').toLowerCase())}</div>
					{:else}
					<div class="text-gray-600 font-bold text-xs mb-2">Section '{segment[1]}'</div>
					{/if}
					<p class="text-gray-600 text-xs">{segment[2]}</p>
				</a>
			</div>
			{/each}
		</div>
		{/if}
	{/if}
	{/if}
	</div>

	{#if isSelectingSegments}
	<div class="float bg-gray-200 shadow-lg border border-gray-400">
		<button class="float-button text-slate-700 pl-4" on:click={() => {isSelectingSegments = false; segmentIdx = []}}>Reselect</button>
		<button class="float-button ml-2 bg-blue-500 text-white pl-2 pr-3" on:click={() => {
			let segmentTexts = $segments.map((x) => x[2]);
			let finalSegment = segmentTexts.slice(Math.min(...segmentIdx), Math.max(...segmentIdx)+1).join("\n");
			isSelectingSegments = false;
			paragraphChosen(finalSegment);
		}}><img class="inline-block inner-img" src={Icon}>Generate using {Math.max(...segmentIdx)-Math.min(...segmentIdx)+1} paragrahs!</button>
	</div>
	{/if}
</section>

<div id="figure_modal" class="modal">
	<span class="close">&times;</span>
	<img class="modal-content" id="img01">
</div>

<style>
	.float {
		position:fixed;
		bottom: 15px;
		padding: 3px 3px;
		left: auto;
		right: auto;
		border-radius: 18px;
		text-align:center;
	}
	.inner-img {
		height: 18px !important;
		margin-bottom: 4px;
		margin-right: 5px;
	}
	.float-button {
		height: 35px;
		border-radius: 15px;
		font-size: 14px;
	}
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

    .icon {
        width: 15px;
        display: inline;
        margin-right: 5px;
        position: relative;
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

	:global(#figure_image) {
		cursor: zoom-in;
	}
	.modal {
		display: none; /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		padding-top: 100px; /* Location of the box */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0,0,0); /* Fallback color */
		background-color: rgba(0,0,0,0.5); /* Black w/ opacity */
		cursor: pointer
	}
	.modal-content {
		margin: auto;
		display: block;
		max-width: 95%;
		max-height: 95%;
		animation-name: zoom;
		animation-duration: 0.3s;
		cursor: default !important
	}
	@keyframes zoom {
		from {transform:scale(0)}
		to {transform:scale(1)}
	}
	.close {
		position: absolute;
		top: 15px;
		right: 35px;
		color: #f1f1f1;
		font-size: 40px;
		font-weight: bold;
		transition: 0.3s;
	}

	.close:hover, .close:focus {
		color: #bbb;
		text-decoration: none;
		cursor: pointer;
	}
	@media only screen and (max-width: 700px){
		.modal-content {
			width: 100%;
		}
	}

</style>
