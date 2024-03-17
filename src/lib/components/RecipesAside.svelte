<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import PrimaryButton from './PrimaryButton.svelte';
	import { recipesStore } from '../../stores/recipesStore';
	import ChipTextInput from './ChipTextInput.svelte';

	let recipeName = '';
	let difficulties: string[] = [];
	let ingredients: string[] = [];
	let isLoadingRecipes = false;

	async function getRecipes() {
		isLoadingRecipes = true;
		let url = `/recetas?name=${recipeName}`;

		for (let i = 0; i < difficulties.length; i++) {
			url += `&difficulty=${difficulties[i]}`;
		}

		for (let i = 0; i < ingredients.length; i++) {
			url += `&ingredients=${ingredients[i]}`;
		}

		const response = await fetch(url);
		const data = await response.json();
		isLoadingRecipes = false;
		recipesStore.update((r) => data);
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
	<PrimaryButton loading={isLoadingRecipes} onClick={getRecipes} width="100%">Buscar</PrimaryButton>
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
