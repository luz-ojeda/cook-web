import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { logRecipesError } from './errorLogging';
import { MESSAGES } from './constants';
import type { ApiError } from '$lib/types/ApiError';
import { env } from '$env/dynamic/private';

const securityHeaders = {
	'Cross-Origin-Embedder-Policy': 'require-corp',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Strict-Transport-Security': 'max-age=31536000',
	'Referrer-Policy': 'no-referrer-when-downgrade',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY'
};

export const handleError: HandleServerError = async ({ event, error }) => {
	if (event.route.id === '/' || event.route.id === '/recetas') {
		logRecipesError(event.route.id, error);
	}

	const apiError = error as ApiError;

	let message = '';
	if (apiError.status === 404) {
		message = MESSAGES.PAGE_NOT_FOUND;
	} else {
		message = MESSAGES.SERVER_ERROR;
	}
	console.error(error);
	return { message };
};

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const auth = event.request.headers.get('Authorization');

		if (auth !== `Basic ${btoa(env.ADMIN_LOGIN)}`) {
			return new Response('Not authorized', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
				}
			});
		}
	}

	const response = await resolve(event);
	Object.entries(securityHeaders).forEach(([header, value]) => response.headers.set(header, value));

	return response;
};
