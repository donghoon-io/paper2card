<script lang="ts">
	import FaqSection from '$lib/components/home/FaqSection.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import PaperScroller from '$lib/components/home/PaperScroller.svelte';
	import ProcessSection from '$lib/components/home/ProcessSection.svelte';
	import SponsorsSection from '$lib/components/home/SponsorsSection.svelte';
	import { tutorial_done } from '$lib/js/store.js';
</script>

<svelte:head>
	<title>Paper2card</title>
	<meta name="description" content="Generating design cards by harnessing generative AI" />
</svelte:head>

<section class="bg-gray-50">
	<PaperScroller />
	<HeroSection ctaHref={$tutorial_done ? '/generate' : '/tutorial'} />
</section>

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
