<script lang="ts">
	import { onMount } from 'svelte';
	import { Footer, Navbar } from '$lib';
	import '../app.scss';
	import { savedIds } from '../stores/savedRecipesStore';

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
	});
</script>

<header>
	<Navbar />
</header>
<slot />
<Footer />
