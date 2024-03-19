<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';
	import { recipesStore } from '../../stores/recipesStore';
	import { RecipeCard, RecipesAside } from '$lib';

	export let data: { recipes: Recipe[] };
	let myRecipes: Recipe[];

	recipesStore.subscribe((recipes) => {
		myRecipes = recipes;
	});

	onMount(() => {
		// Update recipes store from the load function
		recipesStore.update((r) => data.recipes);
	});
</script>

<svelte:head>
	<title>Recetas</title>
</svelte:head>

<div class="flex spacing">
	<RecipesAside />

	<!-- Recipe cards -->
	{#if myRecipes.length > 0}
		<div class="recipes-container flex-center">
			{#each myRecipes as { id, name, summary, pictures }}
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

<style>
	.recipes-container {
		align-items: start;
		display: grid;
		column-gap: 32px;
		row-gap: 64px;
		grid-template-columns: repeat(3, 1fr);

		@media (max-width: 1200px) {
			column-gap: 64px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr 1fr;
		}

		@media (max-width: 720px) {
			display: block;
		}
	}
</style>
