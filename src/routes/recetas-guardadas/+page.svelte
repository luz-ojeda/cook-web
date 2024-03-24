<script lang="ts">
	import { onMount } from 'svelte';
	import { savedRecipesIdsStore } from '../../stores/savedRecipesStore';
	import { CircularLoading, RecipeCard } from '$lib';
	import type { Recipe } from '$lib/types/Recipe';
	import { browser } from '$app/environment';

	let isLoadingRecipes = false;
	let recipes: Recipe[] = [];

	$: {
		if (browser && $savedRecipesIdsStore.length > 0) {
			getRecipes();
		}
	}

	async function getRecipes() {
		isLoadingRecipes = true;
		let url = `/recetas?`;
		for (let i = 0; i < $savedRecipesIdsStore.length; i++) {
			url += `ids=${$savedRecipesIdsStore[i]}&`;
		}

		const response = await fetch(url);
		isLoadingRecipes = false;
		recipes = await response.json();
	}

	onMount(async () => {
		if ($savedRecipesIdsStore.length > 0) {
			await getRecipes();
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
	{#if recipes.length > 0}
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
	{/if}
</div>

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		padding: 64px 0;
		width: 100%;
	}
</style>
