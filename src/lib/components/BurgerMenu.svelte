<script>
	import { page } from '$app/stores';
	import NavLinks from './NavLinks.svelte';
	import RecipesSearchForm from './RecipesSearchForm.svelte';
</script>

<div class="container">
	<div class="nav-links">
		<NavLinks />
	</div>
	{#if $page.url.pathname === '/recetas'}
		<hr class="w-100" />
		<RecipesSearchForm />
	{/if}
</div>

<style lang="scss">
	hr {
		color: var(--grey100);
	}

	.container {
		padding-bottom: 24px;
	}
</style>
