<script lang="ts">
	import { BookmarkEmpty, BookmarkFull } from '$lib';
	import { onMount } from 'svelte';
	import { savedIds } from '../../stores/savedRecipesStore';

	export let recipeId: string;
	export let label = false;

	$: isRecipeSaved = $savedIds.ids.includes(recipeId);

	// Sync recipes saved across multiple possible open tabs
	onMount(() => {
		window.addEventListener('storage', updateRecipesSaved);

		return () => {
			window.removeEventListener('storage', updateRecipesSaved);
		};
	});

	function saveRecipe(e: MouseEvent | KeyboardEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') return;

		const recipesSaved = localStorage.getItem('recipesSaved');
		if (!recipesSaved) {
			$savedIds.ids = [...$savedIds.ids, recipeId];
		} else {
			if (!$savedIds.ids.includes(recipeId)) {
				$savedIds.ids = [...$savedIds.ids, recipeId];
			} else {
				$savedIds.ids = $savedIds.ids.filter((id) => id !== recipeId);
			}
		}
		localStorage.setItem('recipesSaved', JSON.stringify($savedIds.ids));
	}

	function updateRecipesSaved() {
		const recipesSaved = localStorage.getItem('recipesSaved');
		if (recipesSaved) {
			$savedIds.ids = [...JSON.parse(recipesSaved)];
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
		class="bookmark-icon {label ? 'action-icon' : ''}"
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
		padding: 0;
	}

	.bookmark-icon {
		height: min-content;
		width: var(--iconWidth);

		@media (max-width: 720px) {
			width: var(--iconMobileWidth);
		}
	}
</style>
