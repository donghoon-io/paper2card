<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/js/toolkit.js';

	type PaperSegment = [number, string, string];

	export let segments: PaperSegment[];
	export let selectedIndices: number[];
	export let onSelect: (idx: number) => void;

	const recommendedPhrases = ['guideline', 'implication'];

	function isRecommended(segment: PaperSegment) {
		return recommendedPhrases.some((phrase) =>
			`${segment[0].toString()}${segment[1]}`.toLowerCase().includes(phrase)
		);
	}

	function isSelected(idx: number) {
		return selectedIndices.length !== 0 && Math.max(...selectedIndices) >= idx && Math.min(...selectedIndices) <= idx;
	}
</script>

<div class="w-full max-w-4xl px-6 py-6 md:px-10">
	<p class="font-heading mb-6 max-w-4xl text-lg font-bold leading-snug text-black lg:text-xl">
		Next, select the range of paragraph(s) that you want to generate design card from.
	</p>

	{#if recommendedPhrases.some((phrase) => segments.map((entry) => `${entry[0].toString()}${entry[1]}`.toLowerCase()).join('').includes(phrase))}
		<p class="font-heading mb-4 mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">Recommended paragraphs</p>
	{/if}

	{#each segments as item, idx}
		{#if isRecommended(item)}
			<div
				class="mb-4 flex flex-col justify-between rounded-[1.1rem] border p-4 leading-normal shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition-all duration-200"
				class:bg-slate-100={isSelected(idx)}
				class:border-slate-300={isSelected(idx)}
				class:shadow-[0_20px_55px_rgba(15,23,42,0.12)]={isSelected(idx)}
				class:bg-white={!isSelected(idx)}
				class:border-gray-200={!isSelected(idx)}
			>
				<button class="text-left" on:click={() => onSelect(idx)}>
					{#if item[0] !== -1}
						<div class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Section {item[0]}: {capitalizeFirstLetter(item[1].replace('.', '').toLowerCase())}</div>
					{:else}
						<div class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Section '{item[1]}'</div>
					{/if}
					<p class="max-w-none text-sm text-slate-600">{item[2]}</p>
				</button>
			</div>
		{/if}
	{/each}

	<p class="font-heading mb-4 mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">All paper paragraphs</p>
	{#each segments as item, idx}
		<div
			class="mb-4 flex flex-col justify-between rounded-[1.1rem] border p-4 leading-normal shadow-[0_16px_50px_rgba(15,23,42,0.07)] transition-all duration-200"
			class:bg-slate-100={isSelected(idx)}
			class:border-slate-300={isSelected(idx)}
			class:shadow-[0_20px_55px_rgba(15,23,42,0.12)]={isSelected(idx)}
			class:bg-white={!isSelected(idx)}
			class:border-gray-200={!isSelected(idx)}
		>
			<button class="text-left" on:click={() => onSelect(idx)}>
				{#if item[0] !== -1}
					<div class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Section {item[0]}: {capitalizeFirstLetter(item[1].replace('.', '').toLowerCase())}</div>
				{:else}
					<div class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Section '{item[1]}'</div>
				{/if}
				<p class="max-w-none text-sm text-slate-600">{item[2]}</p>
			</button>
		</div>
	{/each}
</div>
