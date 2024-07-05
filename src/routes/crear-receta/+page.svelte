<script lang="ts">
	import { onMount } from 'svelte';
	import { RecipeForm } from '$lib';
	import type { ActionData } from './$types';
	import { formData } from '../../stores/recipeCreationStore';
	import { LOCAL_STORAGE_KEYS } from '../../constants';

	export let form: ActionData;

	$: if (form?.success) {
		window.localStorage.removeItem(LOCAL_STORAGE_KEYS.RECIPE_CREATION_FORM);
	}

	onMount(() => {
		formData.getFormDataFromLocalStorage();
		formData.updateInputsWithFormData();
		formData.addEventListeners();
	});
</script>

<svelte:head>
	<title>Crear receta</title>
</svelte:head>

<div class="container">
	<h1>Crear receta</h1>
	<RecipeForm
		{form}
		formData={$formData}
		onAddIngredientClick={formData.addIngredient}
		onIngredientInput={formData.onIngredientInput}
		onRemoveIngredientClick={formData.removeIngredient}
		submitButtonText="CREAR RECETA"
		successMessage="Receta creada exitosamente."
	/>
</div>