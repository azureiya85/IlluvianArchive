import { redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.isAdmin) redirect(303, '/');

	const books = await db.orm.public.Book.orderBy((b) => b.createdAt.desc()).all();
	const tags = await db.orm.public.Tag.orderBy((t) => t.name.asc()).all();
	const universes = await db.orm.public.Universe.orderBy((u) => u.name.asc()).all();
	const eras = await db.orm.public.Era.orderBy((e) => e.orderIndex.asc()).all();

	return { books, tags, universes, eras };
};

type StoryType = 'NOVEL' | 'NOVELLA' | 'SHORT_FICTION' | 'WEB_SERIAL';
type PublishStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
type ReadingLevel = 'VERY_EASY' | 'EASY' | 'FAIRLY_EASY' | 'STANDARD' | 'FAIRLY_DIFFICULT' | 'DIFFICULT' | 'VERY_DIFFICULT';

export const actions = {
	createBook: async ({ request }) => {
		const data = await request.formData();

		const publishedAtRaw = data.get('publishedAt') as string;
		const readingEaseRaw = data.get('readingEase') as string;

		await db.orm.public.Book.create({
			title: data.get('title') as string,
			slug: data.get('slug') as string,
			description: data.get('description') as string,
			author: data.get('author') as string,
			type: data.get('type') as StoryType,
			status: data.get('status') as PublishStatus,
			coverImage: (data.get('coverImage') as string) || null,
			wordCount: parseInt(data.get('wordCount') as string) || 0,
			readingEase: readingEaseRaw ? parseFloat(readingEaseRaw) : null,
			readingLevel: (data.get('readingLevel') as ReadingLevel) || null,
			publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : null,
			universeId: (data.get('universeId') as string) || null,
			eraId: (data.get('eraId') as string) || null,
		});

		return { success: true };
	},

	updateBook: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		const publishedAtRaw = data.get('publishedAt') as string;
		const readingEaseRaw = data.get('readingEase') as string;

		await db.orm.public.Book.where({ id }).update({
			title: data.get('title') as string,
			slug: data.get('slug') as string,
			description: data.get('description') as string,
			author: data.get('author') as string,
			type: data.get('type') as StoryType,
			status: data.get('status') as PublishStatus,
			coverImage: (data.get('coverImage') as string) || null,
			wordCount: parseInt(data.get('wordCount') as string) || 0,
			readingEase: readingEaseRaw ? parseFloat(readingEaseRaw) : null,
			readingLevel: (data.get('readingLevel') as ReadingLevel) || null,
			publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : null,
			universeId: (data.get('universeId') as string) || null,
			eraId: (data.get('eraId') as string) || null,
		});

		return { success: true };
	},

	deleteBook: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		await db.orm.public.Book.where({ id }).delete();
		return { success: true };
	},

	// --- TAG ACTIONS ---
	createTag: async ({ request }) => {
		const data = await request.formData();
		await db.orm.public.Tag.create({
			name: data.get('name') as string,
			slug: data.get('slug') as string,
		});
		return { success: true };
	},

	deleteTag: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		await db.orm.public.Tag.where({ id }).delete();
		return { success: true };
	}
};
