<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CircularLoading from './CircularLoading.svelte';

	export let disabled = false;
	export let loading = false; // Use local state since we not always want it to sync with a global/different one
	export let onClick: MouseEventHandler<HTMLButtonElement>;
	export let width: string;
</script>

<button {disabled} on:click={onClick} style="width: {width}">
	{#if loading}
		<CircularLoading --background="darksalmon" --circle-width="30px" />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
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

		&:disabled {
			background-color: lightgray;
		}
	}
</style>
