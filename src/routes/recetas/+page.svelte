<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';
	import { recipes } from '../../stores/recipes';
	import { Pagination, RecipeCard, RecipesSearchForm } from '$lib';
	import type { PaginatedList } from '$lib/types/PaginatedList';

	export let data: PaginatedList<Recipe>;

	function onPageClick(page: number) {
		$recipes.page = page;
		recipes.loadRecipes();
		window.scrollTo(0, 0)
	}

	onMount(() => {
		recipes.update((store) => {
			return {
				...store,
				recipes: data.data,
				pagination: data.pagination,
				loading: false
			};
		});
	});
</script>

<svelte:head>
	<title>Recetas</title>
</svelte:head>

<div class="flex spacing">
	<aside>
		<RecipesSearchForm />
	</aside>
	<div class="w-100 {$recipes.loading ? 'loading' : ''}">
		{#if $recipes.recipes && $recipes.recipes.length > 0}
			<div class="recipes-container">
				{#each $recipes.recipes as { id, name, summary, pictures }}
					<RecipeCard
						recipeId={id}
						recipeTitle={name}
						recipeSummary={summary}
						recipeImage={pictures[0]}
					/>
				{/each}
			</div>
			{#if $recipes.pagination && $recipes.pagination.totalPages > 1}
				<div class="pagination">
					<Pagination
						currentPage={$recipes.pagination.pageNumber}
						{onPageClick}
						totalPages={$recipes.pagination.totalPages}
					/>
				</div>
			{/if}
		{:else if !$recipes.loading}
			<h2 class="h-100 flex-center justify-center">
				No se encontraron recetas usando esas opciones de búsqueda
			</h2>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	aside {
		margin-right: 32px;
		min-width: 265px;

		@media (max-width: $tabletBreakpoint) {
			display: none;
		}
	}

	.loading {
		opacity: 0.6;
	}

	.pagination {
		display: flex;
		justify-content: center;
		margin-top: 24px;
	}
</style>
