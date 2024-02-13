<script>
	export let data;
</script>

<h1>{data.recipe?.name}</h1>

<h2>Ingredients:</h2>
{#each data.recipe?.ingredients as ingredient }
	<li>{ingredient}</li>
{/each}