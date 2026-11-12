<script lang="ts">
	import DashboardLayout from '#lib/components/templates/DashboardLayout.svelte';
	import SiteManagement from '#lib/components/organisms/SiteManagement.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Dashboard - Site Data | Admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<DashboardLayout currentPath="/admin/dashboard/site">
	<header class="mb-8">
		<h1 class="h1">Site Management</h1>
		<p class="opacity-60">Manage your website's branding, about page, and FAQs.</p>
	</header>

	<SiteManagement
		settings={data.settings}
		faqs={data.faqs}
	/>
</DashboardLayout>
