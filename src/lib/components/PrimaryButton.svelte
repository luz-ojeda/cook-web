<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CircularLoading from './CircularLoading.svelte';

	export let loading = false;
	export let width: string;
	export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button on:click={onClick} style="width: {width}">
	{#if loading}
		<CircularLoading --background="darksalmon" --circle-width="30px" />
	{:else}
		<slot />
	{/if}
</button>

<style>
	button {
        align-items: center;
		border: 0;
		background-color: darksalmon;
		color: whitesmoke;
        display: flex;
		font-size: 16px;
        height: 48px;
        justify-content: center;
		padding: 8px 24px;
		text-transform: uppercase;
	}
</style>
