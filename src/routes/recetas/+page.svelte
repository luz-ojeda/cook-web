<script>
	export let data;
</script>

<h1>Recetas</h1>
<input type="text" placeholder="Buscar" />

<ul>
	{#each data.recipes as { name }}
		<li><a href="/recetas/{name}">{name}</a></li>
	{/each}
</ul>
