<script lang="ts">
	import BookInfoLayout from '#lib/components/templates/BookInfoLayout.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.book.title} | Illuvian Archive</title>
	<meta name="description" content={`Read ${data.book.title} on the Illuvian Archive.`} />
</svelte:head>

<BookInfoLayout book={data.book} chapters={data.chapters} />
