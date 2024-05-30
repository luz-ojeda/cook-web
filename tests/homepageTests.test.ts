import { expect, test } from '@playwright/test';

test('user can see list of recipes in homepage', async ({ page }) => {
	await page.goto('/');

	const recipeCardsCount = await page.getByTestId('recipe-card').count();

	expect(recipeCardsCount).toEqual(4);
});
