<script>
	import { Burger, Cross } from '$lib';
	import logo from '$lib/assets/logo.png';
	import { page } from '$app/stores';
	import { burgerMenuStore } from '../../stores/burgerMenu';
	import BurgerMenu from "./BurgerMenu.svelte";
</script>

<nav class="spacing">
	<div class="main-nav flex-center">
		<a class="flex-center logo" href="/">
			<img alt="" src={logo} width="32" />
			COOK
		</a>
		<div class="nav-links flex-center">
			<div class="nav-links-tablet-desktop">
				<a href="/recetas" aria-current={$page.url.pathname === '/recetas'}>Recetas</a>
				<a href="/recetas-guardadas" aria-current={$page.url.pathname === '/recetas-guardadas'}
					>Recetas guardadas</a
				>
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

		@media (max-width: $tabletBreakpoint) {
			font-size: 20px;
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

		img {
			margin-right: 12px;
		}
	}

	.nav-links a {
		text-decoration: none;

		&[aria-current='true'] {
			text-decoration: underline;
		}
	}

	.nav-links a:not(:last-child) {
		margin-right: 16px;
	}

	.nav-links-tablet-desktop {
		margin-right: 16px;

		@media (max-width: $mobileBreakpoint) {
			display: none;
		}
	}
</style>
