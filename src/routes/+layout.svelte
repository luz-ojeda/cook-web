<script lang="ts">
	import { Footer, Navbar } from '$lib';
	import { onMount } from "svelte";
	import '../app.scss';
	import { savedRecipesIdsStore } from "../stores/savedRecipesStore";

	onMount(() => {
		let recipesSaved = localStorage.getItem('recipesSaved');
		if (recipesSaved) {
			let recipesSavedParsed = JSON.parse(recipesSaved);

			// Update recipes store with the recipes retrieved from local storage
			savedRecipesIdsStore.update((recipes) => recipesSavedParsed);
		}
	});
</script>

<Navbar />
<slot />
<Footer />
