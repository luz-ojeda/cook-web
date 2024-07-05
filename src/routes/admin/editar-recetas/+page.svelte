<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import type { PaginatedList } from '$lib/types/PaginatedList';
	import { Pagination, TextInput, slugify } from '$lib';;
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PaginatedList<Recipe>;
	let name = '';
	let nameFilter = '';
	let pageNumber: number | null = null;
	let perPage: number | null = null;

	$: if (pageNumber) {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('pagina', pageNumber.toString());

		window.scrollTo(0, 0);
		goto(newUrl);
	}

	$: if (perPage) {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('pagina', perPage.toString());

		window.scrollTo(0, 0);
		goto(newUrl);
	}

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		pageNumber = Number(urlParams.get('pagina')) || null;
		perPage = Number(urlParams.get('por_pagina')) || null;
		name = urlParams.get('nombre') || '';
	});
</script>

<svelte:head>
	<title>Recetas para editar</title>
</svelte:head>

<div class="container">
	<h1>Editar recetas</h1>
	<div class="table-handlers">
		<form action="/admin/editar-recetas" class="flex-center">
			<TextInput
				bind:inputValue={name}
				label="Buscar por nombre"
				placeholder=""
				id="nombre"
				name="nombre"
			/>
			<button type="submit">buscar</button>
		</form>
		<TextInput
			bind:inputValue={nameFilter}
			label="Filtrar resultados por nombre"
			placeholder=""
			id="nameFilter"
			name="nameFilter"
		/>
	</div>
	<table>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Resumen</th>
				<th>Ingredientes</th>
				<th>Tiempo de preparación</th>
				<th>Tiempo de cocina</th>
				<th>Porciones</th>
				<th>Dificultad</th>
				<th>Vegetariana</th>
			</tr>
		</thead>
		<tbody>
			{#each data.data.filter((r) => r.name
					.toLowerCase()
					.includes(nameFilter.toLowerCase())) as recipe}
				<tr>
					<td><a href={'editar-recetas/' + slugify(recipe.name)}>{recipe.name}</a></td>
					<td>{recipe.summary ?? ''}</td>
					<td>{recipe.ingredients.join(', ')}</td>
					<td>{recipe.preparationTime ?? ''}</td>
					<td>{recipe.cookingTime ?? ''}</td>
					<td>{recipe.servings ?? ''}</td>
					<td>{recipe.difficulty ?? ''}</td>
					<td>{recipe.vegetarian ? 'Yes' : 'No'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	{#if data.pagination && data.pagination.totalPages > 1}
		<div class="pagination">
			<Pagination
				currentPage={data.pagination.pageNumber}
				onPerPageChange={(p) => {
					perPage = p;
				}}
				onPageClick={(p) => {
					pageNumber = p;
				}}
				perPage={data.pagination.pageSize}
				totalPages={data.pagination.totalPages}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../../sass/variables.scss';

	.table-handlers {
		width: 25%;

		@media (max-width: $tabletBreakpoint) {
			width: 100%;
		}
	}

	table {
		border-collapse: collapse;
		margin-top: var(--space-lg);
		width: 100%;
	}
	th,
	td {
		border: 1px solid var(--border);
		padding: 8px;
	}
	th {
		background-color: var(--primary100);
	}

	.pagination {
		display: flex;
		justify-content: center;
		margin-top: var(--space-lg);
	}
</style>
