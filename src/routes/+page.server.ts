import type { PageLoad } from './recetas/$types';
import type { Recipe } from '$lib/types/Recipe';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad<{ recipes: Recipe[] }> = async ({ fetch }) => {
	try {
		const res = await fetch(`${PUBLIC_API_URL}/recipes?limit=4`);
		const recipes = await res.json();
	
		return { recipes };
	} catch (error) {
		return { recipes: [] }
	}
};
