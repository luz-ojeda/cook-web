import type { Recipe, RecipeDifficulty } from '$lib/types/Recipe';

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapRecipeDifficulty(difficulty: RecipeDifficulty) {
	if (difficulty === 'Hard') {
		return 'Difícil';
	} else if (difficulty === 'Medium') {
		return 'Intermedia';
	}
	return 'Fácil';
}

function formatRecipeForCopyOrDownload(recipe: Recipe) {
	const name = recipe.name;
	const difficulty = recipe.difficulty
		? `Dificultad: ${mapRecipeDifficulty(recipe.difficulty)}\n`
		: '';
	const servings = recipe.servings ? `Porciones: ${recipe.servings}\n` : '';
	const vegetarian = recipe.vegetarian ? 'Vegetariana\n' : '';
	const preparationTime = recipe.preparationTime
		? `Tiempo de preparación: ${recipe.preparationTime} minutos\n`
		: '';
	const cookingTime = recipe.cookingTime ? `Tiempo de cocina: ${recipe.cookingTime} minutos\n` : '';
	const ingredients =
		'\nIngredientes:\n' + recipe.ingredients.map((ingredient) => `- ${ingredient}\n`).join('');
	const instructions = '\nInstrucciones:\n' + recipe.instructions;

	return `${name}\n\n${difficulty}${servings}${vegetarian}${preparationTime}${cookingTime}${ingredients}${instructions}`;
}

export { capitalizeFirstLetter, formatRecipeForCopyOrDownload, mapRecipeDifficulty };
