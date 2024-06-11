<script lang="ts">
	import { savedIds, savedRecipes } from '../../stores/savedRecipesStore';
	import { CircularLoading, RecipeCard, EmptyBox } from '$lib';

	let message = '';

	$: $savedIds && savedRecipes.loadRecipes();
</script>

<svelte:head>
	<title>Recetas guardadas</title>
</svelte:head>

<div class="spacing">
	<h1>Mis recetas guardadas</h1>
	<div class="container">
		{#if !$savedIds.loadingIdsFromLocalStorage}
			{#if $savedRecipes.loading}
				<CircularLoading width="72" />
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
					<div class="h-100 no-recipes-container">
						<h2>Aún no tienes ninguna guardada</h2>
						<a href="/recetas">Explorar recetas</a>
						<img class="empty-box" src={EmptyBox} alt="" />
					</div>
				{/if}
			{:else}
				<h2>{message}</h2>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../sass/colors.scss';
	@import '../../sass/variables.scss';

	.container {
		display: flex;
		justify-content: center;
		padding: 32px 0;
		width: 100%;
	}

	.empty-box {
		position: absolute;
		right: 10%;
		bottom: -180px;
		opacity: 0.3;
		width: 400px;
		z-index: -1;

		@media (max-width: $laptopBreakpoint) {
			right: -50px;
			bottom: -130px;
			width: 300px;
		}

		@media (max-width: $tabletBreakpoint) {
			position: static;
		}
	}

	.no-recipes-container {
		align-items: center;
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;

		a {
			color: $primaryColor;
			font-size: 1.125rem;
			font-weight: bold;
			&:hover {
				color: $lightPrimaryColor;
			}
		}
	}

	h2 {
		text-align: center;
	}
</style>
