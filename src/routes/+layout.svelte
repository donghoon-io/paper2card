<script>
	import Header from './Header.svelte';
  	import "../app.css";
	import { SvelteEasyToast } from 'svelte-easy-toast';
	import { createToastStore } from 'svelte-easy-toast/toast.store.svelte.js';


	const { children } = $props();

	createToastStore();
</script>

<div class="app">
	<Header />

	<main class="bg-gray-50">
		<slot />
	</main>
</div>

<SvelteEasyToast />

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		font-family: "Inter" !important;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
