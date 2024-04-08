<script lang="ts">
	let ingredients = [''];

	function addIngredient() {
		ingredients = [...ingredients, ''];
	}
</script>

<div class="spacing">
	<h1>Crear receta</h1>
	<form method="POST">
		<label for="name">
			Nombre:
			<input id="name" name="name" type="text" />
		</label>

		<label for="instructions">
			Instrucciones:
			<textarea id="instructions" name="instructions" />
		</label>

		<fieldset>
			<div>
				{#each ingredients as ingredient, index}
					<label for="ingredient{index + 1}">Ingrediente {index + 1}:</label>
					<input
						id="ingredient{index + 1}"
						name="ingredients"
						type="text"
						bind:value={ingredients[index]}
					/>
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
				<input id="easy" name="difficulty" type="radio" value={"Easy"} />
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

		<button type="submit">CREAR RECETA</button>
	</form>
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

	button[type='submit'] {
		border: 1px solid $primaryColor;
		font-size: 18px;
		padding: 12px 6px;
	}
</style>
