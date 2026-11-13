import { error } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { bookSlug, chapterSlug } = params;

	// 1. Fetch Book
	const book = await db.orm.public.Book.where({ slug: bookSlug }).first();
	if (!book) error(404, 'Book not found');

	// 2. Fetch all chapters for this book, ordered by index
	const allChapters = await db.orm.public.Chapter
		.where({ bookId: book.id, status: 'PUBLISHED' })
		.orderBy(c => c.orderIndex.asc())
		.all();

	// 3. Find current chapter
	const currentIndex = allChapters.findIndex(c => c.slug === chapterSlug);
	if (currentIndex === -1) error(404, 'Chapter not found or not published');

	const chapter = allChapters[currentIndex];

	// 4. Determine Previous / Next
	const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
	const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

	// 5. Fetch Arc info
	let arc = null;
	if (chapter.arcId) {
		arc = await db.orm.public.Arc.where({ id: chapter.arcId }).first();
	}

	return {
		book: {
			title: book.title,
			slug: book.slug,
			coverImage: book.coverImage // Passed for the header card
		},
		chapter: {
			title: chapter.title,
			content: chapter.content,
			summary: chapter.summary,
			wordCount: chapter.wordCount
		},
		arc: arc ? { title: arc.title } : null,
		prevChapter: prevChapter ? { title: prevChapter.title, slug: prevChapter.slug } : null,
		nextChapter: nextChapter ? { title: nextChapter.title, slug: nextChapter.slug } : null
	};
};
