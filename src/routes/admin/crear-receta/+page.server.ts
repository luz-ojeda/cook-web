import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const recipeName = data.get('name');

		const body = {
			name: recipeName,
			summary: data.get('summary') || null,
			ingredients: data.getAll('ingredients'),
			instructions: data.get('instructions'),
			preparationTime: data.get('preparationTime') || null,
			cookingTime: data.get('cookingTime') || null,
			servings: data.get('servings') || null,
			difficulty: data.get('difficulty'),
			vegetarian: Boolean(data.get('vegetarian'))
		};

		const response = await fetch(`${env.API_URL}/recipes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': `${env.API_KEY}`
			},
			body: JSON.stringify(body)
		});

		const responseJson = await response.json();

		if (response.status === 201) {
			return { success: true, data: responseJson };
		}

		if (response.status === 409) {
			return fail(response.status, { failure: true, message: `La receta con el nombre ${recipeName} ya existe` });
		}

		return fail(response.status);
	}
} satisfies Actions;
