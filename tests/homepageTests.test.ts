import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('can see list of recipes in homepage', async ({ page }) => {
		const recipeCardsCount = await page.getByTestId('recipe-card').count();

		expect(recipeCardsCount).toEqual(4);
	});

	test('can search for recipes in the footer', async ({ page }) => {
		const footerSearchBox = page.getByRole('searchbox', { name: 'Buscar' });
		await footerSearchBox.fill('pasta');
		await page.keyboard.press('Enter');
		await page.waitForURL('**/recetas?nombre=pasta');

		const recipeCardsCount = await page.getByRole('heading', { name: 'pasta' }).count();

		expect(recipeCardsCount).toBeGreaterThan(0);
	});

	test("clicking on recipe card takes user to recipe's page", async ({ page }) => {
		const recipeCard = page.getByTestId('recipe-card').first();
		const recipeName = await recipeCard.getByRole('heading').innerText();

		await recipeCard.click();
		await page.waitForURL('**/recetas/**');

		const recipeHeading = await page.getByRole('heading', { name: recipeName }).innerText();
		expect(recipeHeading).toEqual(recipeName);
	});
});
