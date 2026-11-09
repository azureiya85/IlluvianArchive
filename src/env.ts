import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: {},
	ADMIN_EMAIL: {},
	ADMIN_PASSWORD_HASH: {},
	SESSION_SECRET: {}
});
