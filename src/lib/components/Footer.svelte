<script>
	import { page } from '$app/stores';
	import { GitHubMark, Icon } from '$lib';
</script>

<footer class="container">
	<div class="section">
		<h3>COOK</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget sapien venenatis massa
			fringilla accumsan. Etiam cursus dapibus purus, eget iaculis lacus convallis quis. Sed
			dignissim diam in quam interdum, vitae suscipit massa sodales.
		</p>
	</div>
	<div class="section">
		<h3>EXPLORAR</h3>
		<ul>
			<li>
				<a href="/">Inicio</a>
			</li>
			<li>
				<a href="/sobre-cook" aria-current={$page.url.pathname === '/sobre-cook'}>Sobre Cook</a>
			</li>
			{#if $page.url.pathname != '/recetas'}
				<li>
					<a href="/recetas"> Buscar recetas </a>
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
				cook@proton.me
			</li>
			<li>
				<img class="icon-margin-right" alt="" src={GitHubMark} width="24" />
				<a href="https://github.com/luz-ojeda/cook-web">GitHub</a>
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

		&:first-of-type {
			flex-basis: 50%;
		}

		&:not(:first-of-type) {
			flex-basis: 25%;
		}

		@media (min-width: $tabletBreakpoint) {
			text-align: left;
		}

		@media (max-width: $mobileBreakpoint) {
			font-size: 16px;
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
</style>
