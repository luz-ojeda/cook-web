import { browser } from '$app/environment';
import type { RecipeCreationFormData, FormDataElems } from '$lib/types/RecipeCreationFormStore';
import { get, writable } from 'svelte/store';

const LOCAL_STORAGE_FORM_KEY = 'recipeCreationFormData';

const initialFormDataElems = {
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
	const store = writable<FormDataElems>(initialFormDataElems);
	const formElems = get(store);

	let formData: RecipeCreationFormData = {
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
			window.localStorage.setItem(LOCAL_STORAGE_FORM_KEY, f);
		}
	}

	function eventListenerCallback() {
		const form: RecipeCreationFormData = {
			...formData,
			name: formElems.name?.value ?? '',
			summary: formElems.summary?.value ?? '',
			instructions: formElems.instructions?.value ?? '',
			preparationTime: formElems.preparationTime?.value ?? '',
			cookingTime: formElems.cookingTime?.value ?? '',
			servings: formElems.servings?.value ?? '',
			vegetarian: Boolean(formElems.vegetarian?.checked)
		};
		if (formElems.difficulty)
			formElems.difficulty.forEach((e) => {
				if (e.checked) form.difficulty = e.value;
			});

		saveFormToLocalStorage(form);
	}

	function addEventListeners() {
		store.update((formDataElems) => {
			// Attach an event listener to each input to persist data to Local Storage on change
			Object.entries(formDataElems).forEach(([formLabel, htmlElement]) => {
				if (htmlElement instanceof HTMLElement) {
					htmlElement.addEventListener('input', eventListenerCallback, false);
				} else if (formLabel === 'difficulty') {
					// Assign event listener to each one of the 3 radio buttons
					htmlElement?.forEach((el) => {
						el.addEventListener('input', (eventListenerCallback), false);
					});
				}
			});
			return formDataElems;
		});
	}

	return {
		addEventListeners,
		subscribe: store.subscribe,
		set: store.set,
		addIngredientInput: () =>
			store.update((formData) => {
				return {
					...formData,
					ingredients: [...formData.ingredients]
				};
			}),
		removeIngredientInput: (ingredientIndex: number) =>
			store.update((formData) => {
				return {
					...formData,
					ingredients: formData.ingredients.filter((ingredient, index) => index !== ingredientIndex)
				};
			}),
		getFormDataFromLocalStorage: () => {
			if (!browser) return;

			const localStorageFormData = window.localStorage.getItem(LOCAL_STORAGE_FORM_KEY);
			if (!localStorageFormData) return;

			const cachedFormData: RecipeCreationFormData = JSON.parse(localStorageFormData);
			if (!cachedFormData) return;

			formData = cachedFormData;
		},
		updateInputsWithFormData: () =>
			store.update((formDataElems) => {
				// Loop over name: HTMLInputElement, summary: HTMLTextAreaElement, etc. and get its value from the localstorage form data using the key ('name', 'summary', ...)
				Object.entries(formDataElems).forEach(([formLabel, elem]) => {
					if (elem instanceof HTMLElement) {
						if (elem instanceof HTMLInputElement && formLabel === 'vegetarian') {
							elem.checked = formData[formLabel];
						} else {
							elem.value = formData[formLabel].toString() ?? '';
						}
					} else if (formLabel === 'difficulty') {
						elem?.forEach((e) => {
							if (e instanceof HTMLInputElement && e.value === formData[formLabel]) {
								e.checked = true;
							}
						});
					}
				});
				return formDataElems;
			})
	};
}

export const formData = createRecipeCreationFormData();
