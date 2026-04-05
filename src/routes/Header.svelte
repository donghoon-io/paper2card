<script lang="ts">
	import { fade } from 'svelte/transition';
	import favicon from "$lib/images/favicon.png"
	import { api_key } from "$lib/js/store.js";
	import { normalizeGeminiApiKey } from "$lib/js/toolkit.js";

	let mobileMenuOpen = false;
	let showApiKeyModal = false;
	let tempApiKey = $api_key;

	function maskedApiKey(apiKey) {
		const trimmed = normalizeGeminiApiKey(apiKey);
		if (!trimmed) {
			return "";
		}
		if (trimmed.length <= 8) {
			return trimmed;
		}
		return `${trimmed.slice(0, 4)}...${trimmed.slice(-4)}`;
	}

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

	function clearApiKey() {
		if (typeof window !== "undefined") {
			window.localStorage.removeItem("gemini_api_key");
		}
		$api_key = "";
		tempApiKey = "";
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape" && showApiKeyModal) {
			closeApiKeyModal();
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

{#if showApiKeyModal}
	<div
		class="modal-overlay"
		transition:fade={{ duration: 200 }}
		on:click={closeApiKeyModal}
		role="presentation"
	>
		<div class="modal-card" on:click|stopPropagation role="dialog" aria-modal="true" aria-labelledby="api-key-title">
			<h3 id="api-key-title" class="modal-title">Manage API Key</h3>
			<p class="modal-copy">
				Enter or update your Gemini API key. This is required to run card generation. You can obtain one at
				<a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">Google AI Studio</a>.
			</p>
			<p class="modal-copy">
				Current key:
				<strong>{$api_key ? maskedApiKey($api_key) : "Not set"}</strong>
			</p>

			<div>
				<label for="api-key-input" class="modal-label">Your API Key</label>
				<input
					type="password"
					id="api-key-input"
					bind:value={tempApiKey}
					class="modal-input"
					placeholder="Enter your Gemini API key"
				/>
			</div>

			<div class="modal-actions">
				<button type="button" class="secondary-button" on:click={clearApiKey}>Clear</button>
				<button type="button" class="secondary-button" on:click={closeApiKeyModal}>Cancel</button>
				<button type="button" class="primary-button" on:click={saveApiKey}>Save Key</button>
			</div>
		</div>
	</div>
{/if}

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

	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: rgba(17, 24, 39, 0.45);
		backdrop-filter: blur(6px);
	}

	.modal-card {
		width: 100%;
		max-width: 32rem;
		border-radius: 1rem;
		background: #ffffff;
		box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
		padding: 1.5rem;
	}

	.modal-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 700;
		color: #111827;
	}

	.modal-copy {
		margin: 0 0 0.9rem 0;
		font-size: 0.92rem;
		line-height: 1.5;
		color: #4b5563;
	}

	.modal-copy a {
		color: #111827;
		text-decoration: underline;
	}

	.modal-label {
		display: block;
		margin-bottom: 0.4rem;
		font-size: 0.9rem;
		font-weight: 600;
		color: #374151;
	}

	.modal-input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.8rem 0.9rem;
		border: 1px solid #d1d5db;
		border-radius: 0.75rem;
		font-size: 0.95rem;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 1.25rem;
	}

	.primary-button,
	.secondary-button {
		border: none;
		border-radius: 0.7rem;
		padding: 0.7rem 1rem;
		font-size: 0.88rem;
		font-weight: 700;
		cursor: pointer;
	}

	.primary-button {
		background: #111827;
		color: #ffffff;
	}

	.secondary-button {
		background: #e5e7eb;
		color: #111827;
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
