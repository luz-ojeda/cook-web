import { env } from '$env/dynamic/private';
import type { Recipe } from '$lib/types/Recipe';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<Recipe> = async ({ fetch, params }) => {
	const res = await fetch(`${env.API_URL}/recipes/name/${params.name}`);

	if (res.status == 404) error(404, `No se encontró una receta con el nombre ${params.name}`);

	const responseJson = await res.json();
	if ('status' in responseJson) {
		throw new Error(responseJson.title);
	}

	return responseJson;
};
