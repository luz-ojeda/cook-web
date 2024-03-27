<script>
	import { page } from '$app/stores';
	import RecipesAside from './RecipesSearchForm.svelte';
</script>

<div>
	{#if $page.url.pathname === '/recetas'}
		<RecipesAside />
	{/if}
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	div {
		@media (min-width: $tabletBreakpoint) {
			display: none;
		}
	}
</style>
