import type { HandleServerError } from '@sveltejs/kit';
import { logRecipesError } from './errorLogging';
import { MESSAGES } from './constants';
import type { ApiError } from '$lib/types/ApiError';

export const handleError: HandleServerError = async ({ event, error }) => {
	if (event.route.id === '/' || event.route.id === '/recetas') {
		logRecipesError(event.route.id, error);
	}

	const apiError = error as ApiError;
	try {
		let message = '';
		if (apiError.status?.toString().startsWith('5')) {
			message = MESSAGES.SERVER_ERROR;
		} else if (apiError.status === 404) {
			message = MESSAGES.PAGE_NOT_FOUND;
		}
		return { message };
	} catch (error) {
		return { message: MESSAGES.SERVER_ERROR };
	}
};
