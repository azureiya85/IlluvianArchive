import { db } from '#lib/server/db.ts';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	let settings = await db.orm.public.SiteSettings.where({ id: 'global' }).first();

	if (!settings) {
		settings = await db.orm.public.SiteSettings.create({
			id: 'global',
			siteTitle: 'Illuvian Archive',
			ownerName: 'Ryhze'
		});
	}

	const faqs = await db.orm.public.FaqItem
		.where({ settingsId: 'global' })
		.orderBy(f => f.orderIndex.asc())
		.all();

	return {
		settings: {
			siteTitle: settings.siteTitle,
			ownerName: settings.ownerName,
			contactEmail: settings.contactEmail,
			heroBanner: settings.heroBanner,
			logo: settings.logo,
			aboutContent: settings.aboutContent,
			ownerCoverImage: settings.ownerCoverImage
		},
		faqs: faqs.map(f => ({
			id: f.id,
			question: f.question,
			answer: f.answer,
			orderIndex: f.orderIndex
		}))
	};
};

export const actions: Actions = {
	updateBranding: async ({ request }) => {
		const data = await request.formData();
		const siteTitle = data.get('siteTitle') as string;
		const logo = data.get('logo') as string;
		const heroBanner = data.get('heroBanner') as string;
		const ownerCoverImage = data.get('ownerCoverImage') as string;

		await db.orm.public.SiteSettings
			.where({ id: 'global' })
			.update({
				siteTitle,
				logo: logo || null,
				heroBanner: heroBanner || null,
				ownerCoverImage: ownerCoverImage || null
			});

		return { success: true };
	},

	updateAbout: async ({ request }) => {
		const data = await request.formData();
		const ownerName = data.get('ownerName') as string;
		const contactEmail = data.get('contactEmail') as string;
		const aboutContent = data.get('aboutContent') as string;

		// Prisma 8 chained update
		await db.orm.public.SiteSettings
			.where({ id: 'global' })
			.update({
				ownerName: ownerName || null,
				contactEmail: contactEmail || null,
				aboutContent: aboutContent || null
			});

		return { success: true };
	},

	createFaq: async ({ request }) => {
		const data = await request.formData();
		const question = data.get('question') as string;
		const answer = data.get('answer') as string;
		const orderIndex = Number(data.get('orderIndex'));

		// Prisma 8 direct create
		await db.orm.public.FaqItem.create({
			question,
			answer,
			orderIndex,
			settingsId: 'global'
		});

		return { success: true };
	},

	deleteFaq: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		// Prisma 8 chained delete
		await db.orm.public.FaqItem
			.where({ id })
			.delete();

		return { success: true };
	}
};
