<script lang="ts">
	import ApiKeyModal from '$lib/components/ApiKeyModal.svelte';
	import FaqSection from '$lib/components/home/FaqSection.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import PaperScroller from '$lib/components/home/PaperScroller.svelte';
	import ProcessSection from '$lib/components/home/ProcessSection.svelte';
	import SponsorsSection from '$lib/components/home/SponsorsSection.svelte';
	import { api_key, tutorial_done } from '$lib/js/store.js';
	import { normalizeGeminiApiKey } from '$lib/js/toolkit.js';
	import { goto } from '$app/navigation';

	let showApiKeyModal = false;
	let tempApiKey = '';

	$: nextRoute = $tutorial_done ? '/generate' : '/tutorial';

	function openApiKeyModal() {
		tempApiKey = normalizeGeminiApiKey($api_key);
		showApiKeyModal = true;
	}

	function closeApiKeyModal() {
		showApiKeyModal = false;
		tempApiKey = '';
	}

	async function handleGetStarted() {
		if (!normalizeGeminiApiKey($api_key)) {
			openApiKeyModal();
			return;
		}

		await goto(nextRoute);
	}

	async function saveApiKeyAndProceed() {
		const trimmed = normalizeGeminiApiKey(tempApiKey);
		if (!trimmed) {
			window.alert('Please enter a valid API key.');
			return;
		}

		if (typeof window !== 'undefined') {
			window.localStorage.setItem('gemini_api_key', trimmed);
		}
		$api_key = trimmed;
		closeApiKeyModal();
		await goto(nextRoute);
	}
</script>

<svelte:head>
	<title>Paper2card</title>
	<meta name="description" content="Generating design cards by harnessing generative AI" />
</svelte:head>

<section class="bg-gray-50">
	<PaperScroller />
	<HeroSection ctaHref={nextRoute} on:getstarted={handleGetStarted} />
</section>

<ApiKeyModal
	open={showApiKeyModal}
	bind:value={tempApiKey}
	title="API Key Required"
	description="To generate a card, please enter your Gemini API key. This is required to access the generative AI models. You can obtain one at"
	note="Note that Paper2card requires an API key with a paid quota tier, as it uses a text/image generation model."
	inputPlaceholder="Enter your key here"
	primaryLabel="Save & Continue"
	on:close={closeApiKeyModal}
	on:save={saveApiKeyAndProceed}
/>

<ProcessSection />
<FaqSection />
<SponsorsSection />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
