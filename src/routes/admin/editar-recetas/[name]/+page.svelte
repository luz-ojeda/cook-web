<script lang="ts">
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { formData } from '../../../../stores/recipeUpdateStore';
	import type { Recipe } from '$lib/types/Recipe';
	import type { ActionData } from './$types';

	export let data: Recipe;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Editar {data.name}</title>
</svelte:head>

<div>
	<h1>Editar "{data.name}"</h1>
	<RecipeForm
		{form}
		formData={$formData}
		onAddIngredientClick={formData.addIngredient}
		onIngredientInput={formData.onIngredientInput}
		onRemoveIngredientClick={formData.removeIngredient}
		submitButtonText="EDITAR RECETA"
		successMessage="Receta editada exitosamente."
		values={data}
	/>
</div>
