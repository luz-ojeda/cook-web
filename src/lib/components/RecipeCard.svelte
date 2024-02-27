<script lang="ts">
    export let recipeImage: string;
    export let recipeTitle: string;
    export let recipeSummary: string;
</script>

<div class="flex-column">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={recipeImage} alt="Photo of the recipe" />
    <h2>{recipeTitle}</h2>
    <p>{recipeSummary}</p>
</div>

<style lang="scss">
	@import "../../sass/variables.scss";

	img {
		aspect-ratio: 1 / 1;
        border-radius: $borderRadius;
        max-width: 100%;
        object-fit: cover;
	}

    h2 {
        margin-bottom: 0;
        text-transform: uppercase;
    }
</style>
