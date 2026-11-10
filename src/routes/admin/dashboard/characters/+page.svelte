<script lang="ts">
	import DashboardLayout from '#lib/components/templates/DashboardLayout.svelte';
	import CharacterManagement from '#lib/components/organisms/CharacterManagement.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Dashboard - Characters | Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<DashboardLayout currentPath="/admin/dashboard/characters">
	<header class="mb-8">
		<h1 class="h1">Character Management</h1>
		<p class="opacity-60">Manage your cast, biographies, and world assignments.</p>
	</header>

	<CharacterManagement characters={data.characters} universes={data.universes} />
</DashboardLayout>
