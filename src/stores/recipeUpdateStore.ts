import type { RecipeFormDataElems } from '$lib/types/RecipeFormData';
import { get, writable } from 'svelte/store';

const initialFormElems = {
	name: null,
	ingredients: [],
	summary: null,
	instructions: null,
	preparationTime: null,
	cookingTime: null,
	servings: null,
	difficulty: [],
	vegetarian: null
};

function updateRecipeFormData() {
	const store = writable<RecipeFormDataElems>(initialFormElems);

	function onIngredientInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!e.target) return;

		const formDataElems = get(store);

		const id = Number(e.currentTarget.id);
		const value = e.currentTarget.value;

		if (formDataElems.ingredients[id] !== undefined) {
			formDataElems.ingredients[id] = value;
		} else {
			formDataElems.ingredients.push(value);
		}

		store.update((formElems) => {
			return {
				...formElems,
				ingredients: formDataElems.ingredients
			};
		});
	}

	return {
		subscribe: store.subscribe,
		set: store.set,
		update: store.update,
		addIngredient: () =>
			store.update((formDataElems) => {
				return {
					...formDataElems,
					ingredients: [...formDataElems.ingredients, '']
				};
			}),
		onIngredientInput,
		removeIngredient: (ingToRemove: string, index: number) =>
			store.update((formDataElems) => {
				const newIngredients = formDataElems.ingredients.filter((ingredient, i) => {
					if (typeof ingToRemove === 'string' && ingToRemove.trim() !== '') {
						return ingToRemove !== ingredient && index !== i;
					}
					// Handle case of user deleting empty inputs
					// If ingredient input value is not a string or empty, just check the index
					return index !== i;
				});

				return {
					...formDataElems,
					ingredients: newIngredients
				};
			})
	};
}

export const formData = updateRecipeFormData();
