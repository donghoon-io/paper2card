<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let open = false;
	export let value = '';
	export let title = 'API Key Required';
	export let description =
		'To continue, please enter your Gemini API key. You can obtain one at Google AI Studio.';
	export let note =
		'Paper2card requires a Gemini API key with access to the generation models used by this app.';
	export let inputLabel = 'Your API Key';
	export let inputPlaceholder = 'Enter your Gemini API key';
	export let primaryLabel = 'Save & Continue';
	export let secondaryLabel = 'Cancel';
	export let showClear = false;
	export let currentKeyLabel = '';

	const dispatch = createEventDispatcher<{
		close: void;
		save: void;
		clear: void;
	}>();

	function closeModal() {
		dispatch('close');
	}

	function saveKey() {
		dispatch('save');
	}

	function clearKey() {
		dispatch('clear');
	}

	function onKeyDown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			closeModal();
		}
	}

	function onContainerKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

{#if open}
	<div
		class="modal-overlay"
		transition:fade={{ duration: 200 }}
		on:click={closeModal}
		on:keydown={onContainerKeyDown}
		role="presentation"
		tabindex="-1"
	>
		<div
			class="modal-card"
			on:click|stopPropagation
			on:keydown={onContainerKeyDown}
			role="dialog"
			aria-modal="true"
			aria-labelledby="api-key-title"
			tabindex="0"
		>
			<form on:submit|preventDefault={saveKey}>
				<h3 id="api-key-title" class="modal-title">{title}</h3>
				<p class="modal-copy">
					{description}
					<a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">
						Google AI Studio
					</a>.
				</p>
				<p class="modal-copy">{note}</p>

				{#if currentKeyLabel}
					<p class="modal-current">{currentKeyLabel}</p>
				{/if}

				<div>
					<label for="api-key-input" class="modal-label">{inputLabel}</label>
					<input
						type="password"
						id="api-key-input"
						bind:value
						class="modal-input"
						placeholder={inputPlaceholder}
						autocomplete="off"
					/>
				</div>

				<div class="modal-actions">
					{#if showClear}
						<button type="button" class="secondary-button" on:click={clearKey}>Clear</button>
					{/if}
					<button type="button" class="secondary-button" on:click={closeModal}>
						{secondaryLabel}
					</button>
					<button type="submit" class="primary-button">{primaryLabel}</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(6px);
	}

	.modal-card {
		width: 100%;
		max-width: 28rem;
		border-radius: 0.7rem;
		background: #ffffff;
		box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
		padding: 1.45rem;
	}

	.modal-title {
		margin: 0 0 0.5rem 0;
		font-size: 0.96rem;
		font-weight: 700;
		color: #111827;
	}

	.modal-copy,
	.modal-current {
		margin: 0 0 0.85rem 0;
		font-size: 0.8rem;
		line-height: 1.45;
		color: #4b5563;
	}

	.modal-copy a {
		color: #111827;
		text-decoration: underline;
	}

	.modal-current strong {
		color: #111827;
	}

	.modal-label {
		display: block;
		margin-bottom: 0.4rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #374151;
	}

	.modal-input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.44rem 0.68rem;
		border: 1px solid #d1d5db;
		border-radius: 0.65rem;
		font-size: 0.8rem;
		background: #ffffff;
	}

	.modal-input:focus {
		outline: none;
		border-color: #6b7280;
		box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.15);
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 1.15rem;
	}

	.primary-button,
	.secondary-button {
		border: none;
		border-radius: 0.6rem;
		padding: 0.48rem 0.82rem;
		font-size: 0.76rem;
		font-weight: 700;
		cursor: pointer;
	}

	.primary-button {
		background: #111827;
		color: #ffffff;
	}

	.primary-button:hover {
		background: #1f2937;
	}

	.secondary-button {
		background: #e5e7eb;
		color: #111827;
	}

	.secondary-button:hover {
		background: #d1d5db;
	}
</style>
