<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CircularLoading from './CircularLoading.svelte';

	export let disabled = false;
	export let loading = false; // Use local state since we not always want it to sync with a global/different one
	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
	export let width: string;
</script>

<button {disabled} on:click={onClick} style="width: {width}">
	{#if loading}
		<CircularLoading --circle-width="30px" />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	@import '../../sass/colors.scss';

	button {
		align-items: center;
		background-color: $primaryColor;
		border: 0;
		border-radius: 7px;
		box-shadow: inset 0 3px 0 $lightestPrimaryColor, 0 1px 3px hsla(0, 0%, 0%, .2);
		color: $grey200;
		display: flex;
		font-size: 20px;
		font-weight: bold;
		height: 48px;
		justify-content: center;
		padding: 8px 24px;

		&:disabled {
			background-color: $grey500;
			box-shadow: none;
		}
	}
</style>
