<script lang="ts">
	import { onMount } from 'svelte';
	import { applyAction, enhance } from '$app/forms';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { slugify, ImageUploadInput } from '$lib';
	import type { ActionData } from './$types';
	import { formData } from '../../../stores/recipeCreationStore';
	import { LOCAL_STORAGE_KEYS } from '../../../constants';

	export let form: ActionData;

	let loading = false;

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
	<form
		method="POST"
		enctype="multipart/form-data"
		use:enhance={() => {
			loading = true;

			return async ({ result }) => {
				await applyAction(result);
				loading = false;
			};
		}}
	>
		<div class="flex-center">
			<ImageUploadInput {files} />
		</div>
		<label for="name">
			Nombre*:
			<input
				bind:this={$formData.name}
				id="name"
				name="name"
				type="text"
				maxlength="150"
				required
			/>
		</label>

		<label class="label-column" for="summary">
			Resumen (el texto que aparecerá debajo de la tarjeta de receta):
			<textarea bind:this={$formData.summary} id="summary" name="summary" maxlength="150" />
			<span class="field-details">Máximo 150 caracteres</span>
		</label>

		<label class="label-column" for="instructions">
			Instrucciones*:
			<textarea
				bind:this={$formData.instructions}
				id="instructions"
				name="instructions"
				required
				minlength="20"
			/>
		</label>
		<fieldset>
			<legend>Ingredientes*:</legend>
			<div>
				{#each $formData.ingredients as ingredient, index (index)}
					<label for={index.toString()}>Ingrediente {index + 1}:</label>
					<div>
						<input
							id={index.toString()}
							name="ingredients"
							required
							type="text"
							on:input={formData.ingredientsEventListenerCallback}
							value={$formData.ingredients[index]}
						/>
						<button
							type="button"
							class="remove-ingredient-button"
							on:click={() => formData.removeIngredient(ingredient, index)}>Quitar</button
						>
					</div>
				{/each}
			</div>
			<button type="button" on:click={formData.addIngredient}>+ Añadir Ingrediente</button>
		</fieldset>

		<label for="preparationTime">
			Tiempo de preparación:
			<input
				bind:this={$formData.preparationTime}
				id="preparationTime"
				name="preparationTime"
				type="number"
			/>
		</label>

		<label for="cookingTime">
			Tiempo de cocina:
			<input bind:this={$formData.cookingTime} id="cookingTime" name="cookingTime" type="number" />
		</label>

		<label for="servings">
			Porciones:
			<input bind:this={$formData.servings} id="servings" name="servings" type="number" />
		</label>

		{#if $formData.difficulty}
			<fieldset>
				<legend>Dificultad:</legend>
				<label for="easy">
					Fácil
					<input
						bind:this={$formData.difficulty[0]}
						id="easy"
						name="difficulty"
						type="radio"
						value="Easy"
					/>
				</label>
				<label for="medium">
					Intermedia
					<input
						bind:this={$formData.difficulty[1]}
						id="medium"
						name="difficulty"
						type="radio"
						value="Medium"
					/>
				</label>
				<label for="hard">
					Difícil
					<input
						bind:this={$formData.difficulty[2]}
						id="hard"
						name="difficulty"
						type="radio"
						value="Hard"
					/>
				</label>
			</fieldset>
		{/if}

		<label for="vegetarian">
			Vegetariana
			<input bind:this={$formData.vegetarian} id="vegetarian" name="vegetarian" type="checkbox" />
		</label>

		<PrimaryButton disabled={invalidFile} {loading} type="submit">CREAR RECETA</PrimaryButton>
	</form>

	{#if form?.success}
		<p class="success">
			Receta creada exitosamente. Puedes verla <a href={`/recetas/${slugify(form?.data.name)}`}
				>aquí</a
			>
		</p>
	{/if}
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

<style lang="scss">
	@import '../../../sass/variables.scss';
	@import '../../../sass/colors.scss';

	form {
		> *:not(:last-child) {
			margin-bottom: 16px;

			@media (max-width: $tabletBreakpoint) {
				margin-bottom: 24px;
			}
		}
	}

	label {
		display: block;
		margin-right: 4px;
	}

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

	.label-column {
		display: flex;
		flex-direction: column;
	}

	.remove-ingredient-button {
		border-radius: 9999px;
		height: 32px;
	}

	.field-details {
		font-size: 14px;
	}
</style>
