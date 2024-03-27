<script lang="ts">
	import PrimaryButton from './PrimaryButton.svelte';
	import ChipTextInput from './ChipTextInput.svelte';
	import TextInput from './TextInput.svelte';

	import { recipes } from '../../stores/recipes';
	import { page } from '$app/stores';

	let loading = false;

	async function onButtonClick() {
		if ($page.url.pathname === '/') return;

		loading = true;
		await recipes.loadRecipes();
		loading = false;
	}
</script>

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
		<div class={$page.url.pathname === '/' ? 'flex-center justify-between' : ''}>
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
	</div>

	<input id="vegetarian" name="vegetarian" type="checkbox" bind:checked={$recipes.onlyVegetarian} />
	<label for="vegetarian">Solo vegetarianas</label>
	<a href={""}>Buscar</a>

	<PrimaryButton disabled={$recipes.loading} {loading} onClick={onButtonClick} width="100%"
		>{#if $page.url.pathname === '/'}
			<a href="/recetas?name=chicken">Buscar</a>
		{:else}Buscar{/if}</PrimaryButton
	>
</form>

<style lang="scss">
	@import '../../sass/variables.scss';

	form {
		font-size: 18px;
		> *:not(:last-child) {
			margin-bottom: 16px;
		}
	}

	.difficulty-label {
		margin-bottom: 6px;
	}
</style>
