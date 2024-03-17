<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';

	export let data: { recipe: Recipe };
</script>

<svelte:head>
	<title>{data.recipe?.name}</title>
	<!-- <meta name="description" content="{metaDescription}"> -->
	<!-- Other meta tags can be included here -->
</svelte:head>

<div class="spacing">
	<h1>{data.recipe?.name}</h1>

	<h2>Ingredients:</h2>
	<dl>
		{#each data.recipe?.ingredients as ingredient}
			<dt>{ingredient}</dt>
		{/each}
	</dl>

	<h2>Difficulty:</h2>
	<p>{data.recipe?.difficulty}</p>
</div>
