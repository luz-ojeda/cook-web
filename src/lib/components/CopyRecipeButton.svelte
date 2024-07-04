<script lang="ts">
	import { Button, Icon, formatRecipeForCopyOrDownload } from '$lib';
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

<Button buttonType="tertiary" onClick={copyRecipe} size="small">
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
</Button>
