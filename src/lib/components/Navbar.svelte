<script>
	import logo from '$lib/assets/logo.png';
</script>

<nav class="spacing flex-center">
	<!-- Use svg to modify size without quality? -->
	<a class="flex-center logo" href="/">
		<img alt="" src={logo} width="32" />
		COOK
	</a>
	<div class="nav-links">
		<a href="/recetas">Recetas</a>
		<a href="/recetas-guardadas">Recetas guardadas</a>
	</div>
</nav>

<style>
	nav {
		font-size: 24px;
		height: 80px;
		margin-bottom: 32px;
		justify-content: space-between;
	}

	.logo {
		color: inherit;
		text-decoration: none;
	}

	img {
		margin-right: 12px;
	}
	
	.nav-links a {
		text-decoration: none
	}

	.nav-links a:not(:last-child) {
		margin-right: 16px;
	}
</style>
