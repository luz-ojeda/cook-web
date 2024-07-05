<script lang="ts">
	import { browser } from '$app/environment';
	import { Button, Icon, formatRecipeForCopyOrDownload } from '$lib';
	import type { Recipe } from '$lib/types/Recipe';

	export let recipe: Recipe;

	let href: string;

	$: if (browser) {
		const blob = new Blob([formatRecipeForCopyOrDownload(recipe)], { type: 'text/plain' });
		href = window.URL.createObjectURL(blob);
	}
</script>

{#if browser}
	<a {href} download={'Receta de ' + recipe.name} class="non-text-anchor-element">
		<Button buttonType="tertiary" tabIndex={-1}>
			<Icon class="icon-margin-right" name="download" width="18" height="18" />
			<span class="action-label">Descargar</span>
		</Button>
	</a>
{/if}

<style>
	a {
		border-radius: 7px;
	}
</style>
