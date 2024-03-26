<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';
	import { parameters, recipes } from '../../stores/recipes';
	import { Pagination, RecipeCard, RecipesAside } from '$lib';
	import type { PaginatedList } from '$lib/types/PaginatedList';
	import { browser } from "$app/environment";

	export let data: PaginatedList<Recipe>;
	let recipesToDisplay: Recipe[];
	let name: string;
	let ingredients: string[];
	let difficulties: string[];
	let onlyVegetarian: boolean;
	let page: number;

	$: recipes.subscribe((store) => {
		recipesToDisplay = store.recipes ?? [];
	});

	$: parameters.subscribe((params) => {
		name = params.name;
		ingredients = params.ingredients;
		difficulties = params.difficulties;
		onlyVegetarian = params.onlyVegetarian;
		page = params.page;
	});

	async function getRecipes() {
		recipes.update(() => {
			return {
				loading: true
			};
		});

		let url = `/recetas?`;

		if (name) {
			url += `name=${name}&`;
		}

		if (difficulties && difficulties.length > 0) {
			for (let i = 0; i < difficulties.length; i++) {
				url += `difficulty=${difficulties[i]}&`;
			}
		}

		if (ingredients && ingredients.length > 0) {
			for (let i = 0; i < ingredients.length; i++) {
				url += `ingredients=${ingredients[i]}&`;
			}
		}

		if (onlyVegetarian) {
			url += `onlyVegetarian=true`;
		}

		url += `page=${page}`;

		const response = await fetch(url);
		const recipesPaginatedList: PaginatedList<Recipe> = await response.json();
		recipes.update((store) => {
			return {
				recipes: recipesPaginatedList.data,
				pagination: recipesPaginatedList.pagination,
				loading: false
			};
		});
	}

	$: browser && page && getRecipes();

	onMount(() => {
		// Update recipes store with the recipes retrieved from API
		recipes.update(() => {
			return {
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
	<RecipesAside {getRecipes} />
	{#if $recipes.pagination && $recipes.pagination.totalPages > 1}
		<Pagination
			currentPage={$recipes.pagination.pageNumber}
			totalPages={$recipes.pagination.totalPages}
		/>
	{/if}
	<div class:loading={$recipes.loading} class="recipes-container w-100">
		{#if recipesToDisplay.length > 0}
			{#each recipesToDisplay as { id, name, summary, pictures }}
				<RecipeCard
					recipeId={id}
					recipeTitle={name}
					recipeSummary={summary}
					recipeImage={pictures[0]}
				/>
			{/each}
		{:else}
			<div>No se encontraron recetas</div>
		{/if}
	</div>
</div>

<style>
	.loading {
		opacity: 0.6;
	}
</style>
