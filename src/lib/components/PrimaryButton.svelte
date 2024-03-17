<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CircularLoading from './CircularLoading.svelte';

	export let loading = false;
	export let width: string;
	export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button on:click={onClick} style="width: {width}">
	{#if loading}
		<CircularLoading --circle-width="30px" />
	{:else}
		<slot />
	{/if}
</button>

<style>
	button {
        align-items: center;
        display: flex;
        height: 48px;
        justify-content: center;
		padding: 8px 24px;
		text-transform: uppercase;
	}
</style>
