<script lang="ts">
	import type { Recipe } from "$lib/types/Recipe";

	export let data: { recipe: Recipe };
</script>

<h1>{data.recipe?.name}</h1>

<h2>Ingredients:</h2>
{#each data.recipe?.ingredients as ingredient}
	<li>{ingredient}</li>
{/each}

<h2>Difficulty:</h2>
<p>{data.recipe?.difficulty}</p>
