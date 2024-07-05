<script lang="ts">
	import { Button, HomeSearch, RecipeCard } from '$lib';
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
			// replace each letter of the title with a greater delay than the last letter
			for (let i = 0; i < adjective.length; i++) {
				setTimeout(() => (heroTitle = [...heroTitle, adjective[i]]), totalDelay + i * delay);
			}
			totalDelay += adjective.length * delay + 600;

			// clear the heroTitle array after each adjective except the last
			// this leaves 'Recetas sin vueltas' as the last title
			if (index !== adjectives.length - 1)
				setTimeout(() => {
					heroTitle.length = 0;
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
<section class="hero flex-center">
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
	<section class="recipes-section curved">
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
		<a href="/recetas">
			<Button buttonType="tertiary" tabIndex={-1}>Ver más recetas</Button>
		</a>
		<div class="background"></div>
	</section>
{/if}

<style lang="scss">
	@import '../sass/variables.scss';

	.hero {
		margin-bottom: var(--space-lg);

		@media (max-width: $tabletBreakpoint) {
			flex-direction: column;
			text-align: center;
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
		position: relative;
	}

	.background {
		background-color: var(--body-bg-accent);
		height: 120%;
		width: 100vw;
		position: absolute;
		z-index: -1;
	}

	.background::before {
		background-color: var(--body-bg-accent);
		border-top-left-radius: 50% 100%;
		border-top-right-radius: 50% 100%;
		content: '';
		left: 0;
		position: absolute;
		transform: translateY(-70px);
		width: 100vw;
		height: 15%;
		z-index: -1;

		@media (max-width: $tabletBreakpoint) {
			display: none;
		}
	}

	.recipes-container-home {
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-template-rows: auto;
		grid-auto-rows: 0;
		padding: var(--component-padding) 0;

		@media (max-width: $tabletBreakpoint) {
			grid-auto-rows: auto;
		}

		@media (max-width: $tabletBreakpoint) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
