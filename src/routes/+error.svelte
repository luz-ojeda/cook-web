<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container spacing">
	{#if $page.error}
		<h2>{$page.error ? $page.error.message : ''}</h2>
	{/if}
</div>

<style>
    .container {
        text-align: center;
    }
</style>
