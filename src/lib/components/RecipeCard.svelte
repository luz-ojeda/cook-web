<script lang="ts">
	export let recipeImage: string;
	export let recipeTitle: string;
	export let recipeSummary: string;
	import { PUBLIC_AZURE_STORAGE_SAS_TOKEN } from '$env/static/public';
	import placeholder from '$lib/assets/recipe_image_placeholder.png';
	import bookmarkEmpty from '$lib/assets/bookmark_empty.svg';
</script>

<div class="flex-column">
	<a href={`/recetas/${recipeTitle}`}>
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img
			src={recipeImage ? `${recipeImage}?${PUBLIC_AZURE_STORAGE_SAS_TOKEN}` : placeholder}
			alt="Photo of the recipe"
		/>
		<div class="title-container">
			<h2>{recipeTitle}</h2>
			<img class="icon" alt="" src={bookmarkEmpty} title="Guardar en mis recetas" height="32" width="32" />
		</div>
		{#if recipeSummary}
			<p>{recipeSummary}</p>
		{/if}
	</a>
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	img {
		aspect-ratio: 1 / 1;
		border-radius: $borderRadius;
		margin-bottom: 16px;
		max-width: 100%;
		object-fit: cover;
	}

	h2 {
		margin: 0;
		text-transform: uppercase;
	}

	.title-container {
		display: flex;
	}
</style>
