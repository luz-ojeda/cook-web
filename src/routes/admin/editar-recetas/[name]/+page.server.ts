import { env } from '$env/dynamic/private';
import type { Recipe } from '$lib/types/Recipe';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { slugify } from '$lib';
import { uploadImage } from '$lib/scripts/azure';

export const load: PageServerLoad<Recipe> = async ({ fetch, params }) => {
	const res = await fetch(`${env.API_URL}/recipes/name/${params.name}`);

	if (res.status == 404)
		error(404, `No se encontró una receta con el nombre ${params.name.replace('-', ' ')}`);

	const responseJson = await res.json();
	if ('status' in responseJson) {
		throw new Error(responseJson.title);
	}

	return responseJson;
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		if (!data.get('id')) return;

		const recipeName = data.get('name');
		const slugifiedRecipeName = slugify(recipeName as string);
		const recipeImage = data.get('recipeImage') as File | null;

		const body = {
			name: recipeName,
			summary: data.get('summary') || null,
			ingredients: data.getAll('ingredients'),
			instructions: data.get('instructions'),
			preparationTime: data.get('preparationTime') || null,
			cookingTime: data.get('cookingTime') || null,
			servings: data.get('servings') || null,
			difficulty: data.get('difficulty'),
			vegetarian: Boolean(data.get('vegetarian')),
			pictures:
				recipeImage && recipeImage.size > 0
					? [
							`https://${env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/recipes/${slugifiedRecipeName}/1`
						]
					: null
		};

		const response = await fetch(`${env.API_URL}/recipes/${data.get('id')}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': env.API_KEY
			},
			body: JSON.stringify(body)
		});

		const responseJson = await response.json();
		if (response.status === 201) {
			if (recipeImage && recipeImage.size > 0) {
				await uploadImage(recipeImage, `${slugifiedRecipeName}/1`);
			}

			return { success: true, data: responseJson };
		}

		if (response.status === 409) {
			return fail(responseJson.status, {
				failure: true,
				message: `La receta con el nombre ${recipeName} ya existe`
			});
		}

		console.error(responseJson);
		return fail(response.status);
	}
} satisfies Actions;
