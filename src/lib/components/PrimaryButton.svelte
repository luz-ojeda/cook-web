<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CircularLoading from './CircularLoading.svelte';

	export let disabled = false;
	export let loading = false; // Use local state since we not always want it to sync with a global/different one
	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
	export let width = 'auto';
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
</script>

<button disabled={disabled || loading} on:click={onClick} {type} style="width: {width}">
	{#if loading}
		<CircularLoading --background="#a19887" --circle-width="30px" />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	@import '../../sass/colors.scss';
	@import '../../sass/variables.scss';

	button {
		align-items: center;
		background-color: $primaryColor;
		border: 0;
		border-radius: 7px;
		box-shadow:
			inset 0 3px 0 $lightestPrimaryColor,
			$shadow;
		color: $grey200;
		display: flex;
		font-size: 20px;
		font-weight: bold;
		height: 48px;
		justify-content: center;
		padding: 8px 24px;

		&:hover {
			background-color: $lightPrimaryColor;
			transition: background-color 0.3s;
		}

		&:disabled {
			box-shadow:
				inset 0 3px 0 $grey300,
				$smallShadow;
			background-color: $grey500;
		}

		&:active {
			box-shadow: $smallestShadow;
		}
	}
</style>
