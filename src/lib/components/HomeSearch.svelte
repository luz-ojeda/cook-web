<script>
	import { RecipesSearchForm } from '$lib';
</script>

<div class="container">
	<RecipesSearchForm />
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.container {
		background-color: var(--card-bg);
		border-radius: $borderRadius;
		box-shadow: $smallShadow;
		padding: var(--component-padding);
	}
</style>
