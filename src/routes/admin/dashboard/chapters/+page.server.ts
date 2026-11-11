import { redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.isAdmin) redirect(303, '/');

	const books = await db.orm.public.Book.orderBy((b) => b.title.asc()).all();

	const arcs = await db.orm.public.Arc
		.orderBy((a) => a.orderIndex.asc())
		.all();

	const chapters = await db.orm.public.Chapter
		.orderBy((c) => c.orderIndex.asc())
		.all();

	return { chapters, arcs, books };
};

type PublishStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export const actions: Actions = {
	// --- CHAPTER ACTIONS ---
	createChapter: async ({ request }) => {
		const data = await request.formData();

		const publishedAtRaw = data.get('publishedAt') as string;
		const wordCountRaw = data.get('wordCount') as string;
		const arcIdRaw = data.get('arcId') as string;

		await db.orm.public.Chapter.create({
			title: data.get('title') as string,
			slug: data.get('slug') as string,
			summary: (data.get('summary') as string) || null,
			content: data.get('content') as string,
			orderIndex: parseFloat(data.get('orderIndex') as string) || 0,
			status: data.get('status') as PublishStatus,
			wordCount: wordCountRaw ? parseInt(wordCountRaw) : 0,
			publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : null,
			bookId: data.get('bookId') as string,
			arcId: arcIdRaw ? arcIdRaw : null,
		});

		return { success: true };
	},

	updateChapter: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		const publishedAtRaw = data.get('publishedAt') as string;
		const wordCountRaw = data.get('wordCount') as string;
		const arcIdRaw = data.get('arcId') as string;

		await db.orm.public.Chapter.where({ id }).update({
			title: data.get('title') as string,
			slug: data.get('slug') as string,
			summary: (data.get('summary') as string) || null,
			content: data.get('content') as string,
			orderIndex: parseFloat(data.get('orderIndex') as string) || 0,
			status: data.get('status') as PublishStatus,
			wordCount: wordCountRaw ? parseInt(wordCountRaw) : 0,
			publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : null,
			bookId: data.get('bookId') as string,
			arcId: arcIdRaw ? arcIdRaw : null,
		});

		return { success: true };
	},

	deleteChapter: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Chapter.where({ id }).delete();

		return { success: true };
	},

	// --- ARC ACTIONS ---
	createArc: async ({ request }) => {
		const data = await request.formData();

		await db.orm.public.Arc.create({
			title: data.get('title') as string,
			slug: data.get('slug') as string,
			description: (data.get('description') as string) || null,
			coverImage: (data.get('coverImage') as string) || null,
			orderIndex: parseFloat(data.get('orderIndex') as string) || 0,
			bookId: data.get('bookId') as string,
		});

		return { success: true };
	},

	updateArc: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Arc.where({ id }).update({
			title: data.get('title') as string,
			slug: data.get('slug') as string,
			description: (data.get('description') as string) || null,
			coverImage: (data.get('coverImage') as string) || null,
			orderIndex: parseFloat(data.get('orderIndex') as string) || 0,
			bookId: data.get('bookId') as string,
		});

		return { success: true };
	},

	deleteArc: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.orm.public.Arc.where({ id }).delete();

		return { success: true };
	}
};
