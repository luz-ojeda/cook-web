<script lang="ts">
	import { page, navigating } from '$app/stores';
	import { ChipTextInput, Button, TextInput } from '$lib';
	import { buildRecipesBrowserUrl } from '$lib/scripts/urls';
	import { recipes } from '../../stores/recipes';
	import { burgerMenuStore } from '../../stores/burgerMenu';
	import { onMount } from 'svelte';

	let loading = false;

	async function onButtonClick() {
		if ($page.url.pathname === '/') return;

		$recipes.page = 1;

		loading = true;
		await recipes.loadRecipes();
		loading = false;
		if ($burgerMenuStore) $burgerMenuStore = false;
	}

	onMount(() => {
		if ($page.url.pathname == '/') {
			recipes.update((store) => {
				return {
					...store,
					name: '',
					ingredients: [],
					difficulties: [],
					onlyVegetarian: false
				};
			});
		}
	});
</script>

<form aria-label="Recipe search form">
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
		<Button {loading} onClick={onButtonClick} type="submit">Buscar</Button>
	{:else}
		<a
			class="non-text-anchor-element"
			href={buildRecipesBrowserUrl({
				name: $recipes.name,
				ingredients: $recipes.ingredients,
				difficulties: $recipes.difficulties,
				onlyVegetarian: $recipes.onlyVegetarian
			})}
			style={Boolean($navigating) ? 'pointer-events: none' : ''}
		>
			<Button
				disabled={$recipes.loading || Boolean($navigating)}
				loading={loading && $navigating?.to?.url.pathname == '/recetas'}
				onSubmit={() => {
					loading = true;
				}}
				type="submit">Buscar</Button
			>
		</a>
	{/if}
</form>
