<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;
	export let onPageClick: (page: number) => void;

	const PAGES_IN_BETWEEN = 3;
	let pagesArray = Array.from({ length: totalPages }, (_, x) => x + 1);
	let sliceIndex = 1;

	// Dynamically changing the starting index of a slice of the array with all pages lets us correctly display the middle pages
	$: {
		sliceIndex =
			currentPage <= PAGES_IN_BETWEEN // Page is less than or equal to 3, we slice the array from 1 to 4
				? 1 // (1, 2, 3, 4, ... 9)
				: totalPages < currentPage + PAGES_IN_BETWEEN // The total pages are less than the page + 3, we are near the end and will slice from totalPages - 3 - 1 (account for length)
					? totalPages - PAGES_IN_BETWEEN - 1 // (1 ... 6, 7, 8, 9)
					: currentPage - 2; // If neither or the two conditions are true, we are traversing the middle pages and show the current page and one to both sides of it (1 ... 3, 4, 5 ... 9)
	}
</script>

<nav class="flex-center" style="height: 48px">
	<!-- Previous page button -->
	{#if currentPage !== 1 && totalPages >= 2}
		<button on:click={() => onPageClick(currentPage - 1)} style="width: 96px;">Pág. anterior</button
		>
	{/if}

	<!-- Page 1 button -->
	<button
		class={currentPage === 1 ? 'active-page' : ''}
		disabled={currentPage === 1}
		on:click={() => onPageClick(1)}>1</button
	>

	<!-- Rest of pages buttons -->
	{#if totalPages > PAGES_IN_BETWEEN + 2}
		{#if currentPage >= 1 + PAGES_IN_BETWEEN}
			<span>...</span>
		{/if}

		{#each pagesArray.slice(sliceIndex, sliceIndex + 3) as i}
			<button
				class={currentPage === i ? 'active-page' : ''}
				disabled={currentPage === i}
				on:click={() => onPageClick(i)}>{i}</button
			>
		{/each}

		{#if currentPage <= totalPages - PAGES_IN_BETWEEN}
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
</nav>

<style lang="scss">
	@import '../../sass/colors.scss';
	nav {
		*:not(:last-child) {
			margin-right: 6px;
		}
	}

	button {
		background-color: transparent;
		border-radius: 8px;
		font-size: 1.125rem;
		padding: 1px 0;
		width: 32px;

		&:hover:not(:disabled) {
			background-color: $lightestPrimaryColor;
		}
	}

	.active-page {
		background-color: $darkPrimaryColor;
		color: $grey100;
	}
</style>
