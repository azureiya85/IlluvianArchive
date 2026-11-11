import { db } from '#lib/server/db.ts';
import type { PageServerLoad } from './$types';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async ({ url }) => {
	const page = Math.max(1, Number(url.searchParams.get('page')) || 1);

	// 1. Fetch published books with their tags
	const books = await db.orm.public.Book
		.where({ status: 'PUBLISHED' })
		.include('tags')
		.all();

	// 2. Find the 'favorite' tag
	const tags = await db.orm.public.Tag.all();
	const favTag = tags.find((t) => t.slug === 'favorite' || t.name.toLowerCase() === 'favorite');

	// 3. Split into favorites and non-favorites
	const isFavorite = (b: (typeof books)[number]) =>
		favTag !== undefined && b.tags.some((t) => t.tagId === favTag.id);

	const favoriteBooks = books.filter(isFavorite);
	const otherBooks = books.filter((b) => !isFavorite(b));

	// 4. Randomize non-favorites, favorites first, max 5 total
	otherBooks.sort(() => 0.5 - Math.random());
	const featuredBooks = [...favoriteBooks, ...otherBooks].slice(0, 5);

	// 5. Published chapters whose parent book is also published.
	// Chained where() calls are ANDed; the relation filter checks the parent book.
	const publishedChapters = db.orm.public.Chapter
		.where({ status: 'PUBLISHED' })
		.where((c) => c.book.some({ status: 'PUBLISHED' }));

	const [{ total: chapterTotal }, chapters] = await Promise.all([
		publishedChapters.aggregate((agg) => ({ total: agg.count() })),
		publishedChapters
			.include('book')
			.orderBy((c) => c.publishedAt.desc({ nulls: 'last' }))
			.limit(PAGE_SIZE)
			.offset((page - 1) * PAGE_SIZE)
			.all()
	]);

	return {
		featuredBooks: featuredBooks.map((b) => ({
			id: b.id,
			title: b.title,
			slug: b.slug,
			coverImage: b.coverImage
		})),
		latestChapters: chapters.map((c) => ({
			id: c.id,
			title: c.title,
			slug: c.slug,
			publishedAt: c.publishedAt,
			book: {
				title: c.book.title,
				slug: c.book.slug,
				type: c.book.type,
				coverImage: c.book.coverImage
			}
		})),
		chapterPage: page,
		chapterPageSize: PAGE_SIZE,
		chapterTotal
	};
};
