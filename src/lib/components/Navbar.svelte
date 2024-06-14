<script>
	import { BurgerMenu, Icon } from '$lib';
	import isotipo from '$lib/assets/isotipo.svg';
	import { burgerMenuStore } from '../../stores/burgerMenu';
	import NavLinks from './NavLinks.svelte';
</script>

<nav>
	<div class="main-nav flex-center">
		<a class="flex-center logotipo" href="/">
			<img alt="" src={isotipo} width="48" />
			RECETAS SIMPLES
		</a>
		<div class="nav-links flex-center">
			<div class="nav-links-tablet-desktop">
				<NavLinks />
			</div>
			<button class="burger-button" on:click={() => ($burgerMenuStore = !$burgerMenuStore)}>
				{#if !$burgerMenuStore}
					<Icon name="burger" height="48" width="48" />
				{:else}
					<Icon name="cross" height="32" width="32" />
				{/if}
			</button>
		</div>
	</div>

	{#if $burgerMenuStore}
		<BurgerMenu />
	{/if}
</nav>

<style lang="scss">
	@import '../../sass/variables.scss';
	@import '../../sass/colors.scss';

	nav {
		padding: 0 16px;

		@media (min-width: $tabletBreakpoint) and (max-width: $laptopBreakpoint) {
			padding: 12px 80px;
		}

		@media (min-width: $laptopBreakpoint) {
			padding: 12px 160px;
		}

		@media (max-width: $tabletBreakpoint) {
			max-height: 100vh;
			overflow-y: auto;
		}

		font-size: 1.5rem;
	}

	.burger-button {
		align-items: center;
		background: none;
		display: flex;
		height: 48px;
		justify-content: center;
		width: 48px;

		@media (min-width: $tabletBreakpoint) {
			display: none;
		}
	}

	.main-nav {
		height: 80px;
		justify-content: space-between;
	}

	.logotipo {
		color: $primary700;
		text-decoration: none;
		font-weight: bold;

		img {
			margin-right: 12px;
		}
	}

	.nav-links-tablet-desktop {
		@media (max-width: $tabletBreakpoint) {
			display: none;
		}
	}
</style>
