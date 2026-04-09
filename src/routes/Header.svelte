<script lang="ts">
	import ApiKeyModal from '$lib/components/ApiKeyModal.svelte';
	import favicon from "$lib/images/favicon.png";
	import { api_key } from "$lib/js/store.js";
	import { normalizeGeminiApiKey } from "$lib/js/toolkit.js";

	let mobileMenuOpen = false;
	let showApiKeyModal = false;
	let tempApiKey = $api_key;

	function openApiKeyModal() {
		tempApiKey = $api_key ?? "";
		showApiKeyModal = true;
	}

	function closeApiKeyModal() {
		showApiKeyModal = false;
	}

	function saveApiKey() {
		const trimmed = normalizeGeminiApiKey(tempApiKey);
		if (typeof window !== "undefined") {
			window.localStorage.setItem("gemini_api_key", trimmed);
		}
		$api_key = trimmed;
		tempApiKey = trimmed;
		closeApiKeyModal();
	}

</script>

<ApiKeyModal
	open={showApiKeyModal}
	bind:value={tempApiKey}
	title="Manage API Key"
	description="To generate a card, please enter your Gemini API key. This is required to access the generative AI models. You can obtain one at"
	note="Note that Paper2card requires an API key with a paid quota tier, as it uses a text/image generation model."
	inputPlaceholder="Enter your key here"
	primaryLabel="Save Key"
	on:close={closeApiKeyModal}
	on:save={saveApiKey}
/>

<header class="bg-gray-50">
	<nav class="header-nav" aria-label="Global">
		<div class="brand-group">
			<a href="/" class="brand-link">
				<img class="brand-icon" src={favicon} alt="paper2card logo">
				<div class="brand-copy">
					<span class="brand-name">paper2card</span>
				</div>
			</a>
		</div>

		<div class="header-actions">
			<button
				type="button"
				class="icon-button"
				aria-label="API Key Settings"
				on:click={openApiKeyModal}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
					<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
				</svg>
			</button>
			<a href="https://donghoon.io" target="_blank" rel="noopener noreferrer" class="author-link">
				Author's website
			</a>
		</div>
	</nav>

	{#if mobileMenuOpen}
		<div class="mobile-menu">
			<div class="mobile-menu-inner"></div>
		</div>
	{/if}
</header>

<style>

	.header-nav {
		margin: 0 auto;
		max-width: 1280px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.9rem 1.5rem;
	}

	.brand-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: inherit;
	}

	.brand-icon {
		width: 2rem;
		height: 2rem;
	}

	.brand-copy {
		display: flex;
		flex-direction: column;
	}

	.brand-name {
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #111827;
	}

	.brand-status {
		font-size: 0.74rem;
		color: #6b7280;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border: none;
		border-radius: 9999px;
		background: transparent;
		color: #6b7280;
		cursor: pointer;
		transition: background-color 0.2s ease, color 0.2s ease;
	}

	.icon-button:hover {
		background: #f3f4f6;
		color: #111827;
	}

	.author-link {
		padding: 0.55rem 0.85rem;
		border-radius: 0.65rem;
		background: #e5e7eb;
		color: #1f2937;
		font-size: 0.78rem;
		font-weight: 600;
		text-decoration: none;
	}

	.author-link:hover {
		background: #d1d5db;
	}

	.mobile-menu {
		padding: 0 1.5rem 1rem 1.5rem;
	}

	@media (max-width: 640px) {
		.header-nav {
			padding: 0.85rem 1rem;
		}

		.brand-status {
			max-width: 10rem;
		}

		.author-link {
			display: none;
		}
	}
</style>
