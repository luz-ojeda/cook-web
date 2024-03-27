import type { Recipe } from '$lib/types/Recipe';
import type { PaginatedList } from '$lib/types/PaginatedList';
import { buildRecipesApiUrl } from '$lib/scripts/urls';
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad<PaginatedList<Recipe>> = async ({ url, fetch }) => {
	try {
		const recipesUrl = buildRecipesApiUrl(url);
		const res = await fetch(recipesUrl);
		const paginatedList = await res.json();

		return paginatedList;
	} catch (error) {
		return { data: [] };
	}
};
