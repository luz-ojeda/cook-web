import { browser } from '$app/environment';
import type { RecipeCreationFormData, FormDataElems } from '$lib/types/RecipeCreationFormStore';
import { get, writable } from 'svelte/store';
import { LOCAL_STORAGE_KEYS } from '../constants';

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

function createRecipeCreationFormData() {
	const store = writable<FormDataElems>(initialFormElems);

	let formValues: RecipeCreationFormData = {
		name: '',
		summary: '',
		instructions: '',
		ingredients: [],
		preparationTime: '',
		cookingTime: '',
		servings: '',
		difficulty: '',
		vegetarian: false
	};

	function saveFormToLocalStorage(form: RecipeCreationFormData) {
		if (browser) {
			const f = JSON.stringify(form);
			window.localStorage.setItem(LOCAL_STORAGE_KEYS.RECIPE_CREATION_FORM, f);
		}
	}

	function eventListenerCallback() {
		const formDataElems = get(store);

		const form: RecipeCreationFormData = {
			...formValues,
			name: formDataElems.name?.value ?? '',
			summary: formDataElems.summary?.value ?? '',
			instructions: formDataElems.instructions?.value ?? '',
			preparationTime: formDataElems.preparationTime?.value ?? '',
			cookingTime: formDataElems.cookingTime?.value ?? '',
			servings: formDataElems.servings?.value ?? '',
			vegetarian: Boolean(formDataElems.vegetarian?.checked)
		};

		if (formDataElems.difficulty)
			formDataElems.difficulty.forEach((e) => {
				if (e.checked) form.difficulty = e.value;
			});

		saveFormToLocalStorage(form);
	}

	function addEventListeners() {
		store.update((formDataElems) => {
			// Attach an event listener to each input to persist data to Local Storage on input change
			Object.entries(formDataElems).forEach(([formLabel, htmlElement]) => {
				if (htmlElement instanceof HTMLElement) {
					htmlElement.addEventListener('input', eventListenerCallback, false);
				} else if (formLabel === 'difficulty') {
					// Assign event listener to each one of the 3 radio buttons
					htmlElement?.forEach((el) => {
						(el as HTMLElement).addEventListener('input', eventListenerCallback, false);
					});
				}
			});
			return formDataElems;
		});
	}

	function ingredientsEventListenerCallback(
		e: Event & { currentTarget: EventTarget & HTMLInputElement }
	) {
		if (!e.target) return;

		const formDataElems = get(store);
		const id = Number(e.currentTarget.id);
		const value = e.currentTarget.value;

		if (formDataElems.ingredients[id] !== undefined) {
			formDataElems.ingredients[id] = value;
		} else {
			formDataElems.ingredients.push(value);
		}

		const form: RecipeCreationFormData = {
			...formValues,
			ingredients: formDataElems.ingredients
		};

		saveFormToLocalStorage(form);
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
		addEventListeners,
		addIngredient: () =>
			store.update((formDataElems) => {
				return {
					...formDataElems,
					ingredients: [...formDataElems.ingredients, '']
				};
			}),
		eventListenerCallback,
		getFormDataFromLocalStorage: () => {
			if (!browser) return;

			const localStorageFormData = window.localStorage.getItem(LOCAL_STORAGE_KEYS.RECIPE_CREATION_FORM);
			if (!localStorageFormData) return;

			const cachedFormData: RecipeCreationFormData = JSON.parse(localStorageFormData);
			if (!cachedFormData) return;

			formValues = cachedFormData;
		},
		ingredientsEventListenerCallback,
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

				saveFormToLocalStorage({ ...formValues, ingredients: newIngredients });

				return {
					...formDataElems,
					ingredients: newIngredients
				};
			}),
		updateInputsWithFormData: () =>
			store.update((formDataElems) => {
				// Loop over name: HTMLInputElement, summary: HTMLTextAreaElement, etc. and get its value from the localstorage form data using the key ('name', 'summary', ...)
				Object.entries(formDataElems).forEach(([formLabel, elem]) => {
					if (elem instanceof HTMLElement) {
						if (elem instanceof HTMLInputElement && formLabel === 'vegetarian') {
							elem.checked = formValues[formLabel];
						} else {
							elem.value = formValues[formLabel].toString() ?? '';
						}
					} else if (formLabel === 'difficulty') {
						elem?.forEach((e) => {
							if (e instanceof HTMLInputElement && e.value === formValues[formLabel]) {
								e.checked = true;
							}
						});
					}
				});
				return {
					...formDataElems,
					ingredients: formValues.ingredients
				};
			})
	};
}

export const formData = createRecipeCreationFormData();
