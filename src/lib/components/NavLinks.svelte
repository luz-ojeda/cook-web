<script>
	import { page } from '$app/stores';
</script>

<div class="nav-links">
	<a
		class="non-text-anchor-element nav-link"
		href="/recetas"
		aria-current={$page.url.pathname === '/recetas'}>Recetas</a
	>
	<a
		class="non-text-anchor-element nav-link"
		href="/recetas-guardadas"
		aria-current={$page.url.pathname === '/recetas-guardadas'}>Recetas guardadas</a
	>
	<a
		class="non-text-anchor-element nav-link"
		href="/ingredientes"
		aria-current={$page.url.pathname === '/ingredientes'}>Ingredientes</a
	>
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.nav-links {
		@media (max-width: $tabletBreakpoint) {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.nav-links a:not(:last-child) {
		margin-right: 16px;

		@media (max-width: $tabletBreakpoint) {
			margin-right: 0;
			margin-bottom: 24px;
		}
	}

	.nav-link {
		&[aria-current='true'] {
			color: var(--btn-primary-active);
			text-decoration: underline;
		}
	}
</style>
