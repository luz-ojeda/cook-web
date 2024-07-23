<script>
	import { page } from '$app/stores';
</script>

<div class="flex-center nav-links text--md">
	<a class="text-color nav-link" href="/recetas" aria-current={$page.url.pathname === '/recetas'}
		>Recetas</a
	>
	<span class="separator">|</span>
	<a
		class="text-color nav-link"
		href="/crear-receta"
		aria-current={$page.url.pathname === '/crear-receta'}>Crear</a
	>
	<span class="separator">|</span>
	<a
		class="text-color nav-link"
		href="/recetas-guardadas"
		aria-current={$page.url.pathname === '/recetas-guardadas'}>Recetas guardadas</a
	>
	<span class="separator">|</span>
	<a
		class="text-color nav-link"
		href="/ingredientes"
		aria-current={$page.url.pathname === '/ingredientes'}>Ingredientes</a
	>
	{#if $page.data.session}
		<span class="separator">|</span>
		<a class="text-color nav-link" href="/cerrar-sesion" data-sveltekit-preload-data="off"
			>Cerrar sesión
		</a>
	{:else}
		<span class="separator">|</span>
		<a class="text-color nav-link" href="/iniciar-sesion">Iniciar sesión </a>
	{/if}
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.nav-links {
		display: flex;
		margin-right: var(--space-sm);

		@media (max-width: $tabletBreakpoint) {
			align-items: center;
			margin: 0;
			flex-direction: column;
		}
	}

	.nav-links a:not(:last-child) {
		@media (max-width: $tabletBreakpoint) {
			margin-right: 0;
			margin-bottom: var(--space-lg);
		}
	}

	.nav-link {
		@media (max-width: $laptopBreakpoint) {
			font-size: var(--text-sm);
		}
		&[aria-current='true'] {
			color: var(--btn-primary-active);
			text-decoration: underline;
		}
	}

	.separator {
		margin: 0 var(--space-xs);

		@media (max-width: $tabletBreakpoint) {
			display: none;
		}
	}
</style>
