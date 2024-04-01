<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Footer, Navbar } from '$lib';
	import '../app.scss';
	import { savedIds } from '../stores/savedRecipesStore';
	import { browser } from "$app/environment";
	
	let scrolled = false;

	const handleScroll = () => {
		scrolled = window.scrollY > 0;
	};

	onMount(() => {
		let recipesSaved = localStorage.getItem('recipesSaved');
		let recipesIdsSavedParsed: string[] = [];
		if (recipesSaved) {
			recipesIdsSavedParsed = JSON.parse(recipesSaved);
		}

		// Update recipes store with the recipes retrieved from local storage
		savedIds.update(() => {
			return {
				loadingIdsFromLocalStorage: false,
				ids: recipesIdsSavedParsed
			};
		});

		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<header class="header {scrolled ? 'shadow' : ''}">
	<Navbar />
</header>
<slot />
<Footer />

<style lang="scss">
	@import "../sass/variables.scss";

	.header {
	  transition: box-shadow 0.3s ease;
	}
  
	.shadow {
	  box-shadow: $smallShadow;
	}
  </style>