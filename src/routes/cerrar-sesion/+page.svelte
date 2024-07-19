<script lang="ts">
	import { SignOut } from '@auth/sveltekit/components';
	import Protected from '$lib/components/Protected.svelte';
</script>

<Protected>
	<div class="narrow-page">
		<h2>Estás seguro/a que quieres cerrar sesión?</h2>
		<SignOut
			options={{
				redirectTo: '/'
			}}
			signOutPage="cerrar-sesion"
			className="w-full"
		>
			<div slot="submitButton">
				<span> Cerrar sesión </span>
			</div>
		</SignOut>
	</div>
</Protected>
