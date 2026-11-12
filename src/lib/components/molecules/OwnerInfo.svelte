<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import MarkdownContent from '#lib/components/atoms/MarkdownContent.svelte';
	import PenToolIcon from '@lucide/svelte/icons/pen-tool';
	import MailIcon from '@lucide/svelte/icons/mail';
	import { directImageUrl } from '#lib/utils/image.ts';

	interface Props {
		ownerName?: string | null;
		ownerCoverImage?: string | null;
		aboutContent?: string | null;
		contactEmail?: string | null;
	}

	let { ownerName, ownerCoverImage, aboutContent, contactEmail }: Props = $props();

	const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600&h=600";
</script>

<Card class="preset-filled-surface-100-900 overflow-hidden">
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<PenToolIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">About Writer</h2>
	</header>

	<div class="grid grid-cols-1 gap-8 p-6 md:grid-cols-3">
		<!-- Left Column (1/3 width) -->
		<div class="col-span-1 flex flex-col items-center text-center">
			<img
				src={ownerCoverImage ? directImageUrl(ownerCoverImage) : PLACEHOLDER_IMAGE}
				alt={ownerName || 'Writer'}
				class="aspect-square w-full max-w-60 rounded-container object-cover shadow-lg"
			/>
			<h3 class="mt-4 text-2xl font-black">{ownerName || 'Unknown Writer'}</h3>
		</div>

		<!-- Right Column (2/3 width) -->
		<div class="col-span-1 flex flex-col md:col-span-2">
			<!-- About Content -->
			<div class="grow">
				{#if aboutContent}
					<MarkdownContent content={aboutContent} />
				{:else}
					<p class="opacity-60 italic">No about information has been provided yet.</p>
				{/if}
			</div>

			<!-- Contact Section (Anchored at bottom) -->
			{#if contactEmail}
				<div class="mt-8 border-t border-surface-200-800 pt-6">
					<h4 class="text-sm font-bold uppercase tracking-widest opacity-60">Have a suggestion?</h4>
					<a
						href="mailto:{contactEmail}"
						class="mt-2 inline-flex items-center gap-2 font-bold text-primary-500 transition-colors hover:text-primary-400"
					>
						<MailIcon class="size-5" />
						<span>{contactEmail}</span>
					</a>
				</div>
			{/if}
		</div>
	</div>
</Card>
