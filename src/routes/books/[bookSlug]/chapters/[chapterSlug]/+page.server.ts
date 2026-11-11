import { error } from '@sveltejs/kit';
import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { bookSlug, chapterSlug } = params;

	// 1. Fetch Book
	const books = await db.orm.public.Book.where({ slug: bookSlug }).all();
	const book = books[0]; // Take first match
	if (!book) error(404, 'Book not found');

	// 2. Fetch all chapters for this book, ordered by index (required for prev/next logic)
	const allChapters = await db.orm.public.Chapter
		.where({ bookId: book.id })
		.orderBy(c => c.orderIndex.asc())
		.all();

	// 3. Find the current chapter inside the fetched array
	const currentIndex = allChapters.findIndex(c => c.slug === chapterSlug);
	if (currentIndex === -1) error(404, 'Chapter not found');

	const chapter = allChapters[currentIndex];

	// 4. Figure out Next and Previous chapters safely
	const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
	const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

	// 5. Fetch Arc info if the chapter belongs to one
	let arc = null;
	if (chapter.arcId) {
		const arcs = await db.orm.public.Arc.where({ id: chapter.arcId }).all();
		arc = arcs[0] || null;
	}

	return {
		book: { title: book.title, slug: book.slug },
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
