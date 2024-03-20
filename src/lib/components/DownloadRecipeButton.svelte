<script lang="ts">
	import { Download } from '$lib';
	import { browser } from '$app/environment';

	import { formatRecipeForCopyOrDownload } from '$lib/scripts/strings';
	import type { Recipe } from '$lib/types/Recipe';

	export let recipe: Recipe;

	let href: string;

	if (browser) {
		const blob = new Blob([formatRecipeForCopyOrDownload(recipe)], { type: 'text/plain' });
		href = window.URL.createObjectURL(blob);
	}

</script>

{#if browser}
	<a {href} download={"Receta de " + recipe.name} class="interactive-pointer-opacity flex-center">
		<img class="icon" alt="" src={Download} />
		<span>Descargar</span>
	</a>
{/if}

<style>
	a {
		text-decoration: none;
		color: inherit;
	}

	.icon {
		margin-right: 6px;
		width: 18px;
	}
</style>
