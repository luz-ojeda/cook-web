import type { Pagination } from "$lib/types/PaginatedList";
import type { Recipe } from '$lib/types/Recipe';
import { writable } from 'svelte/store';

type RecipesStore = { recipes?: Recipe[]; loading: boolean; pagination?: Pagination | null };

export const recipesStore = writable<RecipesStore>({
	recipes: [],
	pagination: null,
	loading: false
});
