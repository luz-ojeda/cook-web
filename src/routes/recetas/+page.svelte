<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import RecipesAside from '$lib/components/RecipesAside.svelte';
	import type { Recipe } from '$lib/types/Recipe';

	export let data: { recipes: Recipe[] };
</script>

<div class="flex spacing">
	<RecipesAside />

	<!-- Recipe cards -->
	{#if data.recipes.length > 0}
		<div class="recipes-container flex-center">
			{#each data.recipes as { name, summary, pictures }}
				<!-- href="/recetas/{name}" -->
				<RecipeCard recipeTitle={name} recipeSummary={summary} recipeImage={pictures[0]} />
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
