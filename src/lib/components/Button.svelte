<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import CircularLoading from './CircularLoading.svelte';

	export let ariaLabel = '';
	export let disabled = false;
	export let loading = false; // Use local state since we not always want it to sync with a global/different one
	export let onClick: EventHandler<KeyboardEvent | MouseEvent> | undefined = undefined;
	export let onSubmit: EventHandler<Event> | undefined = undefined;
	export let size: 'small' | 'large' = 'large';
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let buttonType: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let tabIndex = 0;
</script>

<button
	aria-label={ariaLabel}
	class="{buttonType} {size === 'small' ? 'small' : 'large'}"
	disabled={disabled || loading}
	on:click={onClick}
	on:submit={onSubmit}
	tabindex={tabIndex}
	{type}
>
	{#if loading}
		<CircularLoading width="30" />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	@import '../../sass/variables.scss';

	.large {
		font-size: var(--text-md);
		height: 48px;
		padding: 8px 24px;
		width: 100%;
	}

	.tertiary {
		background-color: transparent;
		padding: 0;
		width: fit-content;

		&:not(:disabled) {
			color: var(--btn-tertiary);
		}

		&:hover:enabled {
			color: var(--btn-tertiary-hover);
			text-decoration: underline;
		}
	}
</style>
