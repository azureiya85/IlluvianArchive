<script lang="ts">
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { Accordion as SkAccordion } from '@skeletonlabs/skeleton-svelte';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface AccordionItem {
		id: string;
		title: string;
	}

	interface Props {
		items: AccordionItem[];
		content: Snippet<[AccordionItem]>;
		multiple?: boolean;
		collapsible?: boolean;
		defaultValue?: string[];
		class?: string;
	}

	let {
		items,
		content,
		multiple = false,
		collapsible = true,
		defaultValue = [],
		class: className = ''
	}: Props = $props();
</script>

<SkAccordion {multiple} {collapsible} {defaultValue} class={className}>
	{#each items as item, i (item.id)}
		{#if i !== 0}
			<hr class="border-surface-200-800 my-2 opacity-50" />
		{/if}
		<SkAccordion.Item value={item.id}>
			<h3>
				<SkAccordion.ItemTrigger class="flex w-full items-center justify-between gap-2 p-2 text-left font-bold transition-colors hover:text-primary-500">
					{item.title}
					<SkAccordion.ItemIndicator class="group">
						<ChevronDownIcon class="size-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
					</SkAccordion.ItemIndicator>
				</SkAccordion.ItemTrigger>
			</h3>
			<SkAccordion.ItemContent>
				{#snippet element(attributes)}
					{#if !attributes.hidden}
						<div {...attributes} transition:slide={{ duration: 200 }} class="p-4 text-surface-900-50 opacity-90">
							{@render content(item)}
						</div>
					{/if}
				{/snippet}
			</SkAccordion.ItemContent>
		</SkAccordion.Item>
	{/each}
</SkAccordion>
