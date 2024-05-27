import { env } from '$env/dynamic/private';
import type { Recipe } from '$lib/types/Recipe';
import type { PaginatedList } from '$lib/types/PaginatedList';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<PaginatedList<Recipe>> = async ({ fetch, url }) => {
	const page = url.searchParams.has('pagina') ? `&page=${url.searchParams.get('pagina')}` : '';
	const name = url.searchParams.has('nombre') ? `&name=${url.searchParams.get('nombre')}` : '';

	const res = await fetch(`${env.API_URL}/recipes?limit=30${page}${name}`);
	const responseJson = await res.json();
	if ('status' in responseJson) {
		throw new Error(responseJson.title);
	}

	return responseJson;
};
