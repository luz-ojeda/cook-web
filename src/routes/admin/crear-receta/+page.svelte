<script lang="ts">
	import { onMount } from 'svelte';
	import { RecipeForm } from '$lib';
	import type { ActionData } from './$types';
	import { formData } from '../../../stores/recipeCreationStore';
	import { LOCAL_STORAGE_KEYS } from '../../../constants';

	export let form: ActionData;

	let files: FileList | null;
	let invalidFile = false;
	let errorMessage: string | undefined = '';

	$: {
		if (files === null) {
			errorMessage = '';
		}
	}

	$: {
		if (files) {
			invalidFile =
				!files[0].type.includes('jpg') &&
				!files[0].type.includes('jpeg') &&
				!files[0].type.includes('png');
		} else {
			invalidFile = false;
		}

		if (invalidFile) {
			errorMessage = 'La imagen no tiene un formato válido. Solo se permite .jpg, .jpeg y .png.';
		} else {
			errorMessage = '';
		}
	}

	$: errorMessage = form?.message;

	$: if (form?.success) {
		window.localStorage.removeItem(LOCAL_STORAGE_KEYS.RECIPE_CREATION_FORM);
	}

	onMount(() => {
		formData.getFormDataFromLocalStorage();
		formData.updateInputsWithFormData();
		formData.addEventListeners();
	});
</script>

<div class="container">
	<h1>Crear receta</h1>
	<RecipeForm
		{form}
		formData={$formData}
		onIngredientInput={formData.ingredientsEventListenerCallback}
		onAddIngredientClick={formData.addIngredient}
		onRemoveIngredientClick={formData.removeIngredient}
	/>
</div>

<style lang="scss">
	@import '../../../sass/variables.scss';
	@import '../../../sass/colors.scss';

	.container {
		padding: 48px 320px;

		@media (max-width: $laptopBreakpoint) {
			padding: 24px 128px;
		}

		@media (max-width: $tabletBreakpoint) {
			padding: 24px 80px;
		}

		@media (max-width: $mobileBreakpoint) {
			padding: 24px 16px;
		}
	}
</style>
