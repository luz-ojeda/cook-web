<script lang="ts">
	export let currentPage: number;
	export let onPageClick: (page: number) => void;
	export let onPerPageChange: (perPage: number) => void;
	export let perPage: number;
	export let totalPages: number;

	const PAGES_TO_DISPLAY_IN_BETWEEN = 3;
	let pagesArray = Array.from({ length: totalPages }, (_, x) => x + 1);
	let pagesSliceIndex = 1;

	// Dynamically changing the starting index of a slice of the array with all pages lets us correctly display the middle pages
	$: {
		pagesSliceIndex =
			currentPage <= PAGES_TO_DISPLAY_IN_BETWEEN // Page is less than or equal to 3, we slice the array from 1 to 4
				? 1 // (1, 2, 3, 4, ... 9)
				: totalPages < currentPage + PAGES_TO_DISPLAY_IN_BETWEEN // The total pages are less than the page + 3, we are near the end and will slice from totalPages - 3 - 1 (account for length)
					? totalPages - PAGES_TO_DISPLAY_IN_BETWEEN - 1 // (1 ... 6, 7, 8, 9)
					: currentPage - 2; // If neither or the two conditions are true, we are traversing the middle pages and show the current page and one to both sides of it (1 ... 3, 4, 5 ... 9)
	}
</script>

<nav>
	<div class="per-page-container">
		<label for="per-page">Resultados por página</label>
		<select
			name="per-page"
			on:change={(e) => onPerPageChange(Number(e.currentTarget?.value))}
			id="per-page"
		>
			<option selected={perPage == 9} value="9">9</option>
			<option selected={perPage == 18} value="18">18</option>
			<option selected={perPage == 27} value="27">27</option>
		</select>
	</div>
	{#if totalPages > 1}
		<div class="flex-center">
			<!-- Previous page button -->
			{#if currentPage !== 1 && totalPages >= 2}
				<button on:click={() => onPageClick(currentPage - 1)} style="width: 96px;"
					>Pág. anterior</button
				>
			{/if}

			<!-- Page 1 button -->
			<button
				class={currentPage === 1 ? 'active-page' : ''}
				disabled={currentPage === 1}
				on:click={() => onPageClick(1)}>1</button
			>

			<!-- Rest of pages buttons -->
			{#if totalPages > PAGES_TO_DISPLAY_IN_BETWEEN + 2}
				{#if currentPage >= 1 + PAGES_TO_DISPLAY_IN_BETWEEN}
					<span>...</span>
				{/if}

				{#each pagesArray.slice(pagesSliceIndex, pagesSliceIndex + 3) as i}
					<button
						class={currentPage === i ? 'active-page' : ''}
						disabled={currentPage === i}
						on:click={() => onPageClick(i)}>{i}</button
					>
				{/each}

				{#if currentPage <= totalPages - PAGES_TO_DISPLAY_IN_BETWEEN}
					<span>...</span>
				{/if}
			{:else}
				{#each Array.from(Array(totalPages - 2)).keys() as i}
					<button
						class={currentPage === i + 2 ? 'active-page' : ''}
						disabled={currentPage === i + 2}
						on:click={() => onPageClick(i + 2)}>{i + 2}</button
					>
				{/each}
			{/if}

			<!-- Last page button -->
			<button
				class={currentPage === totalPages ? 'active-page' : ''}
				disabled={currentPage === totalPages}
				on:click={() => onPageClick(totalPages)}>{totalPages}</button
			>

			<!-- Next page button -->
			{#if currentPage !== totalPages && totalPages > 2}
				<button on:click={() => onPageClick(currentPage + 1)} style="width: 96px;"
					>Pág. siguiente</button
				>
			{/if}
		</div>
	{/if}
</nav>

<style lang="scss">
	@import '../../sass/variables.scss';

	nav {
		align-items: center;
		display: flex;

		@media (max-width: $tabletBreakpoint) {
			flex-direction: column-reverse;

			*:not(:last-child) {
				margin-right: 0px;
			}
		}
	}

	button {
		background-color: transparent;
		color: var(--text);
		font-size: 1em;
		padding: 1px 0;
		width: 32px;

		&:hover:not(:disabled) {
			background-color: var(--btn-primary-hover);
			color: var(--selection-color);
		}
	}

	.active-page {
		background-color: var(--btn-primary-active);
		color: var(--selection-color);
	}

	.per-page-container {
		margin-right: 24px;

		label {
			margin-right: 0;
		}

		@media (max-width: $tabletBreakpoint) {
			align-items: center;
			display: flex;
			justify-content: center;
			margin-right: 0px;
			margin-top: var(--space-lg);

			label {
				margin-right: 12px;
			}
		}
	}

	select {
		@media (max-width: $tabletBreakpoint) {
			height: 32px;
			width: 48px;
		}
	}
</style>
