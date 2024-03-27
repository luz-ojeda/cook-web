<script lang="ts">
	import PrimaryButton from './PrimaryButton.svelte';
	import ChipTextInput from './ChipTextInput.svelte';
	import TextInput from './TextInput.svelte';

	import { recipes } from '../../stores/recipes';

	let loading = false;

	async function onButtonClick() {
		loading = true;
		await recipes.loadRecipes();
		loading = false;
	}
</script>

<aside>
	<form>
		<div>
			<TextInput
				bind:inputValue={$recipes.name}
				label="Nombre de la receta:"
				placeholder="guiso de lentejas..."
				id="name"
				name="name"
			/>
		</div>
		<div>
			<ChipTextInput
				bind:values={$recipes.ingredients}
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
					bind:group={$recipes.difficulties}
					value="Easy"
				/>
				<label for="easy">Fáciles</label>
			</div>

			<div>
				<input
					type="checkbox"
					id="medium"
					name="medium"
					bind:group={$recipes.difficulties}
					value="Medium"
				/>
				<label for="medium">Intermedias</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="hard"
					name="hard"
					bind:group={$recipes.difficulties}
					value="Hard"
				/>
				<label for="hard">Difíciles</label>
			</div>
		</div>

		<input
			id="vegetarian"
			name="vegetarian"
			type="checkbox"
			bind:checked={$recipes.onlyVegetarian}
		/>
		<label for="vegetarian">Solo vegetarianas</label>

		<PrimaryButton disabled={$recipes.loading} {loading} onClick={onButtonClick} width="100%"
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
