import type { Recipe } from "$lib/types/Recipe"
import { writable } from 'svelte/store'

export const recipes = writable<Recipe[]>([])