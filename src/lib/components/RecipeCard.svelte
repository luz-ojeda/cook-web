<script lang="ts">
	import { PUBLIC_AZURE_STORAGE_SAS_TOKEN } from '$env/static/public';
	import { SaveRecipeButton } from '$lib';
	import placeholder from '$lib/assets/recipe_image_placeholder.png';

	export let recipeId: string;
	export let recipeImage: string;
	export let recipeTitle: string;
	export let recipeSummary: string;

	$: slugifiedRecipeTitle = recipeTitle.toLowerCase().replace(" ", "-");
</script>

<div class="flex-column">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<a href={`/recetas/${slugifiedRecipeTitle}`}>
		<img
			class="rounded-img recipe-image"
			src={recipeImage ? `${recipeImage}?${PUBLIC_AZURE_STORAGE_SAS_TOKEN}` : placeholder}
			alt="Photo of the recipe"
		/>
	</a>
	<div class="title-container">
		<a href={`/recetas/${slugifiedRecipeTitle}`}>
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
		object-fit: cover;
		width: 100%;
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
</style>
