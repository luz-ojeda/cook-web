<script lang="ts">
	import { SaveRecipeButton, slugify, RecipeImage } from '$lib';

	export let recipeId: string;
	export let recipeImage: string;
	export let recipeTitle: string;
	export let recipeSummary: string;

	$: slugifiedRecipeTitle = slugify(recipeTitle);
</script>

<div class="container flex-column" data-testid="recipe-card">
	<a
		class="recipe-image-container non-text-anchor-element"
		href={`/recetas/${slugifiedRecipeTitle}`}
	>
		<RecipeImage {recipeTitle} {recipeImage} />
	</a>
	<div class="title-container">
		<a class="non-text-anchor-element" href={`/recetas/${slugifiedRecipeTitle}`}>
			<h2>{recipeTitle}</h2>
		</a>
		<SaveRecipeButton {recipeId} --iconWidth="32px" --mobileIconWidth="48px" />
	</div>
	{#if recipeSummary}
		<p>{recipeSummary}</p>
	{/if}
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.container {
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.8;
		}
	}

	h2 {
		margin: 0;
		overflow: hidden;
		max-width: 250px;
	}

	.title-container {
		display: flex;
		justify-content: space-between;
		font-size: 1rem;

		@media (max-width: 720px) {
			align-items: center;
		}
	}

	.recipe-image-container {
		display: inline-block;
		margin-bottom: 16px;
		height: 240px;

		@media (max-width: $mobileBreakpoint) {
			max-height: 150px;
		}
	}
</style>
