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
		book: {
			title: string;
			slug: string;
			coverImage?: string | null;
		};
		arc?: { title: string; } | null;
		prevChapter?: NavChapter | null;
		nextChapter?: NavChapter | null;
	}

	let { chapter, book, arc = null, prevChapter, nextChapter }: Props = $props();

	// Master State for Reader Preferences
	let fontSize = $state('16');
	let paragraphSpacing = $state('24');
	let indentation = $state<'author' | 'forced'>('author');
	let readerWidth = $state('100');
</script>

<div class="min-h-screen bg-surface-50-950 pb-20 pt-8 px-4 flex flex-col items-center">

	<div class="w-full max-w-7xl mb-8">
		<ChapterHeaderCard
			title={chapter.title}
			bookTitle={book.title}
			bookSlug={book.slug}
			bookCoverImage={book.coverImage}
			arcTitle={arc?.title}
			wordCount={chapter.wordCount}
			summary={chapter.summary}
		/>
	</div>

	<div class="w-full max-w-5xl mb-8">
		<ChapterNavigation
			bookSlug={book.slug}
			{prevChapter}
			{nextChapter}
			hideBackToTop={true}
			bind:fontSize
			bind:paragraphSpacing
			bind:indentation
			bind:readerWidth
		/>
	</div>

	<div class="w-full max-w-5xl mb-8">
		<Card class="preset-filled-surface-100-900 rounded-sm p-6 md:p-10 transition-all duration-300">
			<!--
				Apply dynamic inline styles as CSS variables.
				width: {readerWidth}% dynamically scales the reading column constraint.
			-->
			<div
				class="mx-auto reader-container transition-all duration-300"
				style="
					width: {readerWidth}%;
					--reader-font-size: {fontSize}px;
					--reader-p-spacing: {paragraphSpacing}px;
					--reader-indent: {indentation === 'forced' ? '2em' : '0'};
				"
			>
				<MarkdownContent content={chapter.content} />
			</div>
		</Card>
	</div>

	<div class="w-full max-w-5xl">
		<ChapterNavigation
			bookSlug={book.slug}
			{prevChapter}
			{nextChapter}
		/>
	</div>

</div>

<!-- Overrides for Tailwind Typography targeting only the reader container -->
<style>
	:global(.reader-container .prose) {
		font-size: var(--reader-font-size) !important;
		max-width: none !important;
		transition: font-size 0.2s ease;
	}

	:global(.reader-container .prose p) {
		margin-bottom: var(--reader-p-spacing) !important;
		margin-top: 0 !important;
		text-indent: var(--reader-indent) !important;
		line-height: 1.6 !important;
		transition: margin 0.2s ease, text-indent 0.2s ease;
	}

	/*
	 * FORCED INDENT EXCLUSIONS:
	 * 1. p:first-child -> The absolute first paragraph in the chapter.
	 * 2. *:not(p) + p  -> Any paragraph immediately following a heading (h1-h6),
	 *                     horizontal rule (hr), image, or blockquote.
	 */
	:global(.reader-container .prose > p:first-child),
	:global(.reader-container .prose > *:not(p) + p) {
		text-indent: 0 !important;
	}
</style>
