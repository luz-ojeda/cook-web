import { env } from '$env/dynamic/private';
import type { Recipe } from '$lib/types/Recipe';
import type { PaginatedList } from '$lib/types/PaginatedList';
import type { PageServerLoad } from './$types';
import { logRecipesError } from '../errorLogging';

export const load: PageServerLoad<PaginatedList<Recipe>> = async ({ fetch }) => {
	try {
		const res = await fetch(`${env.API_URL}/recipes?limit=4`);
		const responseJson = await res.json();
		if ('status' in responseJson) {
			throw new Error(responseJson.title);
		}

		return responseJson;
	} catch (error) {
		logRecipesError('/', error); // TODO: Check if this duplication makes sense since in errorLogging we check for the route
		return { data: [] };
	}
};
