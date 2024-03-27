import { writable } from "svelte/store";

export const burgerMenuStore = writable<boolean>(false);