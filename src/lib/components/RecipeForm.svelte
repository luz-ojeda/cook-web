<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { ImageUploadInput, slugify } from '$lib';
	import Button from '$lib/components/Button.svelte';
	import type { Recipe } from '$lib/types/Recipe';
	import type { RecipeFormDataElems } from '$lib/types/RecipeFormData';
	import type { ActionData as CreateRecipeActionData } from '../../routes/crear-receta/$types';
	import type { ActionData as UpdateRecipeActionData } from '../../routes/admin/editar-recetas/[name]/$types';

	export let form: UpdateRecipeActionData | CreateRecipeActionData;
	export let formData: RecipeFormDataElems;
	export let onIngredientInput: (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => void;
	export let onAddIngredientClick: () => void;
	export let onRemoveIngredientClick: (ingToRemove: string, index: number) => void;
	export let values: Recipe | undefined = undefined;
	export let submitButtonText: string;
	export let successMessage: string;

	let loading = false;

	let files: FileList | null;
	let invalidFile = false;
	let errorMessage: string | undefined = '';
	let imageErrorMessage: string | undefined = '';

	$: {
		if (files === null) {
			errorMessage = '';
		}
	}

	function validateFile(file: Blob): boolean {
		imageErrorMessage = '';
		const invalidType =
			!file.type.includes('jpg') && !file.type.includes('jpeg') && !file.type.includes('png');

		const invalidSize = file.size > 500000;

		invalidFile = invalidType || invalidSize;

		if (invalidType) {
			imageErrorMessage =
				'La imagen no tiene un formato válido. Solo se permite .jpg, .jpeg y .png.';
		} else if (invalidSize) {
			imageErrorMessage = 'La imagen debe pesar menos de 500KB';
		} else {
			imageErrorMessage = '';
		}

		return !invalidFile;
	}

	$: errorMessage = form?.message;
</script>

<div>
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
		{#if values?.id}
			<input id="id" name="id" readonly type="id" value={values?.id} />
		{/if}
		<div>
			<ImageUploadInput {files} validateImage={validateFile} recipeImage={values?.pictures[0]} />
			<p class="max-size-note text--sm">Tamaño máximo: 500 KB</p>
			{#if imageErrorMessage}
				<p class="error">{imageErrorMessage}</p>
			{/if}
		</div>
		<label for="name">
			Nombre*:
			<input
				bind:this={formData.name}
				id="name"
				name="name"
				type="text"
				maxlength="150"
				required
				value={values?.name}
			/>
		</label>

		<label class="label-column" for="summary">
			Resumen (el texto que aparecerá debajo de la tarjeta de receta):
			<textarea
				bind:this={formData.summary}
				id="summary"
				name="summary"
				maxlength="150"
				value={values?.summary}
			/>
			<span class="field-details">Máximo 150 caracteres</span>
		</label>

		<label class="label-column" for="instructions">
			Instrucciones*:
			<textarea
				bind:this={formData.instructions}
				id="instructions"
				name="instructions"
				required
				minlength="20"
				value={values?.instructions}
			/>
		</label>
		<fieldset>
			<legend>Ingredientes*:</legend>
			<div>
				{#each values?.ingredients ?? formData.ingredients as ingredient, index (index)}
					<label for={index.toString()}>Ingrediente {index + 1}:</label>
					<div>
						<input
							id={index.toString()}
							name="ingredients"
							required
							type="text"
							on:input={onIngredientInput}
							value={values?.ingredients[index] ?? formData.ingredients[index]}
						/>
						<button
							type="button"
							class="remove-ingredient-button"
							on:click={() => onRemoveIngredientClick(ingredient, index)}>Quitar</button
						>
					</div>
				{/each}
			</div>
			<button type="button" on:click={onAddIngredientClick}>+ Añadir Ingrediente</button>
		</fieldset>

		<label for="preparationTime">
			Tiempo de preparación:
			<input
				bind:this={formData.preparationTime}
				id="preparationTime"
				name="preparationTime"
				type="number"
				value={values?.preparationTime}
			/>
		</label>

		<label for="cookingTime">
			Tiempo de cocina:
			<input
				bind:this={formData.cookingTime}
				id="cookingTime"
				name="cookingTime"
				type="number"
				value={values?.cookingTime}
			/>
		</label>

		<label for="servings">
			Porciones:
			<input
				bind:this={formData.servings}
				id="servings"
				name="servings"
				type="number"
				value={values?.servings}
			/>
		</label>

		{#if formData.difficulty}
			<fieldset>
				<legend>Dificultad:</legend>
				<label for="easy">
					Fácil
					<input
						bind:this={formData.difficulty[0]}
						id="easy"
						name="difficulty"
						type="radio"
						value="Easy"
						checked={values?.difficulty == 'Easy'}
					/>
				</label>
				<label for="medium">
					Intermedia
					<input
						bind:this={formData.difficulty[1]}
						id="medium"
						name="difficulty"
						type="radio"
						value="Medium"
						checked={values?.difficulty == 'Medium'}
					/>
				</label>
				<label for="hard">
					Difícil
					<input
						bind:this={formData.difficulty[2]}
						id="hard"
						name="difficulty"
						type="radio"
						value="Hard"
						checked={values?.difficulty == 'Hard'}
					/>
				</label>
			</fieldset>
		{/if}

		<label for="vegetarian">
			Vegetariana
			<input
				bind:this={formData.vegetarian}
				id="vegetarian"
				name="vegetarian"
				type="checkbox"
				checked={values?.vegetarian}
			/>
		</label>

		<div class="button-container">
			<Button disabled={invalidFile} {loading} type="submit">{submitButtonText}</Button>
		</div>
	</form>
	{#if form?.success}
		<p class="success">
			{successMessage} Puedes verla <a href={`/recetas/${slugify(form?.data.name)}`}>aquí</a>
		</p>
	{/if}
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

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

	.button-container {
		width: 384px;

		@media (max-width: $tabletBreakpoint) {
			width: auto;
		}
	}

	.max-size-note {
		color: var(--light-text);
		margin-top: 0;
	}
</style>
