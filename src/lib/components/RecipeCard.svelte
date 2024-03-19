<script lang="ts">
	export let recipeId: string;
	export let recipeImage: string;
	export let recipeTitle: string;
	export let recipeSummary: string;
	import { PUBLIC_AZURE_STORAGE_SAS_TOKEN } from '$env/static/public';
	import { BookmarkEmpty, BookmarkFull } from "$lib";
	import placeholder from '$lib/assets/recipe_image_placeholder.png';
	import { onMount } from 'svelte';

	// TODO: Improve the following so no every single component instance hold the array of recipes saved
	let recipesSavedParsed: string[] = [];

	// Sync recipes saved across multiple possible open tabs
	onMount(() => {
		let recipesSaved = localStorage.getItem('recipesSaved');
		if (recipesSaved) recipesSavedParsed = JSON.parse(recipesSaved);

		window.addEventListener('storage', updateRecipesSaved);
		return () => {
			window.removeEventListener('storage', updateRecipesSaved);
		};
	});

	function saveRecipe(e: MouseEvent | KeyboardEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') return;

		const recipesSaved = localStorage.getItem('recipesSaved');
		if (!recipesSaved) {
			recipesSavedParsed = [recipeId];
		} else {
			recipesSavedParsed = JSON.parse(recipesSaved);
			if (!recipesSavedParsed.includes(recipeId)) {
				recipesSavedParsed.push(recipeId);
			} else {
				recipesSavedParsed = recipesSavedParsed.filter((id) => id !== recipeId);
			}
		}
		localStorage.setItem('recipesSaved', JSON.stringify(recipesSavedParsed));
	}

	function updateRecipesSaved() {
		const recipesSaved = localStorage.getItem('recipesSaved');
		if (recipesSaved) {
			recipesSavedParsed = JSON.parse(recipesSaved);
		}
	}
</script>

<div class="flex-column">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<a href={`/recetas/${recipeTitle}`}>
		<img
			class="recipe-image"
			src={recipeImage ? `${recipeImage}?${PUBLIC_AZURE_STORAGE_SAS_TOKEN}` : placeholder}
			alt="Photo of the recipe"
		/>
	</a>
	<div class="title-container">
		<a href={`/recetas/${recipeTitle}`}>
			<h2>{recipeTitle}</h2>
		</a>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
		<img
			class="clickable-icon bookmark-icon"
			alt=""
			src={recipesSavedParsed && recipesSavedParsed.includes(recipeId)
				? BookmarkFull
				: BookmarkEmpty}
			title="Guardar en mis recetas"
			on:keydown={saveRecipe}
			on:click={saveRecipe}
			role="button"
			tabindex="0"
		/>
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

	.bookmark-icon {
		height: min-content;
		width: 32px;

		@media (max-width: 720px) {
			height: 48px;
			width: 48px;
		}
	}
</style>
