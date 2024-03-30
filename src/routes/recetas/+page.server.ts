import type { Recipe } from '$lib/types/Recipe';
import type { PaginatedList } from '$lib/types/PaginatedList';
import type { PageServerLoad } from '../$types';
import { buildRecipesApiUrl } from '$lib';

export const load: PageServerLoad<PaginatedList<Recipe>> = async ({ url, fetch }) => {
	await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
	const res = await fetch(buildRecipesApiUrl(url));
	const responseJson = await res.json();
	if ('status' in responseJson) {
		throw new Error(responseJson.title);
	}

	return responseJson;
};
