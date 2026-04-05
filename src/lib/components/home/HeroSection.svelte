<script lang="ts">
	export let ctaHref: string;
</script>

<section class="bg-gray-50">
	<div class="mx-auto max-w-screen-lg px-4 pt-8 pb-6 lg:flex lg:items-center">
		<div class="mx-auto text-center">
			<h1 class="text-3xl font-extrabold sm:text-4xl mb-1">Transform any paper into</h1>
			<h1
				class="text-3xl font-extrabold sm:text-4xl bg-gradient-to-r from-rose-500 via-green-500 to-blue-600 inline-block text-transparent bg-clip-text pb-3"
			>
				design cards.
			</h1>
			<p class="mt-3 font-light text-gray-900 text-md sm:text-lg">
				Harnessing generative AI models, our system automatically transforms a PDF paper into
				design cards.
			</p>
			<p class="mt-2 font-light text-gray-900 text-md sm:text-lg">
				You can further customize these cards simply by providing your own design context.
			</p>

			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a
					class="block rounded-[0.65rem] bg-[#e5e7eb] px-8 py-3 text-md font-semibold text-[#1f2937] visited:text-[#1f2937] hover:bg-[#d1d5db] focus:outline-none sm:w-auto"
					style="color: black"
					href={ctaHref}
				>
					Get started
				</a>
			</div>
		</div>
	</div>
</section>
