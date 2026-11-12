import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Fetch the global site settings including FAQs
	const settings = await db.orm.public.SiteSettings
		.where({ id: 'global' })
		.include('faqs')
		.first();

	// Sort FAQs by orderIndex on the server
	const faqs = settings?.faqs?.sort((a, b) => a.orderIndex - b.orderIndex) || [];

	return {
		settings: {
			ownerName: settings?.ownerName,
			ownerCoverImage: settings?.ownerCoverImage,
			aboutContent: settings?.aboutContent,
			contactEmail: settings?.contactEmail
		},
		faqs: faqs.map(f => ({
			id: f.id,
			question: f.question,
			answer: f.answer,
			orderIndex: f.orderIndex
		}))
	};
};
