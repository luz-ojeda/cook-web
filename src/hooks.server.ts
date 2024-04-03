import type { Handle, HandleServerError } from '@sveltejs/kit';
import { logRecipesError } from './errorLogging';
import { MESSAGES } from './constants';
import type { ApiError } from '$lib/types/ApiError';

const securityHeaders = {
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
	'Strict-Transport-Security': 'max-age=31536000',
    // [...],
	'Referrer-Policy': 'no-referrer-when-downgrade',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY'
}

export const handleError: HandleServerError = async ({ event, error }) => {
	if (event.route.id === '/' || event.route.id === '/recetas') {
		logRecipesError(event.route.id, error);
	}

	const apiError = error as ApiError;
	try {
		let message = '';
		if (apiError.status === 404) {
			message = MESSAGES.PAGE_NOT_FOUND;
		} else {
			message = MESSAGES.SERVER_ERROR;
			return { message };
		}
	} catch (error) {
		return { message: MESSAGES.SERVER_ERROR };
	}
};

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    Object.entries(securityHeaders).forEach(
        ([header, value]) => response.headers.set(header, value)
    );

    return response;
}