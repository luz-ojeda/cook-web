<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import { onMount } from 'svelte';
	import { savedRecipesIdsStore } from '../../stores/savedRecipesStore';
	import type { Recipe } from '$lib/types/Recipe';
	import { browser } from "$app/environment";

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
	<!-- Recipe cards -->
	{#if recipes.length > 0}
		<div class="recipes-container flex-center">
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