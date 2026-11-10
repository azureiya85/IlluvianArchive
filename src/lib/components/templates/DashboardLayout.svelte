<script lang="ts">
	import type { Snippet } from 'svelte';
	import DashboardSidebar from '#lib/components/organisms/DashboardSidebar.svelte';

	interface Props {
		children: Snippet;
		currentPath?: string;
	}

	let { children, currentPath }: Props = $props();
</script>

<div class="grid h-screen w-full grid-cols-[auto_1fr] items-stretch overflow-hidden">
	<DashboardSidebar {currentPath} />

	<main class="overflow-y-auto p-4 md:p-8">
		<div class="mx-auto max-w-7xl">
			{@render children()}
		</div>
	</main>
</div>
