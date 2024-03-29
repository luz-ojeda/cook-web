<script>
	import { page } from '$app/stores';
</script>

<div class="nav-links">
	<a href="/recetas" aria-current={$page.url.pathname === '/recetas'}>Recetas</a>
	<a href="/recetas-guardadas" aria-current={$page.url.pathname === '/recetas-guardadas'}
		>Recetas guardadas</a
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
	.nav-links a {
		text-decoration: none;

		&:visited {
			color: inherit;
		}

		&[aria-current='true'] {
			text-decoration: underline;
		}
	}

	.nav-links a:not(:last-child) {
		margin-right: 16px;

		@media (max-width: $tabletBreakpoint) {
			margin-right: 0;
			margin-bottom: 24px;
		}
	}
</style>
