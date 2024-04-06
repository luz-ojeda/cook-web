<script lang="ts">
	import { PUBLIC_AZURE_STORAGE_SAS_TOKEN } from '$env/static/public';
	import { SaveRecipeButton } from '$lib';
	import placeholder from '$lib/assets/recipe_image_placeholder.png';

	export let recipeId: string;
	export let recipeImage: string;
	export let recipeTitle: string;
	export let recipeSummary: string;
	$: slugifiedRecipeTitle = recipeTitle.toLowerCase().replaceAll(' ', '-');
</script>

<div class="flex-column">
	<a class="non-text-anchor-element" href={`/recetas/${slugifiedRecipeTitle}`}>
		<img
			alt={`Photo of the recipe ${recipeTitle}`}
			class="rounded-img recipe-image"
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

	.recipe-image {
		aspect-ratio: 1 / 1;
		box-shadow: $smallestShadow;
		margin-bottom: 16px;
		max-height: 240px;
		display: inline-block;
		object-fit: cover;
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
		font-size: 16px;

		@media (max-width: 720px) {
			align-items: center;
		}
	}

	a {
		text-decoration: none;
	}
</style>
