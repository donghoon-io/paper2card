<script lang="ts">
	import { onMount } from 'svelte';
	import { paperPreviews } from '$lib/data/home';

	function addAnimation(scroller: HTMLDivElement) {
		if (scroller.dataset.animated === 'true') {
			return;
		}

		scroller.dataset.animated = 'true';
		const scrollerInner = scroller.querySelector('.scroller__inner');

		if (!scrollerInner) {
			return;
		}

		const scrollerContent = Array.from(scrollerInner.children);

		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true) as Element;
			duplicatedItem.setAttribute('aria-hidden', 'true');
			scrollerInner.appendChild(duplicatedItem);
		});
	}

	let scroller: HTMLDivElement;

	onMount(() => {
		addAnimation(scroller);
	});
</script>

<div class="scroller" bind:this={scroller}>
	<div class="scroller__inner">
		{#each paperPreviews as paper}
			<div class="paper-container">
				<img class="paper" src={paper.image} alt="" />
				<p class="paper-title">{paper.title}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.paper-container {
		width: 200px;
	}

	.paper {
		width: 200px;
	}

	.paper-title {
		text-align: center;
		font-size: 10px;
		margin-top: 5px;
		color: #666;
		line-height: 1.1;
	}

	.scroller__inner {
		padding-block: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	.scroller {
		width: 100vw;
		overflow: hidden;
		-webkit-mask: linear-gradient(90deg, white 0%, white 84%, transparent 100%);
		mask: linear-gradient(90deg, white 0%, white 84%, transparent 100%);
		--_animation-direction: reverse;
		--_animation-duration: 40s;
	}

	.scroller .scroller__inner {
		width: max-content;
		flex-wrap: nowrap;
		animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear infinite;
	}

	@keyframes scroll {
		to {
			transform: translate(calc(-50% - 0.5rem));
		}
	}
</style>
