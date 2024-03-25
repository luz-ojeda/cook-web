<script lang="ts">
	export let totalPages: number;
	export let currentPage: number;

	const PAGES_IN_BETWEEN = 3;
	let pagesArray = Array.from({ length: totalPages }, (_, x) => x + 1);
	let sliceIndex = 1;

    // Dynamically changing the starting index of the middle pages based on the
    // current page lets us 
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
	{#if currentPage !== 1}
		<button style="width: 96px;">Página anterior</button>
	{/if}

	<button disabled={currentPage === 1}>1</button>

	{#if totalPages > PAGES_IN_BETWEEN + 2}
		{#if currentPage >= 1 + PAGES_IN_BETWEEN}
			<span>...</span>
		{/if}

		{#each pagesArray.slice(sliceIndex, sliceIndex + 3) as i}
			<button disabled={currentPage === i}>{i}</button>
		{/each}

		{#if currentPage <= totalPages - PAGES_IN_BETWEEN}
			<span>...</span>
		{/if}
	{:else}
		{#each Array.from(Array(totalPages - 2)).keys() as i}
			<button disabled={currentPage === 2}>{i + 2}</button>
		{/each}
	{/if}

	<button disabled={currentPage === totalPages}>{totalPages}</button>

	{#if currentPage !== totalPages}
		<button style="width: 96px;">Página siguiente</button>
	{/if}
</nav>

<style>
	button {
		width: 32px;
	}
</style>
