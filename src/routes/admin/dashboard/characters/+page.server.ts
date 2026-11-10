import { redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Guard against unauthorized access
	if (!locals.isAdmin) redirect(303, '/');

	// Fetch characters and universes using Prisma 8 syntax
	const characters = await db.orm.public.Character
		.orderBy((c) => c.createdAt.desc())
		.all();

	const universes = await db.orm.public.Universe
		.orderBy((u) => u.name.asc())
		.all();

	return { characters, universes };
};

export const actions = {
	createCharacter: async ({ request }) => {
		const data = await request.formData();

		const universeId = data.get('universeId') as string;

		await db.orm.public.Character.create({
			name: data.get('name') as string,
			description: (data.get('description') as string) || null,
			image: (data.get('image') as string) || null,
			universeId: universeId ? universeId : null,
		});

		return { success: true };
	},

	updateCharacter: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const universeId = data.get('universeId') as string;

		await db.orm.public.Character.where({ id }).update({
			name: data.get('name') as string,
			description: (data.get('description') as string) || null,
			image: (data.get('image') as string) || null,
			universeId: universeId ? universeId : null,
		});

		return { success: true };
	},

	deleteCharacter: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Character.where({ id }).delete();

		return { success: true };
	}
};
