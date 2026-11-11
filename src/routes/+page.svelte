<script lang="ts">
	import LandingPageLayout from '#lib/components/templates/LandingPageLayout.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Illuvian Archive</title>
	<meta name="description" content="Welcome to the Illuvian Archive." />
</svelte:head>

<LandingPageLayout
	featuredBooks={data.featuredBooks}
	latestChapters={data.latestChapters}
	chapterPage={data.chapterPage}
	chapterPageSize={data.chapterPageSize}
	chapterTotal={data.chapterTotal}
/>
