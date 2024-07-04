<script lang="ts">
	import { onMount } from 'svelte';
	import { savedIds } from '../../stores/savedRecipesStore';
	import { Icon, Button } from '$lib';

	export let recipeId: string;
	export let label = false;
	export let iconWidth: string | null = null;

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

<Button buttonType="tertiary" onClick={saveRecipe} size="small">
	{#if isRecipeSaved}
		<Icon
			class={label ? 'icon-margin-right' : ''}
			name="bookmark_full"
			title="Quitar de mis recetas guardadas"
			height={iconWidth ?? '32'}
			width={iconWidth ?? '32'}
		/>
	{:else}
		<Icon
			class={label ? 'icon-margin-right' : ''}
			fill="none"
			name="bookmark_empty"
			title="Guardar en mis recetas"
			height={iconWidth ?? '32'}
			width={iconWidth ?? '32'}
		/>
	{/if}
	{#if label}
		<span class="action-label">{isRecipeSaved ? 'Guardada' : 'Guardar'}</span>
	{/if}
</Button>
