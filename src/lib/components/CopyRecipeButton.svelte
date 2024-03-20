<script lang="ts">
	import { Copy, CopyFull } from '$lib';
	import { formatRecipeForCopyOrDownload } from '$lib/scripts/strings';
	import type { Recipe } from '$lib/types/Recipe';

	export let recipe: Recipe;

	let isRecipeCopied = false;

	async function copyRecipe() {
		try {
			await navigator.clipboard.writeText(formatRecipeForCopyOrDownload(recipe));
			isRecipeCopied = true;

			const revertButtonLookDelay = 5000;
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
	<img class="action-icon" alt="" src={isRecipeCopied ? CopyFull : Copy} />
	<span class="action-label">{isRecipeCopied ? 'Copiada' : 'Copiar'}</span>
</div>
