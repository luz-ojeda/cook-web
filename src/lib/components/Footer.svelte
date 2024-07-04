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
				<svg width="24" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
					<style>
						.github {
							fill: var(--text);
						}
						.dark .github {
							fill: var(--text);
						}
					</style>

					<path
						class="github"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
					/>
				</svg>
				<a class="non-text-anchor-element" href="https://github.com/luz-ojeda/cook-web#readme"
					>GitHub</a
				>
			</li>
		</ul>
	</div>
</footer>

<style lang="scss">
	@import '../../sass/variables.scss';

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

	* :global(.icon-margin-right), svg {
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
			color: var(--btn-primary-bg);
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
