export interface LatestChapter {
	id: string;
	title: string;
	slug: string;
	publishedAt?: Date | string | null;
	book: {
		title: string;
		slug: string;
		type: string;
		coverImage?: string | null;
	};
}

export interface FilterOptions {
	books: { title: string; slug: string }[];
	currentType: string;
	currentBook: string;
}
