<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import placeholder from '$lib/assets/recipe_image_placeholder.svg';
	import {
		CopyRecipeButton,
		DownloadRecipeButton,
		SaveRecipeButton,
		capitalizeFirstLetter,
		mapRecipeDifficulty,
		scaleIngredients,
		Icon,
		RecipeImage
	} from '$lib';

	export let data: Recipe;
	let ingredients: string[];
	let servings = data.servings;

	function onServingsInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (data.servings) {
			const { value } = e.target as HTMLInputElement;
			const numberValue = Number(value);
			if (numberValue === data.servings) {
				ingredients = data.ingredients;
			} else {
				ingredients = [...scaleIngredients(data.ingredients, numberValue, data.servings)];
			}
		}
	}

	$: {
		ingredients = data.ingredients;
	}
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<div class="recipe-container spacing">
	<div class="recipe-first-content">
		<div class="recipe-image-container">
			<!-- <img
				alt={`Photo of the recipe ${data.name}`}
				class="rounded-img recipe-image {data.pictures[0] ? 'object-fit-cover' : ''}"
				crossorigin="anonymous"
				src={data.pictures[0] ? data.pictures[0] : placeholder}
			/> -->
			<RecipeImage recipeImage={data.pictures[0]} recipeTitle={data.name} />
		</div>
		<div>
			<h1>{data.name}</h1>
			<div class="recipe-summary">
				{#if data.preparationTime}
					<div class="flex-center">
						<Icon class="icon-margin-right" name="clock" width="24" height="24" />
						<span class="laptop">Tiempo de preparación:&nbsp</span>
						<span class="mobile">Preparación:&nbsp</span>
						<p><span class="bold">{data.preparationTime}</span> minutos</p>
					</div>
				{/if}

				{#if data.cookingTime}
					<div class="flex-center">
						<Icon class="icon-margin-right" name="stove" width="24" height="24" />
						<span class="laptop">Tiempo de cocina:&nbsp</span>
						<span class="mobile">Cocina:&nbsp</span>
						<p><span class="bold">{data.cookingTime}</span> minutos</p>
					</div>
				{/if}

				{#if data.difficulty}
					<div class="flex-center">
						<Icon class="icon-margin-right" name="fire" width="24" height="24" />
						<span>Dificultad:&nbsp</span>
						<p>{mapRecipeDifficulty(data.difficulty)}</p>
					</div>
				{/if}

				{#if data.vegetarian}
					<div class="flex-center">
						<Icon class="icon-margin-right" name="broccoli" width="24" height="24" />
						<span>Vegetariana</span>
					</div>
				{/if}

				{#if data.servings}
					<div class="flex-center">
						<Icon class="icon-margin-right" name="dish" width="24" height="24" />
						<span>
							<label for="servings">Porciones:</label>
							<input
								id="servings"
								min="1"
								on:input={onServingsInput}
								type="number"
								bind:value={servings}
							/>
						</span>
					</div>
				{/if}
			</div>
		</div>

		<div class="actions">
			<!-- TODO: Handle copy for firefox for Android where clipboard API is not supported -->
			<div>
				<CopyRecipeButton recipe={{ ...data, ingredients, servings }} />
			</div>
			<div>
				<SaveRecipeButton label iconWidth="18" recipeId={data.id} />
			</div>
			<div>
				<DownloadRecipeButton recipe={{ ...data, ingredients, servings }} />
			</div>
		</div>
	</div>
	<div>
		<div class="ingredients">
			<div class="flex-center">
				<Icon class="icon-margin-right" name="fridge" width="24" height="24" />
				<h2>Ingredientes:</h2>
			</div>
			<ul>
				{#each ingredients as ingredient}
					<li>{capitalizeFirstLetter(ingredient)}</li>
				{/each}
			</ul>
		</div>

		<div>
			<div class="flex-center">
				<Icon class="icon-margin-right" name="axe" width="24" height="24" />
				<h2>Instrucciones:</h2>
			</div>
			<p class="instructions-paragraph">{data.instructions}</p>
		</div>
	</div>

	<!-- TODO: Display all images in gallery -->
</div>

<style lang="scss">
	@import '../../../sass/variables.scss';

	h1 {
		margin-bottom: 16px;
		margin-top: 0;
	}

	h2 {
		margin: 0;
	}

	.recipe-container {
		display: flex;

		@media (max-width: $tabletBreakpoint) {
			display: block;
		}
	}

	.recipe-first-content {
		height: fit-content;
		margin-right: 24px;
		position: sticky;
		top: 120px;
		width: 50%;

		@media (max-width: $tabletBreakpoint) {
			margin-right: 0;
			position: static;
			top: 0;
			width: auto;
		}
	}

	.recipe-image-container {
		margin-bottom: 16px;
		margin-right: 20px;
		height: 375px;

		@media (max-width: $tabletBreakpoint) {
			margin-right: 0;
			height: 150px;
		}

		@media (max-width: $laptopBreakpoint) {
			min-width: 50%;
		}
	}

	.recipe-summary {
		margin-bottom: 16px;

		div:not(:last-of-type) {
			margin-bottom: 12px;
		}

		p {
			margin: 0;
		}

		@media (max-width: $tabletBreakpoint) {
			margin-bottom: 0;
		}
	}

	.actions {
		display: flex;
		margin-bottom: 12px;

		div:not(:last-child) {
			margin-right: 16px;
		}

		@media (max-width: $tabletBreakpoint) {
			margin: 16px 0;
			justify-content: space-evenly;

			div:not(:last-child) {
				margin-right: 8px;
			}
		}

		@media (max-width: $mobileBreakpoint) {
			flex-wrap: wrap;
		}
	}

	.ingredients {
		margin-bottom: 12px;
	}

	.instructions-paragraph {
		max-width: 34em;
		white-space: pre-line;

		@media (max-width: $tabletBreakpoint) {
			max-width: none;
		}
	}

	.bold {
		font-weight: bold;
	}

	* :global(.icon-margin-right) {
		margin-right: 6px;
	}
</style>
