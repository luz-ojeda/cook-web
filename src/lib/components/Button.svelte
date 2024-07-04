<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import CircularLoading from './CircularLoading.svelte';

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

	button {
		align-items: center;
		border: 0;
		border-radius: 7px;
		display: flex;
		font-weight: bold;
		justify-content: center;

		&:disabled {
			box-shadow:
				inset 0 3px 0 var(--grey300),
				$smallShadow;
			background-color: var(--btn-primary-disabled-bg);
		}

		&:active:enabled {
			box-shadow: $smallestShadow;
		}
	}

	.small {
		font-size: 1rem;
		height: 32px;
		padding: 4px 12px;
	}

	.large {
		font-size: 1.25rem;
		height: 48px;
		padding: 8px 24px;
		width: 100%;
	}

	.primary {
		background-color: var(--btn-primary-bg);
		box-shadow:
			inset 0 3px 0 var(--primary100),
			$shadow;
		color: var(--grey200);

		&:hover:enabled {
			background-color: var(--btn-primary-hover);
			transition: background-color 0.3s;
		}
	}

	.tertiary {
		background-color: transparent;
		color: var(--btn-tertiary);
		padding: 0;

		&:hover {
			color: var(--btn-tertiary-hover);
			text-decoration: underline;
		}
	}
</style>
