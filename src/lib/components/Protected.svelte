<script>
	import { page } from '$app/stores';
	import GoogleSignInButton from "./GoogleSignInButton.svelte";
</script>

{#if $page.data.session}
	<slot />
{:else}
	<div class="flex-col-full-center">
		<h1>Debes iniciar sesión para ver esta página</h1>
		<GoogleSignInButton />
	</div>
{/if}
