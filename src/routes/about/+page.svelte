<script lang="ts">
	import AboutPageLayout from '#lib/components/templates/AboutPageLayout.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>About | Illuvian Archive</title>
	<meta name="description" content="About the author and frequently asked questions." />
</svelte:head>

<AboutPageLayout settings={data.settings} faqs={data.faqs} />
