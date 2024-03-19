<script>
	import { Location, Mail } from '$lib';
</script>

<footer class="container spacing">
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
			<li>Sobre la página</li>
			<li>Buscar recetas</li>
		</ul>
	</div>
	<div class="section">
		<h3>CONTACTO</h3>
		<ul>
			<li>
				<img class="list-icon" alt="" src={Location} width="24" />
				Ciudad Autónoma de Buenos Aires
			</li>
			<li>
				<img class="list-icon" alt="" src={Mail} width="24" />
				cook@proton.me
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

		a {
			text-decoration: none;
			color: inherit;
		}

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

	.list-icon {
		margin-right: 6px;
	}
</style>
