<script>
	import { Burger, Cross } from '$lib';
	import logo from '$lib/assets/logo.png';
	import { burgerMenuStore } from '../../stores/burgerMenu';
	import BurgerMenu from './BurgerMenu.svelte';
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
				<img src={!$burgerMenuStore ? Burger : Cross} alt="" />
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
		font-size: 24px;
		padding: 16px 160px;

		@media (max-width: $tabletBreakpoint) {
			font-size: 20px;
			padding: 24px;
		}

		@media (max-width: $mobileBreakpoint) {
			font-size: 8 32px;
		}
	}

	.burger-button {
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;

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
		margin-right: 16px;

		@media (max-width: $tabletBreakpoint) {
			display: none;
		}
	}
</style>
