<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import MarkdownContent from '#lib/components/atoms/MarkdownContent.svelte';
	import { directImageUrl } from '#lib/utils/image.ts';

	interface FaqItem {
		id: string; question: string; answer: string;
	}

	interface SiteSettings {
		siteTitle: string; ownerName?: string | null; contactEmail?: string | null;
		heroBanner?: string | null; logo?: string | null; aboutContent?: string | null;
	}

	interface Props {
		settings: SiteSettings;
		faqs: FaqItem[];
	}

	let { settings, faqs }: Props = $props();
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-4xl p-6">
	<h2 class="h3 mb-6 font-bold">Live Site Preview</h2>

	<div class="space-y-8">
		<!-- Branding Preview -->
		<section class="rounded-container border border-surface-200-800 p-4">
			<h3 class="font-bold opacity-50 uppercase tracking-widest text-xs mb-4">Branding</h3>
			<div class="flex items-center gap-6">
				{#if settings.logo}
					<img src={directImageUrl(settings.logo)} alt="Logo" class="h-16 w-16 object-contain" />
				{/if}
				<div class="text-3xl font-black">{settings.siteTitle}</div>
			</div>
			{#if settings.heroBanner}
				<div class="mt-4">
					<img src={directImageUrl(settings.heroBanner)} alt="Banner" class="h-48 w-full rounded-container object-cover shadow-md" />
				</div>
			{/if}
		</section>

		<!-- About & Contact Preview -->
		<section class="rounded-container border border-surface-200-800 p-4">
			<h3 class="font-bold opacity-50 uppercase tracking-widest text-xs mb-4">About & Contact</h3>
			<div class="mb-4 flex gap-4 text-sm font-medium">
				<span class="preset-tonal-primary badge">Owner: {settings.ownerName || 'Not Set'}</span>
				<span class="preset-tonal-secondary badge">Email: {settings.contactEmail || 'Not Set'}</span>
			</div>
			{#if settings.aboutContent}
				<div class="rounded-container bg-surface-50-950 p-4">
					<MarkdownContent content={settings.aboutContent} />
				</div>
			{:else}
				<p class="opacity-50 text-sm">No about content written yet.</p>
			{/if}
		</section>

		<!-- FAQs Preview -->
		<section class="rounded-container border border-surface-200-800 p-4">
			<h3 class="font-bold opacity-50 uppercase tracking-widest text-xs mb-4">FAQs ({faqs.length})</h3>
			<div class="space-y-4">
				{#each faqs as faq (faq.id)}
					<div class="border-b border-surface-200-800 pb-2 last:border-0 last:pb-0">
						<div class="font-bold">{faq.question}</div>
						<div class="text-sm opacity-80 mt-1">{faq.answer}</div>
					</div>
				{:else}
					<p class="opacity-50 text-sm">No FAQs created yet.</p>
				{/each}
			</div>
		</section>
	</div>
</Card>
