<script>
	import { BurgerMenu, Icon } from '$lib';
	import logo from '$lib/assets/logo.png';
	import { burgerMenuStore } from '../../stores/burgerMenu';
	import NavLinks from './NavLinks.svelte';
</script>

<nav>
	<div class="main-nav flex-center">
		<a class="flex-center logo" href="/">
			<img alt="" src={logo} width="32" />
			COOK
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

	nav {
		@media (max-width: $mobileBreakpoint) {
			padding: 0px 16px;
		}

		@media (max-width: $tabletBreakpoint) {
			font-size: 20px;
			padding: 24px;
		}

		font-size: 24px;
		padding: 16px 160px;
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

	.logo {
		color: inherit;
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
