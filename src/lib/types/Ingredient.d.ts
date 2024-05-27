type Ingredient = {
	id: string;
	name: string;
	substitutions: string[];
};

type GroupedIngredientsDTO = { ingredients: Ingredient[]; letter: string }[];

export { Ingredient, GroupedIngredientsDTO };
