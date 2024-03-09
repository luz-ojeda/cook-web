<script lang="ts">
	import { setContext } from 'svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import PrimaryButton from './PrimaryButton.svelte';
	import { recipes } from '../../stores/recipesStore';

	let recipeName = '';

	async function getRecipes() {
		const response = await fetch(`/recetas?name=${recipeName}`);
		const responseJson = await response.json();
		console.log(responseJson)

		recipes.update((r) => responseJson);
	}
</script>

<aside>
	<div>
		<TextInput
			bind:inputValue={recipeName}
			label="Nombre de la receta:"
			placeholder="guiso de lentejas..."
			id="name"
			name="name"
		/>
	</div>
	<div>
		<TextInput
			label="Ingredientes:"
			placeholder="huevos, tomate, queso"
			id="ingredients"
			name="ingredients"
		/>
	</div>
	<div>
		<div class="difficulty-label">Dificultad:</div>
		<div>
			<input type="checkbox" id="easy" name="easy" />
			<label for="easy">Fáciles</label>
		</div>

		<div>
			<input type="checkbox" id="medium" name="medium" />
			<label for="medium">Intermedias</label>
		</div>
		<div>
			<input type="checkbox" id="hard" name="hard" />
			<label for="hard">Difíciles</label>
		</div>
	</div>
	<PrimaryButton onClick={getRecipes} width="100%">Buscar</PrimaryButton>
</aside>

<style lang="scss">
	@import '../../sass/variables.scss';

	aside {
		font-size: 18px;
		margin-right: 20px;
		min-width: 265px;

		> *:not(:last-child) {
			margin-bottom: 16px;
		}

		@media (max-width: $tabletBreakpoint) {
			display: none;
		}
	}

	.difficulty-label {
		margin-bottom: 6px;
	}
</style>
