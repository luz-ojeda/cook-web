<script lang="ts">
	import placeholder from '$lib/assets/recipe_image_placeholder.svg';

	export let recipeImage: string;
	export let recipeTitle: string;
</script>

<img
	alt={`Foto de la receta ${recipeTitle}`}
	class="rounded-img recipe-image"
	crossorigin="anonymous"
	loading="lazy"
	src={recipeImage ? recipeImage : placeholder}
/>

<style lang="scss">
	@import '../../sass/variables.scss';
	@import '../../sass/colors.scss';

	.recipe-image {
		object-fit: cover;
		background-color: var(--body-bg);
		box-shadow: $smallestShadow;
		display: inline-block;
		height: inherit;
        max-height: inherit;
		width: 100%;
	}

	.recipe-image[src*='placeholder'] {
        object-fit: contain;
	}

	:global(.dark) .recipe-image {
		background-color: var(--grey800);
	}
</style>
