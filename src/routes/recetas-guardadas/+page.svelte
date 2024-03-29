<script lang="ts">
	import { savedIds, savedRecipes } from '../../stores/savedRecipesStore';
	import { CircularLoading, RecipeCard } from '$lib';

	let message = '';

	$: $savedIds && savedRecipes.loadRecipes();
</script>

<svelte:head>
	<title>Recetas guardadas</title>
</svelte:head>

<div class="spacing">
	<h1>Mis recetas guardadas</h1>
	{#if !$savedIds.loadingIdsFromLocalStorage}
		{#if $savedRecipes.loading}
			<div class="loading-container">
				<CircularLoading --circle-width="72px" />
			</div>
		{:else if !message}
			{#if $savedRecipes.recipes && $savedRecipes.recipes.length > 0}
				<div class="recipes-container">
					{#each $savedRecipes.recipes as { id, name, summary, pictures }}
						<RecipeCard
							recipeId={id}
							recipeTitle={name}
							recipeSummary={summary}
							recipeImage={pictures[0]}
						/>
					{/each}
				</div>
			{:else if $savedRecipes.recipes && $savedRecipes.recipes.length === 0}
				<h2 class="no-recipes-container h-100 flex-center justify-center">
					Aún no tienes recetas guardadas
				</h2>
			{/if}
		{:else}
			<h2>{message}</h2>
		{/if}
	{/if}
</div>

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		padding: 64px 0;
		width: 100%;
	}

	.no-recipes-container {
		padding: 64px;
		text-align: center;
	}

	h2 {
		padding: 48px;
		text-align: center;
	}
</style>
