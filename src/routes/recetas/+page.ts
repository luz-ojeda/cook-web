import type { Recipe } from "$lib/types/Recipe";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }): Promise<{ recipes: Recipe[] }> {
    const url = "http://localhost:5255"

	const res = await fetch(`${url}/recipes`);
	const recipes = await res.json();

	return { recipes };
}