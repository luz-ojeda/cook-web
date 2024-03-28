import type { Recipe } from '$lib/types/Recipe';
import type { PaginatedList } from '$lib/types/PaginatedList';
import { buildRecipesApiUrl } from '$lib/scripts/urls';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad<PaginatedList<Recipe>> = async ({ url, fetch }) => {
	const res = await fetch(buildRecipesApiUrl(url));
	const responseJson = await res.json();
	if ('status' in responseJson) {
		throw new Error(responseJson.title);
	}

	return responseJson;
};
