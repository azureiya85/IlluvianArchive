<script lang="ts">
	import BookListLayout from '#lib/components/templates/BookListLayout.svelte';
</script>

<svelte:head>
	<title>Books | Illuvian Archive</title>
	<meta name="description" content="Browse the library of Illuvian Archive." />
	<!-- Tell search engines not to index the construction page -->
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<BookListLayout />
