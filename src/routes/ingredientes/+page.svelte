<script lang="ts">
	import { capitalizeFirstLetter } from '$lib';
	import type { GroupedIngredientsDTO } from '$lib/types/Ingredient';

	export let data: { ingredients: GroupedIngredientsDTO };
</script>

<svelte:head>
	<title>Índice de ingredientes</title>
</svelte:head>

<h1>Índice de ingredientes</h1>
{#each data.ingredients as ingredientsByLetter}
	<div class="margin-bottom--lg">
		<h2>{ingredientsByLetter.letter}</h2>
		<hr size="1" />
		<ul>
			{#each ingredientsByLetter.ingredients as ingredient}
				<li class="margin-bottom--sm">
					<a href={`/recetas?ingredientes=${ingredient.name}`}
						>{capitalizeFirstLetter(ingredient.name)}</a
					>
				</li>
			{/each}
		</ul>
	</div>
{/each}

<style lang="scss">
	@import '../../sass/variables.scss';

	h2 {
		margin-bottom: 0;
	}

	ul {
		list-style: none;
		columns: 4;

		@media (max-width: $largeScreenBreakpoint) {
			columns: 5;
		}

		@media (max-width: $laptopBreakpoint) {
			columns: 3;
		}

		@media (max-width: $tabletBreakpoint) {
			columns: 2;
		}
	}
</style>
