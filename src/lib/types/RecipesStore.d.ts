import type { Pagination } from '$lib/types/PaginatedList';

type RecipesStore = {
	recipes?: Recipe[];
	loading: boolean;
	pagination?: Pagination | null;
};

export { RecipesStore, RecipeParameters };
