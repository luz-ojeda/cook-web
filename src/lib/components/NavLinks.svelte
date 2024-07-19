<script>
	import { page } from '$app/stores';
	import GoogleSignInButton from './GoogleSignInButton.svelte';
</script>

<div class="flex-center nav-links text--md">
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
	{#if $page.data.session}
		<a
			class="non-text-anchor-element nav-link"
			href="/auth/signout"
			data-sveltekit-preload-data="off"
			>Cerrar sesión
		</a>
	{:else}
		<a class="non-text-anchor-element nav-link" href="/iniciar-sesion">Iniciar sesión </a>
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
		margin-right: var(--space-sm);

		@media (max-width: $tabletBreakpoint) {
			margin-right: 0;
			margin-bottom: var(--space-lg);
		}
	}

	.nav-link {
		&[aria-current='true'] {
			color: var(--btn-primary-active);
			text-decoration: underline;
		}
	}
</style>
