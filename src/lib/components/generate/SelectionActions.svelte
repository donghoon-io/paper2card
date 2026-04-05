<script lang="ts">
	import Icon from '$lib/images/favicon.png';

	export let selectedIndices: number[];
	export let onReset: () => void;
	export let onGenerate: () => void;

	$: selectedCount = Math.max(...selectedIndices) - Math.min(...selectedIndices) + 1;
</script>

<div class="float bg-gray-200 shadow-lg border border-gray-400">
	<button class="float-button text-slate-700 pl-4" on:click={onReset}>Reselect</button>
	<button class="float-button ml-2 bg-blue-500 text-white pl-2 pr-3" on:click={onGenerate}>
		<img class="inline-block inner-img" src={Icon} alt="" />Generate using {selectedCount} paragrahs!
	</button>
</div>

<style>
	.float {
		position: fixed;
		bottom: 15px;
		padding: 3px 3px;
		left: auto;
		right: auto;
		border-radius: 18px;
		text-align: center;
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
</style>
