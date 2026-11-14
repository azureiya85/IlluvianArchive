export const availableStoryTypes = [
	{ value: 'SHORT_FICTION', label: 'Short Fiction' },
	{ value: 'NOVELLA', label: 'Novella' },
	{ value: 'NOVEL', label: 'Novel' }
];

export function formatStoryType(type: string) {
	return type.replace('_', ' ');
}

export interface FilterableChapter {
	id: string;
	title: string;
	slug: string;
	summary?: string | null;
	orderIndex: number;
	status: string;
	wordCount: number;
	publishedAt?: Date | string | null;
	bookId: string;
	arcId?: string | null;
}

export interface FilterableBook {
	id: string;
	title: string;
	slug: string;
	type?: string;
}

export interface FilterableArc {
	id: string;
	title: string;
	bookId?: string;
}

export interface FilterableArcItem {
	id: string;
	title: string;
	slug: string;
	description?: string | null;
	coverImage?: string | null;
	orderIndex: number;
	bookId: string;
}

export type SortOption = 'order-asc' | 'order-desc' | 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';
export type ArcSortOption = 'order-asc' | 'order-desc' | 'title-asc' | 'title-desc';

export function filterAndSortChapters<T extends FilterableChapter>(
	chapters: T[],
	books: FilterableBook[],
	arcs: FilterableArc[],
	options: {
		searchQuery?: string;
		storyType?: string;
		bookId?: string;
		arcId?: string;
		status?: string;
		sortBy?: SortOption;
	}
): T[] {
	const { searchQuery = '', storyType = '', bookId = '', arcId = '', status = '', sortBy = 'order-asc' } = options;

	const query = searchQuery.trim().toLowerCase();
	const bookMap = new Map(books.map((b) => [b.id, b]));
	const arcMap = new Map(arcs.map((a) => [a.id, a]));

	return chapters
		.filter((chapter) => {
			const book = bookMap.get(chapter.bookId);
			const arc = chapter.arcId ? arcMap.get(chapter.arcId) : null;

			if (storyType && book?.type !== storyType) return false;
			if (bookId && chapter.bookId !== bookId) return false;
			if (arcId && chapter.arcId !== arcId) return false;
			if (status && chapter.status !== status) return false;

			if (query) {
				const matchTitle = chapter.title.toLowerCase().includes(query);
				const matchSlug = chapter.slug.toLowerCase().includes(query);
				const matchSummary = chapter.summary?.toLowerCase().includes(query) ?? false;
				const matchBook = book?.title.toLowerCase().includes(query) ?? false;
				const matchArc = arc?.title.toLowerCase().includes(query) ?? false;

				if (!matchTitle && !matchSlug && !matchSummary && !matchBook && !matchArc) {
					return false;
				}
			}

			return true;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'order-desc':
					return b.orderIndex - a.orderIndex;
				case 'date-desc': {
					const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
					const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
					return dateB - dateA;
				}
				case 'date-asc': {
					const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
					const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
					return dateA - dateB;
				}
				case 'title-asc':
					return a.title.localeCompare(b.title);
				case 'title-desc':
					return b.title.localeCompare(a.title);
				case 'order-asc':
				default:
					return a.orderIndex - b.orderIndex;
			}
		});
}

export function filterAndSortArcs<T extends FilterableArcItem>(
	arcs: T[],
	books: { id: string; title: string }[],
	options: {
		searchQuery?: string;
		bookId?: string;
		sortBy?: ArcSortOption;
	}
): T[] {
	const { searchQuery = '', bookId = '', sortBy = 'order-asc' } = options;
	const query = searchQuery.trim().toLowerCase();
	const bookMap = new Map(books.map((b) => [b.id, b]));

	return arcs
		.filter((arc) => {
			if (bookId && arc.bookId !== bookId) return false;

			if (query) {
				const matchTitle = arc.title.toLowerCase().includes(query);
				const matchSlug = arc.slug.toLowerCase().includes(query);
				const book = bookMap.get(arc.bookId);
				const matchBook = book?.title.toLowerCase().includes(query) ?? false;

				if (!matchTitle && !matchSlug && !matchBook) return false;
			}

			return true;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'order-desc':
					return b.orderIndex - a.orderIndex;
				case 'title-asc':
					return a.title.localeCompare(b.title);
				case 'title-desc':
					return b.title.localeCompare(a.title);
				case 'order-asc':
				default:
					return a.orderIndex - b.orderIndex;
			}
		});
}
