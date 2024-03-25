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
	difficulty?: RecipeDiffiulty;
	vegetarian: boolean;
};

type RecipeDiffiulty = 'Easy' | 'Medium' | 'Hard';

export { Recipe, Reciped };
