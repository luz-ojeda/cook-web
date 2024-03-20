<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import placeholder from '$lib/assets/recipe_image_placeholder.png';
	import { PUBLIC_AZURE_STORAGE_SAS_TOKEN } from '$env/static/public';
	import {
		Axe,
		Broccoli,
		Clock,
		Dish,
		DownloadRecipeButton,
		Fire,
		Fridge,
		SaveRecipeButton,
		Stove,
		capitalizeFirstLetter
	} from '$lib';
	import CopyRecipeButton from '$lib/components/CopyRecipeButton.svelte';
	import { mapRecipeDifficulty } from '$lib/scripts/strings';

	export let data: { recipe: Recipe };
</script>

<svelte:head>
	<title>{data.recipe?.name}</title>
	<!-- <meta name="description" content="{metaDescription}"> -->
	<!-- Other meta tags can be included here -->
</svelte:head>

<div class="spacing">
	<div class="title-image-container flex">
		<img
			class="rounded-img recipe-image"
			src={data.recipe?.pictures[0]
				? `${data.recipe?.pictures[0]}?${PUBLIC_AZURE_STORAGE_SAS_TOKEN}`
				: placeholder}
			alt=""
		/>
		<div>
			<h1>{data.recipe?.name}</h1>
			<div class="recipe-summary">
				{#if data.recipe?.preparationTime}
					<div class="flex-center">
						<img class="icon" alt="" src={Clock} />
						<span>Tiempo de preparación:&nbsp </span>
						<p>{data.recipe?.preparationTime} minutos</p>
					</div>
				{/if}

				{#if data.recipe?.cookingTime}
					<div class="flex-center">
						<img class="icon" alt="" src={Stove} />
						<span>Tiempo de cocina:&nbsp</span>
						<p>{data.recipe?.cookingTime} minutos</p>
					</div>
				{/if}

				{#if data.recipe?.difficulty}
					<div class="flex-center">
						<img class="icon" alt="" src={Fire} />
						<span>Dificultad:&nbsp</span>
						<p>{mapRecipeDifficulty(data.recipe?.difficulty)}</p>
					</div>
				{/if}

				{#if data.recipe?.vegetarian}
					<div class="flex-center">
						<img class="icon" alt="" src={Broccoli} />
						<span>Vegetariana</span>
					</div>
				{/if}

				<!-- TODO: Implement recipe adjustment according to servings. Must have a stateful copy of the recipe and pass it to CopyRecipeButton as well -->
				{#if data.recipe?.servings}
					<div class="flex-center">
						<img class="icon" alt="" src={Dish} />
						<span>Porciones: {data.recipe?.servings}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="actions">
		<!-- TODO: Handle copy for firefox for Android where clipboard API is not supported -->
		<div>
			<CopyRecipeButton recipe={data.recipe} />
		</div>
		<div>
			<SaveRecipeButton label recipeId={data.recipe?.id} --fontSize="18px" --iconWidth="18px" />
		</div>
		<div>
			<DownloadRecipeButton recipe={data.recipe} />
		</div>
	</div>

	<div class="ingredients">
		<div class="flex-center">
			<img class="icon" alt="" src={Fridge} />
			<h2>Ingredientes:</h2>
		</div>
		<ul>
			{#each data.recipe?.ingredients as ingredient}
				<li>{capitalizeFirstLetter(ingredient)}</li>
			{/each}
		</ul>
	</div>

	<div>
		<div class="flex-center">
			<img class="icon" alt="" src={Axe} />
			<h2>Instrucciones:</h2>
		</div>
		<p>{data.recipe?.instructions}</p>
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
		width: 65%;
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
	}

	.ingredients {
		margin-bottom: 12px;
	}
</style>
