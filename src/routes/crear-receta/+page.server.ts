import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { slugify } from '$lib';
import { uploadImage } from '$lib/scripts/azure';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
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
					: null,
			userCreated: true
		};

		const response = await fetch(`${env.API_URL}/recipes`, {
			method: 'POST',
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

		if (response.status === 400) {
			if ('Ingredients' in responseJson.errors) {
				return fail(responseJson.status, {
					failure: true,
					message: `Al menos un ingrediente es necesario`
				});
			}
			return fail(responseJson.status, {
				failure: true,
				message: `El formulario contiene errores`
			});
		}

		console.error(responseJson);
		return fail(response.status);
	}
} satisfies Actions;
