<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';
	import { recipesStore } from '../../stores/recipesStore';
	import { RecipeCard, RecipesAside } from '$lib';

	export let data: { recipes: Recipe[] };
	let recipesToDisplay: Recipe[];

	recipesStore.subscribe((recipes) => {
		recipesToDisplay = recipes;
	});

	onMount(() => {
		// Update recipes store with the recipes retrieved from API
		recipesStore.update((recipes) => data.recipes);
	});
</script>

<svelte:head>
	<title>Recetas</title>
</svelte:head>

<div class="flex spacing">
	<RecipesAside />

	<!-- Recipe cards -->
	{#if recipesToDisplay.length > 0}
		<div class="recipes-container flex-center">
			{#each recipesToDisplay as { id, name, summary, pictures }}
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
