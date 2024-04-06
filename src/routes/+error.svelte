<script lang="ts">
	import { page } from '$app/stores';
	import { ServerError } from '$lib';
</script>

<div class="container spacing">
	{#if $page.status === 404}
		{#if $page.route.id !== '/recetas/[name]'}
			<h2>No se encontró la página solicitada</h2>
			Volver a la<a href="/">página principal</a>
		{:else}
			<h2>{$page.error?.message}</h2>
			Volver a la<a href="/recetas">página de recetas</a>
		{/if}
	{:else}
		<h2>{$page.error ? $page.error.message : ''}</h2>
		<img src={ServerError} alt="" />
	{/if}
</div>

<style lang="scss">
	@import '../sass/variables.scss';

	.container {
		align-items: center;
		display: flex;
		flex-direction: column;
		position: relative;
		text-align: center;
	}
</style>
