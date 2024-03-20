<script lang="ts">
	export let recipeId: string;
	export let recipeImage: string;
	export let recipeTitle: string;
	export let recipeSummary: string;
	import { PUBLIC_AZURE_STORAGE_SAS_TOKEN } from '$env/static/public';
	import { SaveRecipeButton } from '$lib';
	import placeholder from '$lib/assets/recipe_image_placeholder.png';
</script>

<div class="flex-column">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<a href={`/recetas/${recipeTitle}`}>
		<img
			class="rounded-img recipe-image"
			src={recipeImage ? `${recipeImage}?${PUBLIC_AZURE_STORAGE_SAS_TOKEN}` : placeholder}
			alt="Photo of the recipe"
		/>
	</a>
	<div class="title-container">
		<a href={`/recetas/${recipeTitle}`}>
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
	a {
		text-decoration: none;
	}

	.recipe-image {
		aspect-ratio: 1 / 1;
		margin-bottom: 16px;
		width: 100%;
		object-fit: cover;
	}

	h2 {
		margin: 0;
		text-transform: uppercase;
	}

	.title-container {
		display: flex;
		justify-content: space-between;

		@media (max-width: 720px) {
			align-items: center;
		}
	}
</style>
