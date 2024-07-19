<script>
	import GoogleSignInButton from '$lib/components/GoogleSignInButton.svelte';
</script>

<div class="narrow-page">
	<h1>Iniciar sesión</h1>
	<p>Por el momento solo es posible iniciar sesión con una cuenta de Google.</p>
	<p>Esto te permitirá:</p>
	<ul>
		<li>Crear recetas de forma pública o privada en el sitio.</li>
		<li>Editar o eliminar tus recetas</li>
		<li>Una página donde ver las recetas creadas por ti</li>
	</ul>
	<GoogleSignInButton />
</div>
