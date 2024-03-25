import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './recetas/$types';
import type { Recipe } from '$lib/types/Recipe';
import type { PaginatedList } from '$lib/types/PaginatedList';

export const load: PageLoad<PaginatedList<Recipe>> = async ({ fetch }) => {
	try {
		const res = await fetch(`${PUBLIC_API_URL}/recipes?limit=4`);
		const paginatedList = await res.json();

		return paginatedList;
	} catch (error) {
		return { data: [] };
	}
};
