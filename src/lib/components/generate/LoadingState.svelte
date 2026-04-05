<script lang="ts">
	import CircularProgress from '@smui/circular-progress';

	export let title = 'Loading..';
	export let subtitle = 'This may take up to 1 minute';
	export let size = '80px';
</script>

<div class="flex items-center">
	<CircularProgress style={`height: ${size}; width: ${size};`} indeterminate />
</div>
<p class="font-heading mt-4 text-lg font-bold lg:text-xl text-center">
	{title}<br /><span class="text-md lg:text-lg font-light">{subtitle}</span>
</p>
