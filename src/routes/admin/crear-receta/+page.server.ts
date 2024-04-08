import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const instructions = data.get('instructions');
		const ingredients = data.getAll('ingredients');
		const preparationTime = data.get('preparationTime') || null;
		const cookingTime = data.get('cookingTime') || null;
		const servings = data.get('servings') || null;
		const difficulty = data.get('difficulty');
		const vegetarian = Boolean(data.get('vegetarian'));

		const body = { 
			ingredients,
			name,
			instructions,
			preparationTime,
			cookingTime,
			servings,
			difficulty,
			vegetarian
		};

		await fetch('http://localhost:5255/recipes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
	}
} satisfies Actions;
