<script lang="ts">
	import { onMount } from 'svelte';
	import { savedRecipesIdsStore } from '../../stores/savedRecipesStore';
	import { browser } from '$app/environment';
	import { CircularLoading, RecipeCard } from '$lib';
	import type { Recipe } from '$lib/types/Recipe';
	import type { PaginatedList } from '$lib/types/PaginatedList';

	let isLoadingRecipes = false;
	let recipes: Recipe[] = [];

	$: {
		if (browser && $savedRecipesIdsStore.length > 0) {
			loadSavedRecipes();
		}
	}

	async function loadSavedRecipes() {
		isLoadingRecipes = true;
		let url = `/recetas?`;
		for (let i = 0; i < $savedRecipesIdsStore.length; i++) {
			url += `ids=${$savedRecipesIdsStore[i]}&`;
		}

		const response = await fetch(url);
		const recipesPaginatedList: PaginatedList<Recipe> = await response.json();
		recipes = recipesPaginatedList.data;
		isLoadingRecipes = false;
	}

	onMount(async () => {
		if ($savedRecipesIdsStore.length > 0) {
			await loadSavedRecipes();
		}
	});
</script>

<svelte:head>
	<title>Recetas guardadas</title>
</svelte:head>

<div class="spacing">
	<h1>Mis recetas guardadas</h1>
	{#if isLoadingRecipes}
		<div class="loading-container">
			<CircularLoading --circle-width="72px" />
		</div>
	{/if}
	{#if recipes && recipes.length > 0}
		<div class="recipes-container">
			{#each recipes as { id, name, summary, pictures }}
				<RecipeCard
					recipeId={id}
					recipeTitle={name}
					recipeSummary={summary}
					recipeImage={pictures[0]}
				/>
			{/each}
		</div>
	{:else}
		<h2 class="no-recipes-container h-100 flex-center justify-center">
			Aún no tienes recetas guardadas
		</h2>
	{/if}
</div>

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		padding: 64px 0;
		width: 100%;
	}

	.no-recipes-container {
		padding: 64px;
		text-align: center;
	}
</style>
