import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Recipe } from "$lib/types/Recipe";

export const load: PageLoad<Recipe> = async ({ fetch, params }) => {
	const url = 'http://localhost:5255';

	const res = await fetch(`${url}/recipes/name/${params.name}`);

	if (res.status == 404) throw error(404, `No se encontró una receta con el nombre ${params.name}`);

	const recipe = await res.json();

	return recipe;
};
