<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Accordion from '#lib/components/atoms/Accordion.svelte';
	import MarkdownContent from '#lib/components/atoms/MarkdownContent.svelte';
	import InfoIcon from '@lucide/svelte/icons/info';

	interface Props {
		description: string;
	}

	let { description }: Props = $props();

	const accordionItems = [{ id: 'about', title: 'Synopsis' }];
</script>

<Card class="preset-filled-surface-100-900 overflow-hidden">
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<InfoIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">About Book</h2>
	</header>

	<div class="p-2">
		<Accordion items={accordionItems} defaultValue={['about']}>
			{#snippet content()}
				<div class="py-2">
					<MarkdownContent content={description} />
				</div>
			{/snippet}
		</Accordion>
	</div>
</Card>
