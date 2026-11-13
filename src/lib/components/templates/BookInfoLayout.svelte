<script lang="ts">
	import TopBar from '#lib/components/molecules/TopBar.svelte';
	import BookInfoHeader, { type BookStats } from '#lib/components/molecules/BookInfoHeader.svelte';
	import AboutBook from '#lib/components/molecules/AboutBook.svelte';
	import TableOfContent, { type TocChapter } from '#lib/components/molecules/TableOfContent.svelte';

	interface Props {
		book: BookStats & { slug: string, description: string };
		chapters: TocChapter[];
	}

	let { book, chapters }: Props = $props();
</script>

<div class="min-h-screen bg-surface-50-950 pb-20">
	<TopBar />

	<main class="mx-auto mt-8 max-w-7xl space-y-8 px-4">
		<BookInfoHeader {book} />
		<AboutBook description={book.description} />
		<TableOfContent bookSlug={book.slug} {chapters} />
	</main>
</div>
