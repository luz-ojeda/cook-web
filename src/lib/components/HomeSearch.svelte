<script>
	import { RecipesSearchForm } from '$lib';
</script>

<div class="container">
	<RecipesSearchForm />
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.container {
		background-color: #ccc5b8;
		border-radius: $borderRadius;
		box-shadow: 0px 3px 6px hsla(18, 16%, 16%, .2);
		padding: 24px;
	}
</style>
