<script lang="ts">
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
		<div class="chips-container">
			{#each values as value}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="chip" on:click={() => removeValue(value)} title="Remover">{value} X</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.chips-container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 12px;
		align-items: center;
		row-gap: 6px;
	}

	.chip {
		background-color: lightgray;
		border-radius: 12px;
		color: $fgColor;
		font-size: 14px;
		padding: 4px 8px;
		margin-right: 6px;
		width: max-content;

		&:hover {
			cursor: pointer;
			opacity: 0.7;
		}
	}
</style>
