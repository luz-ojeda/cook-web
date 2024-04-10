<script lang="ts">
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import type { PageData, ActionData } from './$types';
	import { applyAction, enhance } from '$app/forms';

	export let form: ActionData;

	let ingredients = [''];
	let loading = false;

	function addIngredient() {
		ingredients = [...ingredients, ''];
	}

	function removeIngredient(ingredient: string) {
		ingredients = ingredients.filter((i) => i !== ingredient);
	}
</script>

<div class="spacing">
	<h1>Crear receta</h1>
	<form
		method="POST"
		use:enhance={() => {
			loading = true;

			return async ({ result }) => {
				await applyAction(result);
				loading = false;
			};
		}}
	>
		<label for="name">
			Nombre*:
			<input id="name" name="name" type="text" maxlength="150" required />
		</label>

		<label class="label-column" for="summary">
			Resumen (el texto que aparecerá debajo de la tarjeta de receta):
			<textarea id="summary" name="summary" maxlength="150" />
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

		<PrimaryButton {loading} type="submit">CREAR RECETA</PrimaryButton>
	</form>
	{#if form?.success}
		<p class="success">
			Receta creada exitosamente. Puedes verla <a href={`/recetas/${form?.data.name.toLowerCase().replaceAll(' ', '-')}`}>aquí</a>
		</p>
	{/if}
	{#if form?.failure}
		<p class="error">{form?.message}</p>
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
	}

	.label-column {
		display: flex;
		flex-direction: column;
	}

	.remove-ingredient-button {
		border-radius: 9999px;
		height: 32px;
	}
</style>
