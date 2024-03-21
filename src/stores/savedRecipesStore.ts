import { writable } from 'svelte/store'

export const savedRecipesIdsStore = writable<string[]>([])