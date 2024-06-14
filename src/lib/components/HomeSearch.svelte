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
		background-color: $grey400;
		border-radius: $borderRadius;
		box-shadow: $smallShadow;
		padding: 24px;

		@media (prefers-color-scheme: dark) {
			background-color: $grey800;
		}
	}
</style>
