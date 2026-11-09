import { fail, redirect } from '@sveltejs/kit';
import {
	SESSION_COOKIE,
	SESSION_MAX_AGE,
	createSession,
	verifyCredentials
} from '#lib/server/auth.ts';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '');
		const password = String(form.get('password') ?? '');

		await new Promise((r) => setTimeout(r, 400)); // cheap brute-force slowdown

		if (!verifyCredentials(email, password)) {
			return fail(401, { incorrect: true, email });
		}

		cookies.set(SESSION_COOKIE, createSession(), {
			path: '/',
			sameSite: 'lax',
			maxAge: SESSION_MAX_AGE
		});
		redirect(303, '/admin/dashboard');
	}
};
