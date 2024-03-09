import { PUBLIC_API_URL } from '$env/static/public';
import { json } from "@sveltejs/kit";

export const GET = async ({ fetch, url }) => {
	const res = await fetch(`${PUBLIC_API_URL}/recipes?name=${url.searchParams.get('name')}`);
	const recipes = await res.json();

	return json(recipes);
};