import type { PageLoad } from './$types';
import type { Recipe } from "$lib/types/Recipe";

export const load: PageLoad<Recipe[]> = async ({ fetch }) => {
	const url = "http://localhost:5255"

	const res = await fetch(`${url}/recipes`);
	const recipes = await res.json();

	return recipes;
}