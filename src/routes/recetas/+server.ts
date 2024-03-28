import { buildRecipesApiUrl } from '$lib/scripts/urls';
import { json } from '@sveltejs/kit';

export const GET = async ({ fetch, url }) => {
	const res = await fetch(buildRecipesApiUrl(url));
	const recipes = await res.json();

	return json(recipes);
};
