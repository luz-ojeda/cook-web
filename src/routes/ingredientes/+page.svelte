<script lang="ts">
	import { capitalizeFirstLetter } from '$lib';
	import type { GroupedIngredientsDTO } from '$lib/types/Ingredient';

	export let data: { ingredients: GroupedIngredientsDTO };
</script>

<svelte:head>
	<title>Índice de ingredientes</title>
</svelte:head>

<div class="spacing">
	<h1>Índice de ingredientes</h1>
	{#each data.ingredients as ingredientsByLetter}
		<div class="ingredients-group">
			<h2>{ingredientsByLetter.letter}</h2>
			<hr size="1">
			<ul>
				{#each ingredientsByLetter.ingredients as ingredient}
					<li class="ingredient">
						<a href={`/recetas?ingredientes=${ingredient.name}`}
							>{capitalizeFirstLetter(ingredient.name)}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.ingredients-group {
		margin-bottom: 24px;
	}

	.ingredient {
		font-size: 1.125rem;
		margin-bottom: 10px;
	}

	h2 {
		margin-bottom: 0;
	}

	ul {
		list-style: none;
		columns: 4;

		@media (max-width: $laptopBreakpoint) {
			columns: 3;
		}

		@media (max-width: $tabletBreakpoint) {
			columns: 2;
		}
	}
</style>
