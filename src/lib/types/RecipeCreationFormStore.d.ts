type FormDataElems = {
	name: HTMLInputElement | null;
	ingredients: HTMLInputElement[];
	summary: HTMLTextAreaElement | null;
	instructions: HTMLTextAreaElement | null;
	preparationTime: HTMLInputElement | null;
	cookingTime: HTMLInputElement | null;
	servings: HTMLInputElement | null;
	difficulty: HTMLInputElement[];
	vegetarian: HTMLInputElement | null;
};

type RecipeCreationFormData = {
	name: string;
	summary: string;
	instructions: string;
	ingredients: string[];
	preparationTime: string;
	cookingTime: string;
	servings: string;
	difficulty: string;
	vegetarian: boolean;

	[key: string]: string | boolean | string[];
};

export { FormDataElems, RecipeCreationFormData };
