<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import RecipesAside from '$lib/components/RecipesAside.svelte';
	import type { Recipe } from '$lib/types/Recipe';

	export let data: { recipes: Recipe[] };
</script>

<h1>Mis recetas guardadas</h1>
<!-- Recipe cards -->
{#if data.recipes.length > 0}
	<div class="recipes-container flex-center">
		{#each data.recipes as { id, name, summary, pictures }}
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
