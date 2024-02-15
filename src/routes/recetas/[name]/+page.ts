import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad<{ recipe: Recipe }> = async ({ fetch, params }) => {
	const res = await fetch(`${PUBLIC_API_URL}/recipes/name/${params.name}`);

	if (res.status == 404) throw error(404, `No se encontró una receta con el nombre ${params.name}`);

	const recipe = await res.json();

	return { recipe };
};
