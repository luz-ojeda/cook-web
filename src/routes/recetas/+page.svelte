<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import type { Recipe } from "$lib/types/Recipe";

	export let data: { recipes: Recipe[] };
</script>

<div class="flex spacing">
	<aside>
		<div class="flex-column">
			<label for="name">Nombre de la receta:</label>
			<input placeholder="guiso de lentejas..." type="text" id="name" name="name" />
		</div>
		<div class="flex-column">
			<label for="ingredients">Ingredientes:</label>
			<input placeholder="huevos, tomate, queso" type="text" id="ingredients" name="ingredients" />
		</div>
		<div>
			<div>Dificultad:</div>
			<div>
				<input type="checkbox" id="easy" name="easy" />
				<label for="easy">Fáciles</label>
			</div>

			<div>
				<input type="checkbox" id="medium" name="medium" />
				<label for="medium">Intermedias</label>
			</div>
			<div>
				<input type="checkbox" id="hard" name="hard" />
				<label for="hard">Difíciles</label>
			</div>
		</div>
	</aside>
	<!-- Recipe cards -->
	{#if data.recipes.length > 0}
		<div class="recipes-container flex-center">
			{#each data.recipes as { name, summary, pictures, }}
				<!-- href="/recetas/{name}" -->
				<RecipeCard recipeTitle={name} recipeSummary={summary} recipeImage={pictures[0]} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	aside {
		font-size: 18px;
		margin-right: 20px;
		min-width: 265px;

		> *:not(:last-child) {
		margin-bottom: 16px;
	}
	}

	.recipes-container {
		align-items: start;
		display: grid;
		column-gap: 32px;
		row-gap: 64px;
		grid-template-columns: repeat(3, 1fr);

		@media (max-width: 1200px) {
			column-gap: 64px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr 1fr;
		}

		@media (max-width: 720px) {
			display: block;
		}
	}
</style>
