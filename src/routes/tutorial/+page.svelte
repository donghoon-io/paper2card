<script lang="ts">
    import { tutorial_done } from "$lib/js/store.js";
	import { onMount } from "svelte";
	import { goto } from '$app/navigation';


	const data = [
		{
			"title": "1. Upload a PDF paper",
			"description": "First, upload any PDF paper to the system.",
			"image": "1.png"
		},
		{
			"title": "2. Select a paragraph of the paper",
			"description": "Then, select paragraph(s) that you want to generate design cards from.<br><br>If our system detects that the uploaded paper has a recommended paragraphs, they will show up on top of the paper paragraph list.",
			"image": "2.png"
		},
		{
			"title": "3. Generate cards",
			"description": "Once you selected the paragraphs and proceed, the system will generate design cards.<br><br>Don't forget to leave feedback!",
			"image": "3.png"
		},
		{
			"title": "4. Customize your design cards (optional)",
			"description": "You can optionally generate a customized design insights tailored to your own design work.<br><br>You can simply describe your design work and hit 'Customize!' button.",
			"image": "4.png"
		}
	]
	let pager_index = 0;
</script>

<svelte:head>
	<title>Tutorial</title>
	<meta name="description" content="Tutorial page of Paper to Card" />
</svelte:head>

<section>
	<div class="bg-gray-50 h-36">
		<div class="mx-auto max-w-screen-xl px-4 pt-2 pb-4">
			<div class="mx-auto text-center">
				<h1 class="text-3xl font-extrabold sm:text-4xl mb-1">
					Tutorial
				</h1>
				<p class="mt-3 font-light text-gray-700 sm:text-lg/relaxed">
					Follow these steps to generate your own design cards!
				</p>
			</div>
		</div>
	</div>

	<div class="mt-4 py-8 px-4 bg-white h-[calc(100vh-15rem)]">
		<div class="max-w-screen-2xl mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
				<div>
					<img src="/tutorial/{data[pager_index]["image"]}" class="border">
				</div>
				<div class="flex items-center mt-2 lg:mt-0 justify-center text-center lg:justify-start lg:text-left">
					<div class="px-0 lg:px-8 mb-8 lg:mb-0">
						<p class="mb-4 text-xl font-bold text-gray-900">{data[pager_index]["title"]}</p>
						<p class="text-gray-600" bind:innerHTML={data[pager_index]["description"]} contenteditable="false"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


<div class="float bg-gray-200 shadow-lg border border-gray-400">
	{#if pager_index != 0}
	<button class="float-button text-slate-700 pl-4" on:click={() => {pager_index -= 1}}>{"← Previous"}</button>
	{/if}
	<button class="float-button {pager_index != 0 ? "ml-2":""} {pager_index == 3 ? "bg-blue-500 text-white":"bg-gray-300"} px-3" on:click={() => {if (pager_index == 3) {$tutorial_done = true; goto("/generate");} else {pager_index += 1}}}>{pager_index == 3 ? "I'm ready!" : "Next →"}</button>
</div>

<style>
	.float {
		position:fixed;
		bottom: 3rem;
		padding: 3px 3px;
		left: 50%;
		transform: translate(-50%, 0);
		border-radius: 18px;
		text-align:center;
	}
	.float-button {
		height: 35px;
		border-radius: 15px;
		font-size: 14px;
	}
</style>