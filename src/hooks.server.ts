import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { SESSION_COOKIE, isValidSession } from '#lib/server/auth.ts';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const inAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
	const isLogin = pathname === '/admin/login';

	event.locals.isAdmin = isValidSession(event.cookies.get(SESSION_COOKIE));

	if (inAdmin && !isLogin && !event.locals.isAdmin) redirect(303, '/'); // look like a normal 404-ish bounce
	if (isLogin && event.locals.isAdmin) redirect(303, '/admin/dashboard');

	return resolve(event);
};
