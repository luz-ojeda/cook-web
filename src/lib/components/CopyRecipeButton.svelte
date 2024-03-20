<script lang="ts">
	import { Copy, CopyFull } from '$lib';
	import { mapRecipeDifficulty } from '$lib/scripts/strings';
	import type { Recipe } from '$lib/types/Recipe';

	export let recipe: Recipe;

	let isRecipeCopied = false;

	function formatRecipeForCopy() {
		const name = recipe.name;
		const difficulty = recipe.difficulty ? `Dificultad: ${mapRecipeDifficulty(recipe.difficulty)}\n` : '';
		const servings = recipe.servings ? `Porciones: ${recipe.servings}\n` : '';
		const vegetarian = recipe.vegetarian ? 'Vegetariana\n' : '';
		const preparationTime = recipe.preparationTime
			? `Tiempo de preparación: ${recipe.preparationTime} minutos\n`
			: '';
		const cookingTime = recipe.cookingTime
			? `Tiempo de cocina: ${recipe.cookingTime} minutos\n`
			: '';
		const ingredients =
			'\nIngredientes:\n' + recipe.ingredients.map((ingredient) => `- ${ingredient}\n`).join('');
		const instructions = '\nInstrucciones:\n' + recipe.instructions;

		return `${name}\n\n${difficulty}${servings}${vegetarian}${preparationTime}${cookingTime}${ingredients}${instructions}`;
	}

	async function copyRecipe() {
		try {
			await navigator.clipboard.writeText(formatRecipeForCopy());
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
	<img class="icon" alt="" src={isRecipeCopied ? CopyFull : Copy} />
	<span>{isRecipeCopied ? 'Copiada' : 'Copiar'}</span>
</div>

<style>
	.icon {
		margin-right: 6px;
		width: 18px;
	}
</style>
