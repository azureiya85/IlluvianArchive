import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import { ADMIN_EMAIL, ADMIN_PASSWORD_HASH, SESSION_SECRET } from '$app/env/private';

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // seconds

const sign = (payload: string) =>
	createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

// Hash both sides to equal length first so timingSafeEqual is safe and length-blind.
function safeEqual(a: string, b: string) {
	const digest = (s: string) => createHmac('sha256', 'compare').update(s).digest();
	return timingSafeEqual(digest(a), digest(b));
}

export function verifyCredentials(email: string, password: string): boolean {
	const [salt, hash] = ADMIN_PASSWORD_HASH.split(':');
	if (!salt || !hash) return false;

	const passwordOk = safeEqual(scryptSync(password, salt, 64).toString('hex'), hash);
	const emailOk = safeEqual(email.trim().toLowerCase(), ADMIN_EMAIL.trim().toLowerCase());
	return passwordOk && emailOk; // evaluate both so timing doesn't reveal which was wrong
}

export function createSession(): string {
	const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
	return `${expires}.${sign(expires)}`;
}

export function isValidSession(token: string | undefined): boolean {
	if (!token) return false;
	const [expires, signature] = token.split('.');
	if (!expires || !signature) return false;
	return safeEqual(signature, sign(expires)) && Number(expires) > Date.now();
}
