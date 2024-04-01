<script lang="ts">
	import { page } from '$app/stores';
	import { ServerError } from "$lib";
</script>

<div class="container spacing">
	{#if $page.error}
		<h2>{$page.error ? $page.error.message : ''}</h2>
	{/if}
	{#if $page.status === 404}
		{#if $page.route.id !== '/recetas/[name]'}
			Volver a la <a href="/">página principal</a>
		{:else}
			Volver a la <a href="/recetas">página de recetas</a>
		{/if}
	{/if}
	{#if $page.status !== 404}
		<img src={ServerError} alt="" />
	{/if}
</div>

<style lang="scss">
	@import "../sass/variables.scss";

	.container {
		align-items: center;
		display: flex;
		flex-direction: column;
		position: relative;
		text-align: center;
	}
</style>
