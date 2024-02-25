<div class="container flex-column">
	<div class="flex-column">
		<label for="name">Nombre de la receta:</label>
		<input placeholder="risotto, pastafrola, tortilla" type="text" id="name" name="name" />
	</div>
	
	<div class="flex-column">
		<label for="ingredients">Ingredientes:</label>
		<input placeholder="huevos, tomate, queso" type="text" id="ingredients" name="ingredients" />
	</div>
	
	<fieldset>
		<legend>Dificultad de las recetas:</legend>
		<div class="flex-center">
			<div>
				<input type="checkbox" id="easy" name="easy" checked />
				<label for="easy">Fácil</label>
			</div>
		
			<div>
				<input type="checkbox" id="medium" name="medium" />
				<label for="medium">Intermedio</label>
			</div>
			<div>
				<input type="checkbox" id="hard" name="hard" />
				<label for="hard">Difícil</label>
			</div>
		</div>
	</fieldset>
	
	<button>BUSCAR</button>
</div>

<style>
	.container {
		border: 1px solid black;
		padding: 24px;
	}

	.container > *:not(:last-child) {
		margin-bottom: 16px;
	}

	label {
		margin-bottom: 4px;
	}

	fieldset {
		border: 0;
		padding: 0;
		width: 100%;
	}

	fieldset legend {
		margin-bottom: 4px;
	}

	fieldset div {
		justify-content: space-between;
	}
</style>
