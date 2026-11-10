<script lang="ts">
	import { Tabs as SkeletonTabs } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

	interface TabItem {
		value: string;
		label: string;
		content: Snippet;
	}

	interface Props {
		value: string;
		tabs: TabItem[];
		class?: string;
	}

	let { value = $bindable(), tabs, class: className = '' }: Props =$props();
</script>

<SkeletonTabs {value} onValueChange={(details) => (value = details.value)} class={className}>
	<SkeletonTabs.List class="mb-6">
		{#each tabs as tab (tab.value)}
			<SkeletonTabs.Trigger value={tab.value}>{tab.label}</SkeletonTabs.Trigger>
		{/each}
		<SkeletonTabs.Indicator />
	</SkeletonTabs.List>

	{#each tabs as tab (tab.value)}
		<SkeletonTabs.Content value={tab.value}>
			{@render tab.content()}
		</SkeletonTabs.Content>
	{/each}
</SkeletonTabs>
