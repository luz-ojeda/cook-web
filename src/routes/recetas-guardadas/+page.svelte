<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';

	let recipes: Recipe[] = [];

	async function getRecipes(recipesIds: string[]) {
		let url = '/recetas?';
		for (let i = 0; i < recipesIds.length; i++) {
			url += `ids=${recipesIds[i]}&`;
		}

		const response = await fetch(url);
		const responseJson = await response.json();

		return responseJson;
	}

	onMount(async () => {
		const recipesSaved = localStorage.getItem('recipesSaved');
		if (recipesSaved) {
			const recipesSavedParsed = JSON.parse(recipesSaved);
			recipes = await getRecipes(recipesSavedParsed);
		}
	});
</script>

<svelte:head>
  <title>Recetas guardadas</title>
</svelte:head>

<div class="spacing">
	<h1>Mis recetas guardadas</h1>
	<!-- Recipe cards -->
	{#if recipes.length > 0}
		<div class="recipes-container flex-center">
			{#each recipes as { id, name, summary, pictures }}
				<!-- href="/recetas/{name}" -->
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
