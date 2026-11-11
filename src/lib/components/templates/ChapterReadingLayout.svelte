<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import MarkdownContent from '#lib/components/atoms/MarkdownContent.svelte';
	import ChapterHeaderCard from '#lib/components/molecules/ChapterHeaderCard.svelte';
	import ChapterNavigation from '#lib/components/molecules/ChapterNavigation.svelte';

	interface NavChapter { title: string; slug: string; }

	interface Props {
		chapter: {
			title: string;
			content: string;
			summary?: string | null;
			wordCount: number;
		};
		book: { title: string; slug: string; };
		arc?: { title: string; } | null;
		prevChapter?: NavChapter | null;
		nextChapter?: NavChapter | null;
	}

	let { chapter, book, arc = null, prevChapter, nextChapter }: Props = $props();
</script>

<main class="mx-auto max-w-4xl px-4 py-8 md:py-12">
	<ChapterHeaderCard
		title={chapter.title}
		bookTitle={book.title}
		arcTitle={arc?.title}
		wordCount={chapter.wordCount}
		summary={chapter.summary}
	/>

	<Card class="preset-filled-surface-100-900 p-6 md:p-10">
		<MarkdownContent content={chapter.content} />
	</Card>

	<ChapterNavigation
		bookSlug={book.slug}
		{prevChapter}
		{nextChapter}
	/>
</main>
