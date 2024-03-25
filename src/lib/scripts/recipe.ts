function scaleServings(ingredients: string[], newServings: number, originalServings: number) {
	const regex = /\d+(\.\d+)?/;
	const updatedIngredients = ingredients.map((ingredient) => {
		const numberMatch = ingredient.match(regex);
		if (numberMatch) {
			const number = parseFloat(numberMatch[0]);
			const scaledNumber = parseFloat(((number * newServings) / originalServings).toFixed(2));
			return ingredient.replace(regex, scaledNumber.toString());
		}
		return ingredient;
	});
	return updatedIngredients;
}

export { scaleServings };
