import type { Pagination } from '$lib/types/PaginatedList';
import type { Recipe } from '$lib/types/Recipe';
import { writable } from 'svelte/store';

type RecipeParameters = {
	ingredients: string[];
	difficulties: string[];
	onlyVegetarian: boolean;
	name: string;
	page: number;
	resultsPerPage: number;
};

type RecipesStore = {
	recipes?: Recipe[];
	loading: boolean;
	pagination?: Pagination | null;
};

export const parameters = writable<RecipeParameters>({
	name: '',
	difficulties: [],
	ingredients: [],
	onlyVegetarian: false,
	page: 1,
	resultsPerPage: 9
});

export const recipes = writable<RecipesStore>({
	recipes: [],
	pagination: null,
	loading: false
});