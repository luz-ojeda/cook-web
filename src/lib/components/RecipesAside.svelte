<script lang="ts">
	import PrimaryButton from './PrimaryButton.svelte';
	import { recipesStore } from '../../stores/recipesStore';
	import ChipTextInput from './ChipTextInput.svelte';
	import TextInput from './TextInput.svelte';

	let recipeName = '';
	let difficulties: string[] = [];
	let ingredients: string[] = [];
	let onlyVegetarian = false;
	let isLoadingRecipes = false;

	async function getRecipes() {
		isLoadingRecipes = true;
		let url = `/recetas?`;

		if (recipeName) {
			url += `name=${recipeName}&`;
		}

		for (let i = 0; i < difficulties.length; i++) {
			url += `difficulty=${difficulties[i]}&`;
		}

		for (let i = 0; i < ingredients.length; i++) {
			url += `ingredients=${ingredients[i]}&`;
		}

		if (onlyVegetarian) {
			url += `onlyVegetarian=true`;
		}

		const response = await fetch(url);
		const data = await response.json();
		isLoadingRecipes = false;
		recipesStore.update((r) => data);
	}
</script>

<aside>
	<form>
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
			<ChipTextInput
				bind:values={ingredients}
				label="Ingredientes (presiona enter luego de cada uno):"
				placeholder="huevos, tomate, queso"
				id="ingredients"
				name="ingredients"
			/>
		</div>
		<div>
			<div class="difficulty-label">Dificultad:</div>
			<div>
				<input type="checkbox" id="easy" name="easy" bind:group={difficulties} value="Easy" />
				<label for="easy">Fáciles</label>
			</div>

			<div>
				<input type="checkbox" id="medium" name="medium" bind:group={difficulties} value="Medium" />
				<label for="medium">Intermedias</label>
			</div>
			<div>
				<input type="checkbox" id="hard" name="hard" bind:group={difficulties} value="Hard" />
				<label for="hard">Difíciles</label>
			</div>
		</div>
		<input id="vegetarian" name="vegetarian" type="checkbox" bind:value={onlyVegetarian} />
		<label for="vegetarian">Solo vegetarianas</label>
		<PrimaryButton loading={isLoadingRecipes} onClick={getRecipes} width="100%"
			>Buscar</PrimaryButton
		>
	</form>
</aside>

<style lang="scss">
	@import '../../sass/variables.scss';

	aside {
		font-size: 18px;
		margin-right: 20px;
		min-width: 265px;

		@media (max-width: $tabletBreakpoint) {
			display: none;
		}
	}

	form {
		> *:not(:last-child) {
			margin-bottom: 16px;
		}
	}

	.difficulty-label {
		margin-bottom: 6px;
	}
</style>
