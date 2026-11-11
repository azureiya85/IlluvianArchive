<script lang="ts">
	import ChapterReadingLayout from '#lib/components/templates/ChapterReadingLayout.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.chapter.title} | {data.book.title}</title>
	<meta name="description" content={data.chapter.summary ?? `Read ${data.chapter.title} of ${data.book.title}`} />
</svelte:head>

<ChapterReadingLayout
	chapter={data.chapter}
	book={data.book}
	arc={data.arc}
	prevChapter={data.prevChapter}
	nextChapter={data.nextChapter}
/>
