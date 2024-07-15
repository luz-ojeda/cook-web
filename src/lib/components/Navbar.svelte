<script>
	import { BurgerMenu, Icon } from '$lib';
	import isotipo from '$lib/assets/isotipo.svg';
	import { burgerMenuStore } from '../../stores/burgerMenu';
	import NavLinks from './NavLinks.svelte';
	import ThemeIcon from './ThemeIcon.svelte';
</script>

<nav>
	<div class="main-nav flex-center">
		<a class="flex-center logotipo" href="/">
			<img alt="" src={isotipo} width="48" />
			<h3>RECETAS SIMPLES</h3>
		</a>
		<div class="flex-center">
			<div class="laptop-desktop">
				<NavLinks />
			</div>
			<button class="burger-button" on:click={() => ($burgerMenuStore = !$burgerMenuStore)}>
				{#if !$burgerMenuStore}
					<Icon name="burger" height="48" width="48" />
				{:else}
					<Icon name="cross" height="32" width="32" />
				{/if}
			</button>
			<ThemeIcon />
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
		@media (max-width: $tabletBreakpoint) {
			max-height: 100vh;
			overflow-y: auto;
		}
	}

	.main-nav {
		height: 80px;
		justify-content: space-between;
	}

	.logotipo {
		color: var(--logotipo);
		text-decoration: none;
		font-weight: bold;

		img {
			margin-right: 12px;
		}

		h3 {
			margin: 0;
		}
	}

	.burger-button {
		align-items: center;
		background: none;
		color: var(--text);
		display: flex;
		height: 48px;
		justify-content: center;
		width: 48px;

		@media (min-width: $tabletBreakpoint) {
			display: none;
		}
	}
</style>
