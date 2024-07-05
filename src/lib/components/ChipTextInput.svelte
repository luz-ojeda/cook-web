<script lang="ts">
	import { Icon } from '$lib';
	import TextInput from './TextInput.svelte';

	export let label: string;
	export let placeholder = '';
	export let id = '';
	export let name = '';
	export let values: string[] = [];

	let inputValue = '';

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && inputValue.trim() !== '') {
			event.preventDefault();
			values = [...values, inputValue];
			inputValue = '';
		}
	}

	function removeValue(valueClicked: string) {
		values = values.filter((value) => value !== valueClicked);
	}
</script>

<div class="flex-column">
	<TextInput {label} {placeholder} {id} {name} bind:inputValue on:keydown={handleKeyPress} />
	{#if values.length > 0}
		<div class="chips-container margin-top">
			{#each values as value}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="chip interactive-pointer-opacity"
					on:click={() => removeValue(value)}
					title="Remover"
				>
					<span>
						{value}
					</span>
					<Icon name="cross" width="8" height="8" />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../sass/colors.scss';

	.chips-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		row-gap: 6px;
	}

	.chip {
		align-items: center;
		background-color: var(--chip);
		border-radius: 12px;
		color: var(--grey300);
		display: flex;
		font-size: var(--text-xs);
		font-weight: bold;
		letter-spacing: 0.025rem;
		padding: 4px 8px;
		margin-right: 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: max-content;

		span {
			margin-right: 4px;
		}
	}
</style>
