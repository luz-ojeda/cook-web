function convertFractionToDecimal(fraction: string): number {
	const parts = fraction.split('/');
	if (parts.length === 2) {
		const numerator = parseFloat(parts[0]);
		const denominator = parseFloat(parts[1]);
		return numerator / denominator;
	}
	return parseFloat(fraction);
}

function scaleIngredients(ingredients: string[], newServings: number, originalServings: number) {
	const regex = /(\d+\/\d+|\d+(\.\d+)?|\d+)\s?([\w\s]+)?/;
	const updatedIngredients = ingredients.map((ingredient) => {
		const match = ingredient.match(regex);
		if (match) {
			const quantity = match[1].includes('/')
				? convertFractionToDecimal(match[1])
				: Number(match[1]);
			const scaledQuantity = parseFloat(((quantity * newServings) / originalServings).toFixed(2));
			const ingredientWords = match[3];
			return `${scaledQuantity} ${ingredientWords}`;
		}

		// Ingredient has no numbers, return as is
		return ingredient;
	});
	return updatedIngredients;
}

export { scaleIngredients };
