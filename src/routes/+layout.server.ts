import { db } from '#lib/server/db.ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// Fetch the global settings
	const settings = await db.orm.public.SiteSettings.where({ id: 'global' }).first();

	return {
		// Safely fallback to defaults if settings is null
		siteSettings: {
			siteTitle: settings?.siteTitle ?? 'Illuvian Archive',
			heroBanner: settings?.heroBanner ?? null,
			logo: settings?.logo ?? null
		}
	};
};
