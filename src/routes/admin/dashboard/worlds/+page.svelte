<script lang="ts">
	import DashboardLayout from '#lib/components/templates/DashboardLayout.svelte';
	import WorldManagement from '#lib/components/organisms/WorldManagement.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Dashboard - Worlds | Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<DashboardLayout currentPath="/admin/dashboard/worlds">
	<header class="mb-8">
		<h1 class="h1">World Management</h1>
		<p class="opacity-60">Manage your story universes and chronological eras.</p>
	</header>

	<WorldManagement universes={data.universes} eras={data.eras} />
</DashboardLayout>
