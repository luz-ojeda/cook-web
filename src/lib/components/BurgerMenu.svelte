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
	@import '../../sass/variables.scss';

	hr {
		@media (min-width: $tabletBreakpoint) {
			display: none;
		}
	}

	div {
		@media (min-width: $tabletBreakpoint) {
			display: none;
		}
	}

	.nav-links {
		@media (min-width: $tabletBreakpoint) {
			display: none;
		}
	}

	.container {
		padding-bottom: 24px;
	}
</style>
