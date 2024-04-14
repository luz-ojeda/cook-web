<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { slugify, ImageUploadInput } from '$lib';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let ingredients = [''];
	let loading = false;
	let files: FileList | null;
	let invalidFile = false;
	let errorMessage: string | undefined = '';

	function addIngredient() {
		ingredients = [...ingredients, ''];
	}

	function removeIngredient(ingredient: string) {
		ingredients = ingredients.filter((i) => i !== ingredient);
	}

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
</script>

<div class="spacing">
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
			<input id="name" name="name" type="text" maxlength="150" required />
		</label>

		<label class="label-column" for="summary">
			Resumen (el texto que aparecerá debajo de la tarjeta de receta):
			<textarea id="summary" name="summary" maxlength="150" />
			<span class="field-details">Máximo 150 caracteres</span>
		</label>

		<label class="label-column" for="instructions">
			Instrucciones*:
			<textarea id="instructions" name="instructions" required minlength="20" />
		</label>
		<fieldset>
			<legend>Ingredientes*:</legend>
			<div>
				{#each ingredients as ingredient, index (index)}
					<label for="ingredient{index + 1}">Ingrediente {index + 1}:</label>
					<div>
						<input
							id="ingredient{index + 1}"
							name="ingredients"
							required
							type="text"
							bind:value={ingredients[index]}
						/>
						<button
							type="button"
							class="remove-ingredient-button"
							on:click={() => removeIngredient(ingredient)}>Quitar</button
						>
					</div>
				{/each}
			</div>
			<button type="button" on:click={addIngredient}>+ Añadir Ingrediente</button>
		</fieldset>

		<label for="preparationTime">
			Tiempo de preparación:
			<input id="preparationTime" name="preparationTime" type="number" />
		</label>

		<label for="cookingTime">
			Tiempo de cocina:
			<input id="cookingTime" name="cookingTime" type="number" />
		</label>

		<label for="servings">
			Porciones:
			<input id="servings" name="servings" type="number" />
		</label>

		<fieldset>
			<legend>Dificultad:</legend>
			<label for="easy">
				Fácil
				<input id="easy" name="difficulty" type="radio" value={'Easy'} />
			</label>
			<label for="medium">
				Intermedia
				<input id="medium" name="difficulty" type="radio" value="Medium" />
			</label>
			<label for="hard">
				Difícil
				<input id="hard" name="difficulty" type="radio" value="Hard" />
			</label>
		</fieldset>

		<label for="vegetarian">
			Vegetariana
			<input id="vegetarian" name="vegetarian" type="checkbox" />
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
