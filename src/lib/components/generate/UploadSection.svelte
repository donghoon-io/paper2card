<script lang="ts">
	export let files: File[] | null;
	export let fileUrl: string;
	export let isDragging: boolean;
	export let onDrop: (event: DragEvent) => void;
	export let onFilesChange: (files: File[]) => void;
	export let onUpload: () => void;
	export let onReset: () => void;
	export let onFileUrlSubmit: () => void;

	function handleFileInputChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const nextFiles = input.files ? Array.from(input.files) : [];
		onFilesChange(nextFiles);
	}
</script>

{#if files}
	<div class="w-full max-w-4xl px-6 md:px-10">
		<p class="font-heading mb-6 text-lg font-bold lg:text-xl text-black">Do you want to use this PDF to generate design card?</p>
		<div class="flex flex-col items-center justify-center w-full">
			<div class="w-full rounded-[1.1rem] border border-gray-200 bg-gray-50 shadow-[0_16px_50px_rgba(15,23,42,0.07)]">
				<div class="flex flex-col gap-4 px-6 py-6 md:px-8">
					<div class="flex flex-col gap-1 border-b border-gray-100 pb-4 md:flex-row md:items-center md:gap-4">
						<span class="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">File name</span>
						<p class="text-sm font-medium text-gray-600 break-all">{files[0].name}</p>
					</div>
					<div class="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
						<span class="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">File size</span>
						<p class="text-sm font-medium text-gray-600">{(files[0].size / (1024 * 1024)).toFixed(2)}MB</p>
					</div>
				</div>
			</div>

			<div class="mt-7 flex flex-wrap justify-center gap-4">
				<button on:click={onUpload} class="rounded-[0.65rem] bg-[#6c7f9b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5c6e89]">
					Upload PDF
				</button>
				<button on:click={onReset} class="rounded-[0.65rem] bg-[#e5e7eb] px-6 py-3 text-sm font-semibold text-[#1f2937] transition-colors hover:bg-[#d1d5db]">
					Choose again
				</button>
			</div>
		</div>
	</div>
{:else}
	<div class="w-full max-w-4xl px-6 md:px-10">
		<p class="font-heading mb-6 text-lg font-bold lg:text-xl text-black">First, upload a PDF paper.</p>
		<div>
			<div
				role="button"
				tabindex="-1"
				class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-[1.1rem] border-2 border-dashed transition-colors duration-200 {isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'} bg-gray-50 hover:bg-gray-100"
				on:dragover|preventDefault
				on:dragenter={() => (isDragging = true)}
				on:dragleave={() => (isDragging = false)}
				on:drop={onDrop}
			>
				<label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-full cursor-pointer">
					<div class="flex flex-col items-center justify-center pt-5 pb-6">
						<svg class="mb-4 h-9 w-9 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
						</svg>
						<p class="mb-2 text-base text-gray-600"><span class="font-semibold">Click to upload or drag & drop</span></p>
						<p class="text-sm text-gray-500">PDF only</p>
					</div>
					<input id="dropzone-file" accept=".pdf" type="file" class="hidden" on:change={handleFileInputChange} />
				</label>
			</div>
		</div>
		<div class="mt-6">
			<label for="url" class="block mb-2 text-sm font-medium text-gray-900">Or, add a link to PDF file:</label>
			<div class="flex gap-3">
				<input bind:value={fileUrl} type="url" id="url" class="block w-full rounded-[0.65rem] border border-gray-300 bg-white p-3 text-sm text-gray-900" placeholder="https://abc.com/file.pdf" required />
				<button disabled={fileUrl === ''} type="submit" class="w-full rounded-[0.65rem] bg-[#e5e7eb] px-5 py-3 text-center text-sm font-semibold text-[#1f2937] transition-colors hover:bg-[#d1d5db] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto" on:click={onFileUrlSubmit}>Submit</button>
			</div>
		</div>
	</div>
{/if}
