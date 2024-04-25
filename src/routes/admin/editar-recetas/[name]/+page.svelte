<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';

	export let data: Recipe;
</script>

<div class="spacing">
	<h1>{data.name}</h1>
</div>
