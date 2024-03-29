import { buildRecipesBrowserUrl } from '$lib';
import type { PaginatedList } from '$lib/types/PaginatedList';
import type { Recipe, RecipeParameters } from '$lib/types/Recipe';
import type { RecipesStore } from '$lib/types/RecipesStore';
import { get, writable } from 'svelte/store';

type SavedRecipesStore = RecipesStore & Pick<RecipeParameters, 'page' | 'resultsPerPage'>;

export const savedIds = writable<{ loadingIdsFromLocalStorage: boolean; ids: string[] }>({
	loadingIdsFromLocalStorage: true,
	ids: []
});

function createSavedRecipes() {
	const store = writable<SavedRecipesStore>({
		recipes: undefined,
		pagination: null,
		loading: false
	});

	async function loadRecipes() {
		const recipesStore = get(store);
		const { ids } = get(savedIds);
		const { page, resultsPerPage } = recipesStore;

		if (ids.length === 0) {
			store.update((store) => {
				return {
					...store,
					recipes: []
				};
			});
			return;
		}

		toggleLoading();

		const url = buildRecipesBrowserUrl({
			ids,
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

export const savedRecipes = createSavedRecipes();
