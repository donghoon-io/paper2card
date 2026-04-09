<script lang="ts">
	import { authors, processSteps, publications } from '$lib/data/home';

	const stepStyles = {
		default: {
			circle: 'bg-slate-200',
			icon: 'text-slate-600',
			check: false
		},
		active: {
			circle: 'bg-slate-500',
			icon: 'text-white',
			check: true
		},
		success: {
			circle: 'bg-green-200',
			icon: 'text-green-700',
			check: false
		},
		gradient: {
			circle: 'bg-gradient-to-r from-gray-500 to-green-500',
			icon: 'text-white',
			check: true
		}
	} as const;
</script>

<section class="my-4 py-8 bg-white">
	<div class="p-4 max-w-3xl mx-auto">
		{#each processSteps as step, index}
			{@const style = stepStyles[step.variant]}
			<div class="flex">
				<div class="mr-4 flex flex-col items-center">
					<div>
						<div class={`flex h-10 w-10 items-center justify-center rounded-full ${style.circle}`}>
							{#if style.check}
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class={`h-6 w-6 ${style.icon}`}
								>
									<path d="M5 12l5 5l10 -10"></path>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class={`h-6 w-6 ${style.icon}`}
								>
									<path d="M12 5l0 14"></path>
									<path d="M18 13l-6 6"></path>
									<path d="M6 13l6 6"></path>
								</svg>
							{/if}
						</div>
					</div>
					{#if index < processSteps.length - 1}
						<div class="h-full w-px bg-gray-300"></div>
					{/if}
				</div>
				<div class={index < processSteps.length - 1 ? 'pt-1 pb-8' : 'pt-1'}>
					<p class="mb-2 text-lg font-bold text-gray-900">
						{step.title}
						{#if step.title === 'Provide your own designing context'}
							<span class="font-light text-sm">(optional)</span>
						{/if}
					</p>
					{#if step.description}
						<p class="text-gray-600 text-sm">{step.description}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<hr class="mt-10 w-full" style="color: #99999950" />

	<div class="w-full max-w-3xl min-w-0 mx-auto px-4 mt-8 box-border overflow-hidden">
		<p class="px-4 font-heading mb-12 text-xl lg:text-2xl font-bold text-left lg:text-center">
			Who made this?
		</p>
		<div class="flex w-full flex-wrap justify-center gap-6 md:gap-10 mt-4 mb-12 antialiased text-gray-800">
			{#each authors as author}
				<a href={author.link} class="author-link-block">
					<div>
						<img src={author.image} class="author" width="130" alt={author.name} />
						<p class="author-name">{author.name}</p>
						{#each author.affiliation as affiliation}
							<p class="author-affiliation">{affiliation}</p>
						{/each}
					</div>
				</a>
			{/each}
		</div>

		{#each publications as publication}
			<div class="w-full min-w-0 bg-white px-5 py-4 mb-4 border rounded-xl border-gray-300 box-border overflow-hidden">
				<p class="mb-2 text-[0.92rem] font-medium leading-snug text-gray-900">{publication.title}</p>
				<p class="mb-2 text-[0.82rem] font-light leading-snug text-gray-900">{publication.authors}</p>
				<p class="text-[0.82rem] font-light text-gray-900 break-words">
					<span class="font-normal">{publication.venue}</span>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={publication.pdfHref}
						style="color: black;"
						class="rounded bg-gray-200 px-2 py-1 text-[0.7rem] font-regular text-gray-800 visited:text-gray-800 hover:bg-gray-400 focus:outline-none mx-1 whitespace-nowrap"
					>
						PDF
					</a>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={publication.projectHref}
						class="rounded bg-gray-200 px-2 py-1 text-[0.7rem] font-regular visited:text-gray-800 hover:bg-gray-400 focus:outline-none whitespace-nowrap"
						style="color: black;"
					>
						Project website
					</a>
				</p>
			</div>
		{/each}
	</div>
</section>

<style>
	.author {
		border-radius: 75px;
	}

	.author-link-block {
		width: 130px;
		flex: 0 0 130px;
	}

	.author-name {
		margin-top: 10px;
		font-size: 14px;
		text-align: center;
		font-weight: 600;
		color: #333 !important;
	}

	.author-affiliation {
		font-size: 14px;
		text-align: center;
		font-weight: 300;
		color: #333 !important;
	}
</style>
