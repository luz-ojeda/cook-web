<script lang="ts">
	import HomeSearch from '$lib/components/HomeSearch.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import type { Recipe } from '$lib/types/Recipe';

	export let data: { recipes: Recipe[] };
</script>

<svelte:head>
  <title>Cook</title>
</svelte:head>

<!-- Hero -->
<div class="spacing hero flex-center">
	<div>
		<h1>Recetas simples</h1>
		<p>
			Descubrí recetas auténticas y deliciosas, sin anuncios molestos. Tu experiencia culinaria
			merece ser ininterrumpida. Busca según ingredientes, dificultad y nombre:
		</p>
	</div>

	<div>
		<HomeSearch />
	</div>
</div>

<!-- Recipe cards -->
{#if data.recipes.length > 0}
	<div class="background">
		<div class="recipes-container spacing flex-center">
			{#each data.recipes as { id, name, summary, pictures }}
				<RecipeCard
					recipeId={id}
					recipeTitle={name}
					recipeSummary={summary}
					recipeImage={pictures[0]}
				/>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.hero {
		@media (max-width: 1200px) {
			flex-direction: column;
			padding-bottom: 32px;
			text-align: center;
		}
	}

	.hero > div:first-of-type {
		flex-basis: 100%;
	}

	.hero div:nth-of-type(2) {
		flex-basis: 65%;
	}

	.hero div:first-of-type {
		@media (min-width: 720px) {
			margin-right: 48px;
		}
	}

	.background {
		background-color: lightgray;
	}
</style>
