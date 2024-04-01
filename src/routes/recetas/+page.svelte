<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';
	import { recipes } from '../../stores/recipes';
	import { CircularLoading, Pagination, RecipeCard, RecipesSearchForm, SearchEmpty } from '$lib';
	import type { PaginatedList } from '$lib/types/PaginatedList';

	export let data: PaginatedList<Recipe>;

	function onPageClick(page: number) {
		$recipes.page = page;
		recipes.loadRecipes();
		window.scrollTo(0, 0);
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
	<div
		class="w-100 {$recipes.loading ? 'loading' : ''} {!$recipes.loading &&
		$recipes.recipes !== undefined &&
		$recipes.recipes.length === 0
			? 'no-recipes-found-container'
			: ''}"
	>
		{#if $recipes.recipes && $recipes.recipes.length > 0 && !$recipes.loading}
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
		{:else if $recipes.loading}
			<div class="w-100 h-100 flex-full-center">
				<CircularLoading --background="#e7e2da" --circle-width="72px" />
			</div>
		{:else if !$recipes.loading && $recipes.recipes !== undefined}
			<div class="h-100">
				<h2 class="mobile-text-center">
					No se encontraron recetas usando esas opciones de búsqueda
				</h2>
				<img class="no-recipes-image" src={SearchEmpty} alt="" />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	aside {
		margin-right: 32px;
		width: 320px;

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

	.no-recipes-found-container {
		padding: 64px 0;
		align-items: center;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.no-recipes-image {
		position: absolute;
		right: 50px;
		bottom: -75px;
		opacity: 0.3;
		width: 250px;
		z-index: -1;

		@media (min-width: $laptopBreakpoint) {
			bottom: -120px;
			width: 300px;
		}
	}
</style>
