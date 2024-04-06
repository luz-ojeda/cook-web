<script lang="ts">
	import { HomeSearch, RecipeCard } from '$lib';
	import type { PaginatedList } from '$lib/types/PaginatedList';
	import type { Recipe } from '$lib/types/Recipe';

	export let data: PaginatedList<Recipe>;
</script>

<svelte:head>
	<title>Cook</title>
</svelte:head>

<!-- Hero -->
<div class="spacing hero flex-center">
	<div>
		<h1>Recetas simples</h1>
		<p>
			Descubrí recetas auténticas y deliciosas, sin anuncios molestos. Tu experiencia culinaria
			merece ser ininterrumpida. Busca según ingredientes, dificultad y nombre:
		</p>
	</div>

	<div>
		<HomeSearch />
	</div>
</div>

<!-- Recipe cards -->
{#if data.data.length > 0}
	<div class="recipes-section spacing background">
		<div class="recipes-container recipes-container-home">
			{#each data.data as { id, name, summary, pictures }}
				<RecipeCard
					recipeId={id}
					recipeTitle={name}
					recipeSummary={summary}
					recipeImage={pictures[0]}
				/>
			{/each}
		</div>
		<a href="/recetas">Ver más recetas</a>
	</div>
{/if}

<style lang="scss">
	@import '../sass/variables.scss';
	@import '../sass/colors.scss';

	.background {
		background-color: $grey200;
	}

	h1 {
		font-size: 48px;

		@media (max-width: $tabletBreakpoint) {
			font-size: 32px;
		}
	}

	.hero {
		@media (max-width: $tabletBreakpoint) {
			flex-direction: column;
			text-align: center;
		}

		p {
			font-size: 18px;

			@media (max-width: $tabletBreakpoint) {
				font-size: 16px;
			}
		}
	}

	.hero > div:first-of-type {
		flex-basis: 100%;
	}

	.hero div:nth-of-type(2) {
		flex-basis: 65%;
	}

	.hero div:first-of-type {
		@media (min-width: 720px) {
			margin-right: 48px;
		}
	}

	.recipes-section {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-bottom: 48px;
		padding-top: 48px;

		@media (max-width: $laptopBreakpoint) {
			padding-top: 24px;
		}

		a {
			font-size: 24px;
			font-weight: bold;
		}
	}

	.recipes-container-home {
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-template-rows: auto;
		grid-auto-rows: 0;

		@media (max-width: $tabletBreakpoint) {
			grid-auto-rows: auto;
		}

		@media (max-width: $tabletBreakpoint) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
