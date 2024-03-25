import { PUBLIC_API_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export const GET = async ({ fetch, url }) => {
	let urlWithParams = `${PUBLIC_API_URL}/recipes?`;

	if (url.searchParams.get('name')) {
		const name = url.searchParams.get('name');
		urlWithParams += `&name=${name}`;
	}

	if (url.searchParams.getAll('ids')) {
		const ids = url.searchParams.getAll('ids');
		for (let i = 0; i < ids.length; i++) {
			urlWithParams += `&ids=${ids[i]}`;
		}
	}

	if (url.searchParams.get('difficulty')) {
		const difficulties = url.searchParams.getAll('difficulty');
		for (let i = 0; i < difficulties.length; i++) {
			urlWithParams += `&difficulty=${difficulties[i]}`;
		}
	}

	if (url.searchParams.get('ingredients')) {
		const ingredients = url.searchParams.getAll('ingredients');
		for (let i = 0; i < ingredients.length; i++) {
			urlWithParams += `&ingredients=${ingredients[i]}`;
		}
	}

	if (url.searchParams.get('onlyVegetarian')) {
		const vegetarian = url.searchParams.get('onlyVegetarian');
		urlWithParams += `&onlyVegetarian=${vegetarian}`;
	}

	const res = await fetch(urlWithParams);
	const recipes = await res.json();

	return json(recipes);
};
