<script lang="ts">
	import { Icon, formatRecipeForCopyOrDownload } from '$lib';
	import type { Recipe } from '$lib/types/Recipe';

	export let recipe: Recipe;

	let isRecipeCopied = false;

	async function copyRecipe() {
		try {
			await navigator.clipboard.writeText(formatRecipeForCopyOrDownload(recipe));
			isRecipeCopied = true;

			const revertButtonLookDelay = 3000;
			setTimeout(() => {
				isRecipeCopied = false;
			}, revertButtonLookDelay);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}
</script>

<div
	aria-label="Copiar receta"
	class="interactive-pointer-opacity flex-center"
	on:click={copyRecipe}
	on:keydown={copyRecipe}
	role="button"
	tabindex="0"
>
	{#if isRecipeCopied}
		<Icon class="icon-margin-right" name="copy_full" width="18" height="18" />
	{:else}
		<Icon
			class="icon-margin-right"
			name={isRecipeCopied ? 'copy_full' : 'copy_empty'}
			width="18"
			height="18"
		/>
	{/if}
	<span class="action-label">{isRecipeCopied ? 'Copiada' : 'Copiar'}</span>
</div>

<style>
	div {
		cursor: pointer;
	}
</style>
