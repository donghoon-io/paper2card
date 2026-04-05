<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';

	export let isSavingOpen: boolean;
	export let isGenerationTried: boolean;
	export let isSaved: boolean;
	export let savedLink: string;
	export let isCopied: boolean;
	export let isFeedbackOpen: boolean;
	export let cardFeedback: string;
	export let onCopy: () => void;
	export let onCloseSave: () => void;
	export let onFeedbackSubmit: () => void;
</script>

<Dialog bind:open={isSavingOpen} aria-labelledby="simple-title" aria-describedby="simple-content">
	<Title id="simple-title">{isGenerationTried ? (isSaved ? 'Cards saved!' : 'Failed to save cards') : 'Please wait..'}</Title>
	<Content id="simple-content">{isGenerationTried ? (isSaved ? `Your link is: ${savedLink}` : 'Please try again') : 'Saving your cards'}</Content>
	{#if isSaved && isGenerationTried}
		<Actions>
			<Button onclick={onCopy}>
				<Label>{isCopied ? 'Copied!' : 'Copy to clipboard'}</Label>
			</Button>
			<Button onclick={onCloseSave}>
				<Label>Close</Label>
			</Button>
		</Actions>
	{:else if !isSaved && isGenerationTried}
		<Actions>
			<Button onclick={onCloseSave}>
				<Label>Close</Label>
			</Button>
		</Actions>
	{/if}
</Dialog>

<Dialog bind:open={isFeedbackOpen} aria-labelledby="feedback-title" aria-describedby="feedback-content">
	<Title id="feedback-title">Please give us feedback on these cards!</Title>
	<Content id="feedback-content">Leave any feedback on these cards</Content>
	<div class="px-5">
		<textarea
			id="message"
			rows="4"
			class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
			placeholder="Write your thoughts here..."
			bind:value={cardFeedback}
		></textarea>
	</div>
	<Actions>
		<Button onclick={onFeedbackSubmit}>
			<Label>Submit</Label>
		</Button>
	</Actions>
</Dialog>
