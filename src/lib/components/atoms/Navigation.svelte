<script lang="ts" module>
	import type { Component } from 'svelte';

	export interface NavItem {
		id: string;
		label: string;
		href: string;
		icon: Component<{ class?: string }>;
	}

	export interface NavGroup {
		id: string;
		label?: string;
		items: NavItem[];
	}
</script>

<script lang="ts">
	import { Navigation as SkNavigation } from '@skeletonlabs/skeleton-svelte';
	import PanelLeftCloseIcon from '@lucide/svelte/icons/panel-left-close';
	import PanelLeftOpenIcon from '@lucide/svelte/icons/panel-left-open';
	import type { Snippet } from 'svelte';

	interface Props {
		groups: NavGroup[];
		currentPath?: string;
		headerSnippet?: Snippet;
		footerSnippet?: Snippet<[{ isCollapsed: boolean }]>;
		class?: string;
	}

	let {
		groups,
		currentPath = '',
		headerSnippet,
		footerSnippet,
		class: className = ''
	}: Props = $props();

	// Desktop toggle state (Sidebar vs Rail)
	let isCollapsed = $state(false);

	function toggleCollapse() {
		isCollapsed = !isCollapsed;
	}
</script>

<!-- Desktop Navigation (Sidebar / Rail Toggleable) -->
<div class="hidden h-screen md:block">
	<SkNavigation
		layout={isCollapsed ? 'rail' : 'sidebar'}
		class="bg-surface-100-900 border-surface-200-800 grid h-screen border-r transition-all duration-200 {isCollapsed
			? 'w-16'
			: 'w-56'} grid-rows-[auto_1fr_auto] gap-3 {className}"
	>
		<SkNavigation.Header class="flex items-center justify-center p-3">
			{#if headerSnippet}
				{@render headerSnippet()}
			{:else}
				<button
					type="button"
					onclick={toggleCollapse}
					class="btn-icon btn-icon-lg hover:preset-tonal rounded-sm shrink-0"
					title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
					aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
				>
					{#if isCollapsed}
						<PanelLeftOpenIcon class="size-6 text-primary-500" />
					{:else}
						<PanelLeftCloseIcon class="size-6 text-surface-400 hover:text-surface-50" />
					{/if}
				</button>
			{/if}
		</SkNavigation.Header>

		<SkNavigation.Content class="overflow-y-auto">
			{#each groups as group (group.id)}
				<SkNavigation.Group>
					{#if group.label && !isCollapsed}
						<SkNavigation.Label class="pl-4 text-[10px] font-bold uppercase tracking-wider opacity-50">
							{group.label}
						</SkNavigation.Label>
					{/if}
					<SkNavigation.Menu class="px-2">
						{#each group.items as item (item.id)}
							{@const Icon = item.icon}
							<SkNavigation.TriggerAnchor
								href={item.href}
								title={item.label}
								aria-label={item.label}
								class="{currentPath === item.href ? 'preset-tonal font-bold' : ''} rounded-sm"
							>
								<Icon class="size-4 shrink-0" />
								{#if !isCollapsed}
									<SkNavigation.TriggerText>{item.label}</SkNavigation.TriggerText>
								{/if}
							</SkNavigation.TriggerAnchor>
						{/each}
					</SkNavigation.Menu>
				</SkNavigation.Group>
			{/each}
		</SkNavigation.Content>

		{#if footerSnippet}
			<SkNavigation.Footer class="space-y-2 p-2">
				{@render footerSnippet({ isCollapsed })}
			</SkNavigation.Footer>
		{/if}
	</SkNavigation>
</div>

<!-- Mobile Navigation (Fixed Bottom Bar) -->
<div class="bg-surface-100-900 border-surface-200-800 fixed bottom-0 left-0 right-0 z-40 block border-t p-2 shadow-lg md:hidden">
	<SkNavigation layout="bar">
		<SkNavigation.Menu class="flex items-center justify-around gap-1">
			{#each groups as group (group.id)}
				{#each group.items as item (item.id)}
					{@const Icon = item.icon}
					<SkNavigation.TriggerAnchor
						href={item.href}
						title={item.label}
						aria-label={item.label}
						class="{currentPath === item.href ? 'preset-tonal' : ''} flex-1 justify-center py-2 rounded-sm"
					>
						<Icon class="size-5" />
						<SkNavigation.TriggerText class="text-[10px]">{item.label}</SkNavigation.TriggerText>
					</SkNavigation.TriggerAnchor>
				{/each}
			{/each}
		</SkNavigation.Menu>
	</SkNavigation>
</div>
