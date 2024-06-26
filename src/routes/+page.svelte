<script lang="ts">
	import { HomeSearch, RecipeCard } from '$lib';
	import type { PaginatedList } from '$lib/types/PaginatedList';
	import type { Recipe } from '$lib/types/Recipe';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data: PaginatedList<Recipe>;

	const heroAnimationSessionStorageKey = 'userSawHomeHeroAnimation';
	let heroTitle: string[] = [];
	const adjectives = ['sencillas', 'simples', 'sin vueltas.'];

	const userSawAnimation = browser ? sessionStorage.getItem(heroAnimationSessionStorageKey) : false;

	function animateHeroTitle() {
		const delay = 100;
		let totalDelay = 0;

		adjectives.forEach((adjective, index) => {
			for (let i = 0; i < adjective.length; i++) {
				setTimeout(() => (heroTitle = [...heroTitle, adjective[i]]), totalDelay + i * delay);
			}
			totalDelay += adjective.length * delay + 600;

			if (index !== adjectives.length - 1)
				setTimeout(() => {
					heroTitle.length = 0; // Clear the heroTitle array
				}, totalDelay);
		});

		sessionStorage.setItem(heroAnimationSessionStorageKey, 'true');
	}

	onMount(() => {
		if (!userSawAnimation) animateHeroTitle();
	});
</script>

<svelte:head>
	<title>Recetas Simples</title>
</svelte:head>

<!-- Hero -->
<section class="spacing hero flex-center">
	<div class="hero-title">
		<h1>
			{#if !userSawAnimation}
				Recetas
				{heroTitle.join('')}
			{:else}
				Recetas sin vueltas
			{/if}
		</h1>
		<p>
			Descubrí recetas auténticas y deliciosas, sin anuncios molestos. Tu experiencia culinaria
			merece ser ininterrumpida. Busca según ingredientes, dificultad y nombre:
		</p>
	</div>

	<div>
		<HomeSearch />
	</div>
</section>

<!-- Recipe cards -->
{#if data.data.length > 0}
	<section class="recipes-section spacing background curved">
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
		<a class="see-more" href="/recetas">Ver más recetas</a>
	</section>
{/if}

<style lang="scss">
	@import '../sass/variables.scss';
	@import '../sass/colors.scss';

	.background {
		background-color: $grey200;
	}

	.recipes-section {
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-size: 3rem;

		@media (max-width: $tabletBreakpoint) {
			font-size: 1.5rem;
		}
	}

	.hero {
		@media (max-width: $tabletBreakpoint) {
			flex-direction: column;
			text-align: center;
		}

		p {
			font-size: 1.125rem;

			@media (max-width: $tabletBreakpoint) {
				font-size: 1rem;
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

	.hero-title {
		@media (max-width: $tabletBreakpoint) {
			margin-bottom: 16px;
		}
	}

	.see-more {
		font-size: 1.5rem;
		font-weight: bold;
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

	.curved {
		position: relative;
	}

	.curved::before {
		background: $grey200;
		border-top-left-radius: 50% 100%;
		border-top-right-radius: 50% 100%;
		content: '';
		left: 0;
		position: absolute;
		top: -15%;
		width: 100%;
		height: 15%;
		z-index: -1;
	}
</style>
