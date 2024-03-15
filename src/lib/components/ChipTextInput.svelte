<script lang="ts">
	import TextInput from './TextInput.svelte';

	export let label: string;
	export let placeholder = '';
	export let id = '';
	export let name = '';
	export let inputValue = '';
	export let chips: string[] = [];

	function handleKeyPress(event: KeyboardEvent) {
		console.log(event);
		if (event.key === ' ' && inputValue.trim() !== '') {
			chips = [...chips, inputValue.trim()];
			inputValue = '';
		}
	}
</script>

<div class="flex-column">
	<TextInput {label} {placeholder} {id} {name} bind:inputValue on:keydown={handleKeyPress} />
	{#if chips.length > 0}
		<div class="chips-container">
			{#each chips as chip}
				<div class="chip">{chip}</div>
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
		width: min-content;
	}
</style>
