import { redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.isAdmin) redirect(303, '/');

	const universes = await db.orm.public.Universe
		.orderBy((u) => u.createdAt.desc())
		.all();

	const eras = await db.orm.public.Era
		.orderBy((e) => e.orderIndex.asc())
		.all();

	return { universes, eras };
};

export const actions = {
	// --- UNIVERSE ACTIONS ---
	createUniverse: async ({ request }) => {
		const data = await request.formData();

		await db.orm.public.Universe.create({
			name: data.get('name') as string,
			slug: data.get('slug') as string,
			description: (data.get('description') as string) || null,
			coverImage: (data.get('coverImage') as string) || null,
		});

		return { success: true };
	},

	updateUniverse: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Universe.where({ id }).update({
			name: data.get('name') as string,
			slug: data.get('slug') as string,
			description: (data.get('description') as string) || null,
			coverImage: (data.get('coverImage') as string) || null,
		});

		return { success: true };
	},

	deleteUniverse: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Universe.where({ id }).delete();

		return { success: true };
	},

	// --- ERA ACTIONS ---
	createEra: async ({ request }) => {
		const data = await request.formData();

		await db.orm.public.Era.create({
			name: data.get('name') as string,
			slug: data.get('slug') as string,
			description: (data.get('description') as string) || null,
			orderIndex: parseFloat(data.get('orderIndex') as string) || 0,
			universeId: data.get('universeId') as string,
		});

		return { success: true };
	},

	updateEra: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Era.where({ id }).update({
			name: data.get('name') as string,
			slug: data.get('slug') as string,
			description: (data.get('description') as string) || null,
			orderIndex: parseFloat(data.get('orderIndex') as string) || 0,
			universeId: data.get('universeId') as string,
		});

		return { success: true };
	},

	deleteEra: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Era.where({ id }).delete();

		return { success: true };
	}
};
