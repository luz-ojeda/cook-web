<script lang="ts">
	import { browser } from '$app/environment';
	import { Icon, formatRecipeForCopyOrDownload } from '$lib';
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
		class="non-text-anchor-element flex-center interactive-pointer-opacity flex-center"
	>
		<Icon class="icon-margin-right" name="download" width="18" height="18" />
		<span class="action-label">Descargar</span>
	</a>
{/if}

<style lang="scss">
	@import "../../sass/colors.scss";

	a:hover {
		color: $grey900;
	}
</style>