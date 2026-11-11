<script lang="ts">
	import DashboardLayout from '#lib/components/templates/DashboardLayout.svelte';
	import ChapterManagement from '#lib/components/organisms/ChapterManagement.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Dashboard - Chapters | Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<DashboardLayout currentPath="/admin/dashboard/chapters">
	<header class="mb-8">
		<h1 class="h1">Chapter Management</h1>
		<p class="opacity-60">Manage your story arcs, chapters, and manuscript content.</p>
	</header>

	<ChapterManagement chapters={data.chapters} arcs={data.arcs} books={data.books} />
</DashboardLayout>
