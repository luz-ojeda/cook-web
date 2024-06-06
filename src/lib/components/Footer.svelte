<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { GitHubMark, Icon } from '$lib';
	import isotipo from '$lib/assets/isotipo.svg';

	let name = '';
</script>

<footer class="container">
	<div class="section">
		<h3 class="logotipo"><img alt="" src={isotipo} width="32" />Recetas Simples</h3>
		<div class="search-input-wrapper">
			<div class="icon">
				<Icon name="search" height="28" width="28" />
			</div>
			<form on:submit={() => (window.location.href = `/recetas?nombre=${name}`)}>
				<input bind:value={name} placeholder="Buscar" type="search" />
			</form>
		</div>
	</div>
	<div class="section">
		<h3>EXPLORAR</h3>
		<ul>
			<li>
				<a class="non-text-anchor-element" href="/">Inicio</a>
			</li>
			<li>
				<a
					class="non-text-anchor-element"
					href="/sobre-recetas-simples"
					aria-current={$page.url.pathname === '/sobre-recetas-simples'}>Sobre Recetas Simples</a
				>
			</li>
			{#if $page.url.pathname != '/recetas'}
				<li>
					<a class="non-text-anchor-element" href="/recetas"> Buscar recetas </a>
				</li>
			{/if}
		</ul>
	</div>
	<div class="section">
		<h3>CONTACTO</h3>
		<ul>
			<li>
				<Icon class="icon-margin-right" name="location" width="24" height="24" />
				<span class="laptop">Ciudad Autónoma de Buenos Aires, Argentina</span>
				<span class="mobile">CABA, Argentina</span>
			</li>
			<li>
				<Icon class="icon-margin-right" name="mail" width="24" height="24" />
				recetassimples@proton.me
			</li>
			<li>
				<img class="icon-margin-right" alt="" src={GitHubMark} width="24" />
				<a class="non-text-anchor-element" href="https://github.com/luz-ojeda/cook-web#readme">GitHub</a>
			</li>
		</ul>
	</div>
</footer>

<style lang="scss">
	@import '../../sass/variables.scss';
	@import '../../sass/colors.scss';

	.container {
		@media (min-width: $tabletBreakpoint) {
			display: flex;
			gap: 20px;
			justify-content: space-between;
		}
	}

	.section {
		text-align: center;


		@media (max-width: $tabletBreakpoint) {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		@media (min-width: $tabletBreakpoint) {
			text-align: left;
		}

		@media (max-width: $mobileBreakpoint) {
			font-size: 1rem;
		}
	}

	ul {
		align-items: center;
		display: flex;
		flex-direction: column;
		list-style: none;
		padding-left: 0;

		@media (min-width: $tabletBreakpoint) {
			display: block;
		}
	}

	li {
		align-items: center;
		display: flex;

		@media (min-width: $tabletBreakpoint) {
			text-align: left;
		}
	}

	li:not(:last-child) {
		margin-bottom: 16px;

		@media (min-width: $tabletBreakpoint) {
			margin-bottom: 8px;
		}
	}

	* :global(.icon-margin-right) {
		margin-right: 6px;
	}

	.logotipo {
		align-items: center;
		display: flex;

		img {
			margin-right: 6px;
		}

		@media (max-width: $tabletBreakpoint) {
			justify-content: center;
		}
	}

	.search-input-wrapper {
		position: relative;

		.icon {
			color: $darkPrimaryColor;
			position: absolute;
			top: 50%;
			left: 6px;
			transform: translateY(-50%);
		}

		input {
			font-size: 1.125rem;
			padding-left: 38px;
			height: 48px;
			width: 250px;
		}
	}
</style>
