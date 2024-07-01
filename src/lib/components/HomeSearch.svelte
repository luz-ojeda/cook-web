<script>
	import { RecipesSearchForm } from '$lib';
</script>

<div class="container">
	<RecipesSearchForm />
</div>

<style lang="scss">
	@import '../../sass/variables.scss';
	@import '../../sass/colors.scss';

	.container {
		background-color: var(--card-bg);
		border-radius: $borderRadius;
		box-shadow: $smallShadow;
		padding: 24px;
	}
</style>
