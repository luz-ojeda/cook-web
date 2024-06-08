import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { RecipeParameters } from '$lib/types/Recipe';

function buildRecipesApiUrl(apiUrl: string, url: URL) {
	let urlWithParams = `${apiUrl}/recipes?`;

	const page = url.searchParams.get('pagina');
	urlWithParams += `page=${page ?? '1'}`;

	const limit = url.searchParams.get('por_pagina');
	urlWithParams += `&limit=${limit ?? '9'}`;

	if (url.searchParams.get('nombre')) {
		const name = url.searchParams.get('nombre');
		urlWithParams += `&name=${name}`;
	}

	if (url.searchParams.getAll('ids')) {
		const ids = url.searchParams.getAll('ids');
		for (let i = 0; i < ids.length; i++) {
			urlWithParams += `&ids=${ids[i]}`;
		}
	}

	if (url.searchParams.get('dificultad')) {
		const difficulties = url.searchParams.getAll('dificultad');
		for (let i = 0; i < difficulties.length; i++) {
			urlWithParams += `&difficulty=${difficulties[i]}`;
		}
	}

	if (url.searchParams.get('ingredientes')) {
		const ingredients = url.searchParams.getAll('ingredientes');
		for (let i = 0; i < ingredients.length; i++) {
			urlWithParams += `&ingredients=${ingredients[i]}`;
		}
	}

	if (url.searchParams.get('soloVegetarianas')) {
		const vegetarian = url.searchParams.get('soloVegetarianas');
		urlWithParams += `&onlyVegetarian=${vegetarian}`;
	}

	return urlWithParams;
}

function buildRecipesBrowserUrl({
	name,
	ingredients,
	difficulties,
	onlyVegetarian,
	page,
	perPage,
	ids
}: RecipeParameters) {
	let browserUrl = `/recetas?`;

	if (name) {
		browserUrl += `nombre=${name}&`;
	}

	if (difficulties && difficulties.length > 0) {
		for (let i = 0; i < difficulties.length; i++) {
			browserUrl += `dificultad=${difficulties[i]}&`;
		}
	}

	if (ingredients && ingredients.length > 0) {
		for (let i = 0; i < ingredients.length; i++) {
			browserUrl += `ingredientes=${ingredients[i]}&`;
		}
	}

	if (onlyVegetarian) {
		browserUrl += `soloVegetarianas=true&`;
	}

	if (ids && ids.length > 0) {
		for (let i = 0; i < ids.length; i++) {
			browserUrl += `ids=${ids[i]}&`;
		}
	}

	browserUrl += `pagina=${page ?? '1'}&por_pagina=${perPage ?? '9'}`;

	return browserUrl;
}

function updateURLSearchParams(params: { [key: string]: string | undefined | null }) {
	if (browser) {
		const url = new URL(window.location.href);
		for (const param in params) {
			const value = params[param];
			if (value) {
				url.searchParams.set(param, value);
			} else {
				url.searchParams.delete(param);
			}
		}
		goto(url);
	}
}

export { buildRecipesApiUrl, buildRecipesBrowserUrl, updateURLSearchParams };
