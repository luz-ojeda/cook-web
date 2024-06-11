import { env } from '$env/dynamic/private';
import { buildRecipesApiUrl } from '$lib';
import { json } from '@sveltejs/kit';

export const GET = async ({ fetch, url }) => {
	console.log("executing recipes fetch")
	const res = await fetch(buildRecipesApiUrl(env.API_URL, url), {
		headers: {
			'x-api-key': `${env.API_KEY}`
		}
	});
	const recipes = await res.json();

	return json(recipes);
};
