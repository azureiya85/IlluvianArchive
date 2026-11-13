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

	let fontFamily = $state('"Atkinson Hyperlegible Next Variable", sans-serif');
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
		<!-- Bound fontFamily down to the top navigation -->
		<ChapterNavigation
			bookSlug={book.slug}
			{prevChapter}
			{nextChapter}
			hideBackToTop={true}
			bind:fontFamily
			bind:fontSize
			bind:paragraphSpacing
			bind:indentation
			bind:readerWidth
		/>
	</div>

	<div class="w-full max-w-5xl mb-8">
		<Card class="preset-filled-surface-100-900 rounded-sm p-6 md:p-10 transition-all duration-300">
			<div
				class="mx-auto reader-container transition-all duration-300"
				style="
					width: {readerWidth}%;
					--reader-font-family: {fontFamily};
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

<style>
	:global(.reader-container .prose) {
		font-family: var(--reader-font-family) !important;
		font-size: var(--reader-font-size) !important;
		max-width: none !important;
		transition: font-size 0.2s ease, font-family 0.2s ease;
	}

	:global(.reader-container .prose p) {
		margin-bottom: var(--reader-p-spacing) !important;
		margin-top: 0 !important;
		text-indent: var(--reader-indent) !important;
		line-height: 1.6 !important;
		transition: margin 0.2s ease, text-indent 0.2s ease;
	}

	:global(.reader-container .prose > p:first-child),
	:global(.reader-container .prose > *:not(p) + p) {
		text-indent: 0 !important;
	}
</style>
