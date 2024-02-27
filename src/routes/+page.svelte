<script>
	import Footer from "$lib/components/Footer.svelte";
	import HomeSearch from '$lib/components/HomeSearch.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
</script>

<!-- Hero -->
<div class="spacing hero flex-center">
	<div>
		<h1>Recetas simples sin publicidades</h1>
		<p>
			Descubrí recetas auténticas y deliciosas, sin anuncios molestos. Tu experiencia culinaria
			merece ser ininterrumpida. Busca según ingredientes, dificultad y nombre:
		</p>
	</div>

	<!-- Buscador -->
	<div>
		<HomeSearch />
	</div>
</div>

<!-- Recipe cards -->
<div class="background">
	<div class="recipes-container spacing flex-center">
		<RecipeCard
			recipeTitle="Receta #1"
			recipeSummary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat euismod turpis, at fringilla sem mollis et. In et tortor quis libero porta fermentum. "
			recipeImage="https://cookapistorage.blob.core.windows.net/recipes/f6f3e96b-8583-4cda-8fc6-9f260fb6bc09/image1.jpg?sp=r&st=2024-02-25T22:02:43Z&se=2024-03-25T06:02:43Z&spr=https&sv=2022-11-02&sr=c&sig=Bh0Eyyf%2Bgxjs%2B8gMTaU6g39PxL3z4y1kUtvbZ93cNfQ%3D"
		/>
        <RecipeCard
			recipeTitle="Receta con un nombre muy largo"
			recipeSummary="Lorem ipsum dolor sit amet"
			recipeImage="https://cookapistorage.blob.core.windows.net/recipes/AMAZING-Chana-Masala-made-in-1-Pot-So-healthy-flavorful-and-delicious-vegan-glutenfree-chanamasala-recipe-minimalistbaker.jpg?sp=r&st=2024-02-25T22:02:43Z&se=2024-03-25T06:02:43Z&spr=https&sv=2022-11-02&sr=c&sig=Bh0Eyyf%2Bgxjs%2B8gMTaU6g39PxL3z4y1kUtvbZ93cNfQ%3D"
		/>
        <RecipeCard
			recipeTitle="Receta #3"
			recipeSummary="Lorem ipsum dolor sit amet"
			recipeImage="https://cookapistorage.blob.core.windows.net/recipes/Apple-Pie-Recipe-Video.jpg?sp=r&st=2024-02-25T22:02:43Z&se=2024-03-25T06:02:43Z&spr=https&sv=2022-11-02&sr=c&sig=Bh0Eyyf%2Bgxjs%2B8gMTaU6g39PxL3z4y1kUtvbZ93cNfQ%3D"
		/>
        <RecipeCard
			recipeTitle="Receta #4"
			recipeSummary="Lorem ipsum dolor sit amet"
			recipeImage="https://cookapistorage.blob.core.windows.net/recipes/maxresdefault.jpg?sp=r&st=2024-02-25T22:02:43Z&se=2024-03-25T06:02:43Z&spr=https&sv=2022-11-02&sr=c&sig=Bh0Eyyf%2Bgxjs%2B8gMTaU6g39PxL3z4y1kUtvbZ93cNfQ%3D"
		/>
	</div>
</div>

<Footer />

<style lang="scss">
	.hero {
		@media (max-width: 1200px) {
			flex-direction: column;
			padding-bottom: 32px;
			text-align: center;
		}
	}

	.hero > div {
		flex-basis: 100%;
	}

	.hero div:first-of-type {
		@media (min-width: 720px) {
			margin-right: 48px;
		}
	}

	.background {
		background-color: lightgray;
	}

	.recipes-container {
		align-items: start;
		display: grid;
		column-gap: 32px;
		grid-template-columns: repeat(4, 1fr);
        
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
