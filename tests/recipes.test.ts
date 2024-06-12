import { test, expect } from '@playwright/test';

test.describe('recipes page', () => {
	test('should change results per page correctly', async ({ page }) => {
		await page.goto('/recetas');

		const perPageSelect = page.getByRole('combobox', { name: 'Resultados por página' }).first();

		// Check if default value is 9
		expect(perPageSelect).toHaveValue('9');

		// Change results per page to 18
		await perPageSelect.selectOption({ label: '18' });
		expect(perPageSelect).toHaveValue('18');

		await expect(page.getByTestId('recipe-card')).toHaveCount(18)
		
		// Change results per page to 27
		await perPageSelect.selectOption({ label: '27' });
		expect(perPageSelect).toHaveValue('27');

		await expect(page.getByTestId('recipe-card')).toHaveCount(27)
	});

	test('should navigate to the next and previous pages correctly', async ({ page }) => {
		await page.goto('/recetas');

		await page.getByRole('button', { name: 'Pág. siguiente' }).click();

		await expect(page.locator('.active-page')).toHaveText('2')

		// Check if query parameter was updated
		await page.waitForURL("/recetas?pagina=2")
        
		// Click previous page button
		await page.getByRole('button', { name: 'Pág. anterior' }).click();
        
		await expect(page.locator('.active-page')).toHaveText('1')
		await page.waitForURL("/recetas?pagina=1")
	});

	test('should display correct number of recipes and highlight correct page when navigating with query parameters', async ({
		page
	}) => {
		await page.goto('/recetas?pagina=2&por_pagina=18');

		const recipeCards = await page.getByTestId('recipe-card').all();

		expect(recipeCards.length).toBe(18);
		expect(await page.locator('.active-page').innerText()).toBe('2');
	});

	test('should reset to page 1 when changing results per page', async ({ page }) => {
		await page.goto('/recetas');

		await page.getByRole('button', { name: '3' }).click();

		// Verify URL query parameter is updated to pagina=3
        await page.waitForURL("/recetas?pagina=3")

		const perPageSelect = page.getByRole('combobox', { name: 'Resultados por página' }).first();
		await perPageSelect.selectOption({ label: '27' });

		// Check that the page has been reset to 1
		await expect(page.locator('.active-page')).toHaveText('1')

		// Verify URL query parameter is updated to pagina=1 and por_pagina=27
		await page.waitForURL("/recetas?pagina=1&por_pagina=27")
	});

	test('should preserve state when navigating away and returning using browser buttons', async ({ page }) => {
		await page.goto('/recetas');
	
		await page.getByRole('button', { name: 'Pág. siguiente' }).click();
	
		await page.waitForURL("/recetas?pagina=2");
		await expect(page.locator('.active-page')).toHaveText('2')
	
		await page.getByRole('button', { name: 'Pág. siguiente' }).click();

		await page.waitForURL("/recetas?pagina=3");
		await expect(page.locator('.active-page')).toHaveText('3')
	
		// Go back using browser's back button
		await page.goBack();
	
		await expect(page.locator('.active-page')).toHaveText('2')
	
		await page.waitForURL("/recetas?pagina=2");
	});
});
