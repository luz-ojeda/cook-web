<script lang="ts">
	import { page, navigating } from '$app/stores';
	import { ChipTextInput, PrimaryButton, TextInput } from '$lib';
	import { buildRecipesBrowserUrl } from '$lib/scripts/urls';
	import { recipes } from '../../stores/recipes';
	import { burgerMenuStore } from '../../stores/burgerMenu';

	let loading = false;

	async function onButtonClick() {
		if ($page.url.pathname === '/') return;

		$recipes.page = 1;
		
		loading = true;
		await recipes.loadRecipes();
		loading = false;
		if ($burgerMenuStore) $burgerMenuStore = false;
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
		<div
			class={`difficulties-container ${$page.url.pathname === '/' ? 'flex-center justify-between' : ''}`}
		>
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

	{#if $page.url.pathname !== '/'}
		<PrimaryButton disabled={$recipes.loading} {loading} onClick={onButtonClick} width="100%">
			Buscar
		</PrimaryButton>
	{:else}
		<a
			href={buildRecipesBrowserUrl({
				name: $recipes.name,
				ingredients: $recipes.ingredients,
				difficulties: $recipes.difficulties,
				onlyVegetarian: $recipes.onlyVegetarian
			})}
			style={Boolean($navigating) ? 'pointer-events: none' : ''}
		>
			<PrimaryButton
				disabled={$recipes.loading || Boolean($navigating)}
				loading={loading && $navigating?.to?.url.pathname == '/recetas'}
				onClick={() => {
					loading = true;
				}}
				width="100%">Buscar</PrimaryButton
			>
		</a>
	{/if}
</form>

<style lang="scss">
	@import '../../sass/variables.scss';

	form {
		font-size: 18px;

		> *:not(:last-child) {
			margin-bottom: 16px;

			@media (max-width: $tabletBreakpoint) {
				margin-bottom: 24px;
			}
		}
	}

	.difficulty-label {
		margin-bottom: 6px;
	}

	.difficulties-container {
		@media (max-width: $tabletBreakpoint) {
			div {
				&:not(:last-child) {
					margin-bottom: 12px;
				}
			}
		}
	}
</style>
