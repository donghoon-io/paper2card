<script lang="ts">
	import { Accordion, AccordionItem } from 'svelte-collapsible';
	import { faqItems } from '$lib/data/home';

	let key: string | undefined;
</script>

<section class="my-4 py-4">
	<div class="w-full max-w-3xl min-w-0 mx-auto px-4 box-border overflow-hidden">
		<p class="px-4 font-heading mb-8 text-xl lg:text-2xl font-bold text-left lg:text-center">FAQ</p>
		<Accordion bind:key>
			{#each faqItems as item}
				<AccordionItem key={item.key}>
					<div slot="header" class="flex items-center w-full min-w-0">
						<div class="flex-1 min-w-0">
							<p class="font-regular p-4 text-md text-left break-words">{item.title}</p>
						</div>
						{#if key === item.key}
							<svg fill="#999" height="18px" width="18px" viewBox="0 0 330 330">
								<path
									d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394  l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393  C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
								/>
							</svg>
						{:else}
							<svg fill="#999" height="18px" width="18px" viewBox="0 0 330 330">
								<path
									d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
								/>
							</svg>
						{/if}
					</div>
					<div slot="body" class="px-4 pb-4 text-sm font-light break-words">
						{@html item.text}
					</div>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</section>

<style>
	:global(.accordion) {
		margin: 0 auto;
	}

	:global(.accordion-item) {
		border-bottom: 1px solid rgb(209, 209, 209);
	}

	:global(.accordion-item-header) {
		width: 100%;
	}
</style>
