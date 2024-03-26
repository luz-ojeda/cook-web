<script lang="ts">
	import PrimaryButton from './PrimaryButton.svelte';
	import { parameters, recipes } from '../../stores/recipes';
	import ChipTextInput from './ChipTextInput.svelte';
	import TextInput from './TextInput.svelte';

	export let getRecipes: (
		difficulties: string[],
		ingredients: string[],
		name: string,
		onlyVegetarian: boolean
	) => void;
</script>

<aside>
	<form>
		<div>
			<TextInput
				bind:inputValue={$parameters.name}
				label="Nombre de la receta:"
				placeholder="guiso de lentejas..."
				id="name"
				name="name"
			/>
		</div>
		<div>
			<ChipTextInput
				bind:values={$parameters.ingredients}
				label="Ingredientes (presiona enter luego de cada uno):"
				placeholder="huevos, tomate, queso"
				id="ingredients"
				name="ingredients"
			/>
		</div>
		<div>
			<div class="difficulty-label">Dificultad:</div>
			<div>
				<input
					type="checkbox"
					id="easy"
					name="easy"
					bind:group={$parameters.difficulties}
					value="Easy"
				/>
				<label for="easy">Fáciles</label>
			</div>

			<div>
				<input
					type="checkbox"
					id="medium"
					name="medium"
					bind:group={$parameters.difficulties}
					value="Medium"
				/>
				<label for="medium">Intermedias</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="hard"
					name="hard"
					bind:group={$parameters.difficulties}
					value="Hard"
				/>
				<label for="hard">Difíciles</label>
			</div>
		</div>

		<input
			id="vegetarian"
			name="vegetarian"
			type="checkbox"
			bind:checked={$parameters.onlyVegetarian}
		/>
		<label for="vegetarian">Solo vegetarianas</label>

		<PrimaryButton
			loading={$recipes.loading}
			onClick={() =>
				getRecipes(
					$parameters.difficulties,
					$parameters.ingredients,
					$parameters.name,
					$parameters.onlyVegetarian
				)}
			width="100%">Buscar</PrimaryButton
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
