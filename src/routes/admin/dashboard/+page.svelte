<script lang="ts">
	import DashboardLayout from '#lib/components/templates/DashboardLayout.svelte';
	import BookManagement from '#lib/components/organisms/BookManagement.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Dashboard - Books | Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<DashboardLayout currentPath="/admin/dashboard">
	<header class="mb-8">
		<h1 class="h1">Book Management</h1>
		<p class="opacity-60">Manage your manuscripts, tags, story parameters, and publishing statuses.</p>
	</header>

	<BookManagement
		books={data.books}
		tags={data.tags}
		universes={data.universes}
		eras={data.eras}
	/>
</DashboardLayout>
