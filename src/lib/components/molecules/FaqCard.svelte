<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Accordion from '#lib/components/atoms/Accordion.svelte';
	import HelpCircleIcon from '@lucide/svelte/icons/help-circle';

	interface FaqItem {
		id: string;
		question: string;
		answer: string;
	}

	interface Props {
		faqs: FaqItem[];
	}

	let { faqs }: Props = $props();

	// Map the faqs into the generic AccordionItem format expected by your atom
	let accordionItems = $derived(
		faqs.map((faq) => ({
			id: faq.id,
			title: faq.question
		}))
	);
</script>

<Card class="preset-filled-surface-100-900 overflow-hidden">
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<HelpCircleIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">F.A.Q</h2>
	</header>

	<div class="p-2">
		{#if faqs.length > 0}
			<Accordion items={accordionItems}>
				{#snippet content(item)}
					<!-- Find the corresponding answer based on the generic item ID -->
					{@const faq = faqs.find((f) => f.id === item.id)}
					<!-- Using whitespace-pre-wrap so standard text linebreaks are respected -->
					<p class="whitespace-pre-wrap leading-relaxed">{faq?.answer}</p>
				{/snippet}
			</Accordion>
		{:else}
			<div class="p-6 text-center opacity-60">
				<p>No frequently asked questions available at this time.</p>
			</div>
		{/if}
	</div>
</Card>
