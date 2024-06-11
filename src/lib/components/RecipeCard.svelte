<script lang="ts">
	import { SaveRecipeButton, slugify } from '$lib';
	import placeholder from '$lib/assets/recipe_image_placeholder.svg';

	export let recipeId: string;
	export let recipeImage: string;
	export let recipeTitle: string;
	export let recipeSummary: string;

	$: slugifiedRecipeTitle = slugify(recipeTitle);
</script>

<div class="container flex-column" data-testid="recipe-card">
	<a class="non-text-anchor-element" href={`/recetas/${slugifiedRecipeTitle}`}>
		<img
			alt={`Photo of the recipe ${recipeTitle}`}
			class="rounded-img recipe-image {recipeImage ? 'object-fit-cover' : ''}"
			crossorigin="anonymous"
			loading="lazy"
			src={recipeImage ? recipeImage : placeholder}
		/>
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
	@import '../../sass/colors.scss';

	.container {
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.8;
		}
	}

	.recipe-image {
		aspect-ratio: 1 / 1;
		box-shadow: $smallestShadow;
		margin-bottom: 16px;
		max-height: 240px;
		display: inline-block;
		width: 100%;

		@media (max-width: $mobileBreakpoint) {
			max-height: 150px;
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

	a {
		&:hover {
			color: inherit;
		}
	}
</style>
