<script lang="ts">
	import { Icon } from '$lib';
	import Chip from './Chip.svelte';
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
				<Chip label={value} onClick={() => removeValue(value)} title="Remover">
					<span class="margin-left--xs">
						<Icon name="cross" width="8" height="8" />
					</span>
				</Chip>
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
</style>
