<script>
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';
</script>

{#if $page.data.session}
	<slot />
{:else}
	<div class="flex-col-full-center">
		<h1>Debes iniciar sesión para ver esta página</h1>
		<SignIn provider="google" signInPage="signin" />
	</div>
{/if}
