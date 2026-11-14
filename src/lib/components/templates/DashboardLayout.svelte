<script lang="ts">
	import type { Snippet } from 'svelte';
	import DashboardSidebar from '#lib/components/organisms/DashboardSidebar.svelte';

	interface Props {
		children: Snippet;
		currentPath?: string;
	}

	let { children, currentPath }: Props = $props();
</script>

<div class="flex flex-col min-h-screen w-full md:grid md:h-screen md:grid-cols-[auto_1fr] md:items-stretch md:overflow-hidden">
	<DashboardSidebar {currentPath} />

	<main class="flex-1 overflow-y-auto p-4 pb-20 md:p-8 md:pb-8">
		<div class="mx-auto max-w-7xl">
			{@render children()}
		</div>
	</main>
</div>
