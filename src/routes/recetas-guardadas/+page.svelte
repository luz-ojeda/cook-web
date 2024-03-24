<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import type { Recipe } from '$lib/types/Recipe';
	import { savedRecipesIdsStore } from '../../stores/savedRecipesStore';

	let isLoadingRecipes = false;

	$: getRecipes = async () => {
		if ($savedRecipesIdsStore.length == 0) return [];
		console.log($savedRecipesIdsStore)
		isLoadingRecipes = true;
		let url = `/recetas?`;
		for (let i = 0; i < $savedRecipesIdsStore.length; i++) {
			url += `ids=${$savedRecipesIdsStore[i]}&`;
		}
		
		const response = await fetch(url);
		isLoadingRecipes = false;
		return await response.json();
	}
	let recipesPromise = getRecipes();
</script>

<svelte:head>
	<title>Recetas guardadas</title>
</svelte:head>

<div class="spacing">
	<h1>Mis recetas guardadas</h1>
	<!-- Recipe cards -->
	{#await recipesPromise then recipes}
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
	{/await}
</div>
