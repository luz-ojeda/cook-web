import type { HandleServerError } from '@sveltejs/kit';
import { logRecipesError } from './utils/errorLogging';
import { MESSAGES } from "./utils/constants";

export const handleError: HandleServerError = async ({ event, error }) => {
	if (event.route.id === '/' || event.route.id === '/recetas') {
		logRecipesError(event.route.id, error);
	}

	return {
		message: MESSAGES.SERVER_ERROR
	};
};
