import { buildRecipesBrowserUrl } from '$lib';
import type { PaginatedList } from '$lib/types/PaginatedList';
import type { Recipe, RecipeParameters } from '$lib/types/Recipe';
import type { RecipesStore } from '$lib/types/RecipesStore';
import { get, writable } from 'svelte/store';

type RecipesStoreWithParameters = RecipeParameters & RecipesStore;

export const initialState = {
	recipes: undefined,
	pagination: null,
	loading: false,
	name: '',
	difficulties: [],
	ingredients: [],
	onlyVegetarian: false,
	page: undefined,
	perPage: undefined
};

export function createRecipes() {
	const store = writable<RecipesStoreWithParameters>(initialState);

	async function loadRecipes() {
		toggleLoading();

		const { name, difficulties, ingredients, onlyVegetarian, page, perPage } = get(store);
		const url = buildRecipesBrowserUrl({
			name,
			ingredients,
			difficulties,
			onlyVegetarian,
			page,
			perPage
		});

		const response = await fetch(url);
		const recipesPaginatedList: PaginatedList<Recipe> = await response.json();
		store.update((store) => {
			return {
				...store,
				recipes: recipesPaginatedList.data,
				pagination: recipesPaginatedList.pagination,
				loading: false
			};
		});
	}

	function toggleLoading() {
		store.update((store) => {
			return {
				...store,
				loading: !store.loading
			};
		});
	}

	return { ...store, loadRecipes, toggleLoading };
}

export const recipes = createRecipes();
