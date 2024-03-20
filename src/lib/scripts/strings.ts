import type { RecipeDiffiulty } from "$lib/types/Recipe";

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapRecipeDifficulty(difficulty: RecipeDiffiulty) {
	if (difficulty === 'Hard') {
		return 'Difícil';
	} else if (difficulty === 'Medium') {
		return 'Intermedia';
	}
	return 'Fácil';
}

export { capitalizeFirstLetter, mapRecipeDifficulty };
