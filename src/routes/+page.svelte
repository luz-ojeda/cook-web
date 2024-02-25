<script>
	import HomeSearch from "$lib/components/HomeSearch.svelte";

</script>
<!-- Hero -->
<div class="hero flex-center">
    <div>
        <h1>Recetas simples sin publicidades</h1>
        <p>
            Descubrí recetas auténticas y deliciosas, sin anuncios molestos. Tu experiencia culinaria merece
            ser ininterrumpida. Busca según ingredientes, dificultad y nombre:
        </p>
    </div>

    <!-- Buscador -->
    <div>
        <HomeSearch />
    </div>
</div>

<!-- Recipe cards -->
<div></div>

<!-- Footer -->
<div></div>

<style>
    .hero > div {
        flex-basis: 100%;
    }

    .hero div:first-of-type {
        margin-right: 48px;
    }
</style>