import { buildRecipesBrowserUrl } from '$lib';
import type { PaginatedList, Pagination } from '$lib/types/PaginatedList';
import type { Recipe } from '$lib/types/Recipe';
import { get, writable } from 'svelte/store';

type RecipeParameters = {
	ingredients: string[];
	difficulties: string[];
	onlyVegetarian: boolean;
	name: string;
	page: number;
	resultsPerPage: number;
};

type RecipesStore = RecipeParameters & {
	recipes?: Recipe[];
	loading: boolean;
	pagination?: Pagination | null;
};

export function createRecipes() {
	const store = writable<RecipesStore>({
		recipes: [],
		pagination: null,
		loading: false,
		name: '',
		difficulties: [],
		ingredients: [],
		onlyVegetarian: false,
		page: 1,
		resultsPerPage: 9
	});

	async function loadRecipes() {
		toggleLoading();

		const recipesStore = get(store);
		const { name, difficulties, ingredients, onlyVegetarian, page, resultsPerPage } = recipesStore;

		const url = buildRecipesBrowserUrl({
			name,
			ingredients,
			difficulties,
			onlyVegetarian,
			page,
			resultsPerPage
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
