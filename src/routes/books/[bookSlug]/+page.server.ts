import { error } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const book = await db.orm.public.Book
		.where({ slug: params.bookSlug, status: 'PUBLISHED' })
		.include('universe')
		.include('era')
		.include('tags')
		.first();

	if (!book) throw error(404, { message: 'Book not found' });

	const tagIds = book.tags.map(bt => bt.tagId);
	let resolvedTags: { id: string, name: string }[] = [];
	if (tagIds.length > 0) {
		resolvedTags = await db.orm.public.Tag.where((t) => t.id.in(tagIds)).all();
	}

	const chapters = await db.orm.public.Chapter
		.where({ bookId: book.id, status: 'PUBLISHED' })
		.include('arc')
		.all();

	const totalWordCount = chapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0);

	return {
		book: {
			slug: book.slug,
			title: book.title,
			type: book.type,
			description: book.description,
			coverImage: book.coverImage,
			universeName: book.universe?.name,
			universeDesc: book.universe?.description,
			eraName: book.era?.name,
			eraDesc: book.era?.description,
			readingEase: book.readingEase,
			readingLevel: book.readingLevel,
			totalWordCount,
			tags: resolvedTags
		},
		chapters: chapters.map(ch => ({
			id: ch.id,
			title: ch.title,
			slug: ch.slug,
			arcName: ch.arc?.title || null,
			arcDesc: ch.arc?.description || null,
			publishedAt: ch.publishedAt
		}))
	};
};
