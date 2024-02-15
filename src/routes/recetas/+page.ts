import type { PageLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad<{ recipes: Recipe[] }> = async ({ fetch }) => {
	const res = await fetch(`${PUBLIC_API_URL}/recipes`);
	const recipes = await res.json();

	return { recipes };
};
