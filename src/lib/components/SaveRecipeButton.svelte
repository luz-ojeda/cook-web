<script lang="ts">
	export let recipeId: string;
	export let label = false;

	import { BookmarkEmpty, BookmarkFull } from '$lib';
	import { onMount } from 'svelte';

	// TODO: Improve the following so no every single component instance hold the array of recipes saved
	let recipesSavedParsed: string[] = [];

	$: isRecipeSaved = recipesSavedParsed && recipesSavedParsed.includes(recipeId);

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
			recipesSavedParsed = [...recipesSavedParsed, recipeId];
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

<button
	aria-label="Guardar receta"
	class="flex-center interactive-pointer-opacity"
	on:keydown={saveRecipe}
	on:click={saveRecipe}
>
	<img
		class="bookmark-icon action-icon"
		alt=""
		src={isRecipeSaved ? BookmarkFull : BookmarkEmpty}
		title="Guardar en mis recetas"
	/>
	{#if label}
		<span class="action-label">{isRecipeSaved ? 'Guardada' : 'Guardar'}</span>
	{/if}
</button>

<style>
	button {
		border: 0;
		background-color: transparent;
		font-family: inherit;
		height: fit-content;
	}

	.bookmark-icon {
		height: min-content;
		width: var(--iconWidth);

		@media (max-width: 720px) {
			width: var(--iconMobileWidth);
		}
	}
</style>
