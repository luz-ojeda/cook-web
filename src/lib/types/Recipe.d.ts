type RecipeParameters = {
	name: string;
	ingredients: string[];
	difficulties: string[];
	onlyVegetarian: boolean;
	page?: number;
	resultsPerPage?: number;
};

type Recipe = {
	id: string;
	name: string;
	summary: string;
	ingredients: string[];
	instructions: string;
	pictures: string[];
	videos: string[];
	preparationTime?: number;
	cookingTime?: number;
	servings?: number;
	difficulty?: RecipeDifficulty;
	vegetarian: boolean;
};

type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

export { Recipe, RecipeDifficulty, RecipeParameters };
