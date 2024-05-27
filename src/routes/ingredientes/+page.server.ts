import { env } from '$env/dynamic/private';
import type { GroupedIngredientsDTO } from '$lib/types/Ingredient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{ ingredients: GroupedIngredientsDTO }> = async ({ fetch }) => {
	const res = await fetch(`${env.API_URL}/ingredients`);
	const responseJson = await res.json();
	if ('status' in responseJson) {
		throw new Error(responseJson.title);
	}

	return { ingredients: responseJson };
};
