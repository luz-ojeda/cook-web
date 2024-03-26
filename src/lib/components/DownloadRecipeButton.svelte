<script lang="ts">
	import { Download, formatRecipeForCopyOrDownload } from '$lib';
	import { browser } from '$app/environment';

	import type { Recipe } from '$lib/types/Recipe';

	export let recipe: Recipe;

	let href: string;

	$: if (browser) {
		const blob = new Blob([formatRecipeForCopyOrDownload(recipe)], { type: 'text/plain' });
		href = window.URL.createObjectURL(blob);
	}
</script>

{#if browser}
	<a
		{href}
		download={'Receta de ' + recipe.name}
		class="flex-center interactive-pointer-opacity flex-center"
	>
		<img class="action-icon" alt="" src={Download} />
		<span class="action-label">Descargar</span>
	</a>
{/if}

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
