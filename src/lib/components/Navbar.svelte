<script>
	import logo from '$lib/assets/logo.png';
</script>

<nav class="flex-center">
	<div class="flex-center">
		<img alt="" src={logo} width="32" /> <!-- Use svg to modify size without quality? -->
		<h1>COOK</h1>
	</div>
	<div>
		<a href="/recetas">Recetas</a>
		<a href="/recetas-guardadas">Recetas guardadas</a>
	</div>
</nav>

<style>
	nav {
		font-size: 24px;
		justify-content: space-between;
	}

	img {
		margin-right: 12px;
	}
</style>