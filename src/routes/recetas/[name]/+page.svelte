<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import placeholder from '$lib/assets/recipe_image_placeholder.png';
	import { PUBLIC_AZURE_STORAGE_SAS_TOKEN } from '$env/static/public';
	import {
		Axe,
		Broccoli,
		Clock,
		CopyRecipeButton,
		Dish,
		DownloadRecipeButton,
		Fire,
		Fridge,
		SaveRecipeButton,
		Stove,
		capitalizeFirstLetter,
		mapRecipeDifficulty,
		scaleServings
	} from '$lib';

	export let data: Recipe;

	let ingredients: string[];
	let servings = data.servings;

	$: {
		ingredients = data.ingredients;
	}

	$: {
		if (servings && data.servings) {
			ingredients = scaleServings(data.ingredients, servings, data.servings);
		}
	}
</script>

<svelte:head>
	<title>{data.name}</title>
	<!-- <meta name="description" content="{metaDescription}"> -->
</svelte:head>

<div class="spacing">
	<div class="title-image-container flex">
		<img
			class="rounded-img recipe-image"
			src={data.pictures[0] ? `${data.pictures[0]}?${PUBLIC_AZURE_STORAGE_SAS_TOKEN}` : placeholder}
			alt=""
		/>
		<div>
			<h1>{data.name}</h1>
			<div class="recipe-summary">
				{#if data.preparationTime}
					<div class="flex-center">
						<img class="icon" alt="" src={Clock} />
						<span>Tiempo de preparación:&nbsp </span>
						<p><span class="bold">{data.preparationTime}</span> minutos</p>
					</div>
				{/if}

				{#if data.cookingTime}
					<div class="flex-center">
						<img class="icon" alt="" src={Stove} />
						<span>Tiempo de cocina:&nbsp</span>
						<p><span class="bold">{data.cookingTime}</span> minutos</p>
					</div>
				{/if}

				{#if data.difficulty}
					<div class="flex-center">
						<img class="icon" alt="" src={Fire} />
						<span>Dificultad:&nbsp</span>
						<p>{mapRecipeDifficulty(data.difficulty)}</p>
					</div>
				{/if}

				{#if data.vegetarian}
					<div class="flex-center">
						<img class="icon" alt="" src={Broccoli} />
						<span>Vegetariana</span>
					</div>
				{/if}

				{#if data.servings}
					<div class="flex-center">
						<img class="icon" alt="" src={Dish} />
						<span>
							<label for="servings">Porciones:</label>
							<input
								id="servings"
								min="1"
								class="servings-input"
								type="number"
								bind:value={servings}
							/>
						</span>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="actions">
		<!-- TODO: Handle copy for firefox for Android where clipboard API is not supported -->
		<div>
			<CopyRecipeButton recipe={{ ...data, ingredients, servings }} />
		</div>
		<div>
			<SaveRecipeButton
				label
				recipeId={data.id}
				--fontSize="18px"
				--iconWidth="18px"
				--iconMobileWidth="20px"
			/>
		</div>
		<div>
			<DownloadRecipeButton recipe={{ ...data, ingredients, servings }} />
		</div>
	</div>

	<div class="ingredients">
		<div class="flex-center">
			<img class="icon" alt="" src={Fridge} />
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
			<img class="icon" alt="" src={Axe} />
			<h2>Instrucciones:</h2>
		</div>
		<p class="instructions-paragraph">{data.instructions}</p>
	</div>

	<!-- TODO: Display all images in gallery -->
</div>

<style lang="scss">
	@import '../../../sass/variables.scss';

	h1 {
		font-size: 48px;
		margin-bottom: 16px;
		margin-top: 0;

		@media (max-width: $tabletBreakpoint) {
			font-size: 32px;
		}
	}

	h2 {
		margin: 0;
	}

	.recipe-image {
		max-height: 374px;
		margin-right: 20px;
		object-fit: cover;
		min-width: 65%;

		@media (max-width: $tabletBreakpoint) {
			margin-bottom: 16px;
			margin-right: 0;
			max-height: 150px;
			width: 100%;
		}

		@media (max-width: $laptopBreakpoint) {
			min-width: 50%;
		}
	}

	.icon {
		margin-right: 6px;
		width: 18px;
	}

	.title-image-container {
		margin-bottom: 16px;

		@media (max-width: $tabletBreakpoint) {
			flex-direction: column;
		}
	}

	.recipe-summary {
		font-size: 18px;

		div:not(:last-of-type) {
			margin-bottom: 12px;
		}

		p {
			margin: 0;
		}
	}

	.actions {
		display: flex;
		margin-bottom: 12px;

		div {
			margin-right: 16px;
		}

		@media (max-width: $tabletBreakpoint) {
			margin: 16px 0;
			justify-content: space-between;
		}
	}

	.ingredients {
		margin-bottom: 12px;
	}

	.servings-input {
		padding: 6px;
		width: 38px;
	}

	.instructions-paragraph {
		max-width: 34em;

		@media (max-width: $tabletBreakpoint) {
			max-width: none;
		}
	}

	.bold {
		font-weight: bold;
	}
</style>
