<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';
	import { recipesStore } from '../../stores/recipesStore';
	import { RecipeCard, RecipesAside } from '$lib';

	export let data: { recipes: Recipe[] };
	let recipesToDisplay: Recipe[];

	$:

	recipesStore.subscribe((store) => {
		recipesToDisplay = store.recipes ?? [];
	});

	onMount(() => {
		// Update recipes store with the recipes retrieved from API
		recipesStore.update(() => {
			return {
				recipes: data.recipes,
				loading: false
			};
		});
	});
</script>

<svelte:head>
	<title>Recetas</title>
</svelte:head>

<div class="flex spacing">
	<RecipesAside />

	<div class:loading={$recipesStore.loading} class="recipes-container w-100">
		{#if recipesToDisplay.length > 0}
			{#each recipesToDisplay as { id, name, summary, pictures }}
				<!-- href="/recetas/{name}" -->
				<RecipeCard
					recipeId={id}
					recipeTitle={name}
					recipeSummary={summary}
					recipeImage={pictures[0]}
				/>
			{/each}
		{/if}
	</div>
</div>

<style>
	.loading {
		opacity: 0.6;
	}
</style>