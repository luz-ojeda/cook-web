import { env } from '$env/dynamic/private';
import type { Recipe } from '$lib/types/Recipe';
import type { PaginatedList } from '$lib/types/PaginatedList';
import type { PageServerLoad } from '../$types';
import { buildRecipesApiUrl } from '$lib';

export const load: PageServerLoad<PaginatedList<Recipe>> = async ({ url, fetch }) => {
	console.log("loading recipes from +page.server.ts with url: " + url)
	const res = await fetch(buildRecipesApiUrl(env.API_URL, url));
	const responseJson = await res.json();
	console.log(responseJson.pagination.pageNumber)
	if ('status' in responseJson) {
		throw new Error(responseJson.title);
	}

	return responseJson;
};
