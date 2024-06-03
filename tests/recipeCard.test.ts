import { expect, test } from '@playwright/test';

test.describe('recipe card', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('can save recipe to local storage', async ({ page }) => {
		const recipeCards = await page.getByTestId('recipe-card').all();
		const saveRecipeButton = recipeCards[0].getByRole('button', { name: 'Guardar receta' });
        await saveRecipeButton.click();

		const recipesSaved = await page.evaluate(() => window.localStorage.getItem('recipesSaved'));
		const recipesSavedParsed = recipesSaved ? JSON.parse(recipesSaved) : [];

		expect(recipesSavedParsed).toHaveLength(1);
	});
});
