<script lang="ts">
	import Tabs from '#lib/components/atoms/Tabs.svelte';
	import SitePreview from '#lib/components/molecules/SitePreview.svelte';
	import SiteImagesForm from '#lib/components/molecules/SiteImagesForm.svelte';
	import AboutForm from '#lib/components/molecules/AboutForm.svelte';
	import FaqForm from '#lib/components/molecules/FaqForm.svelte';

	interface FaqItem {
		id: string; question: string; answer: string; orderIndex: number;
	}

	interface SiteSettings {
		siteTitle: string;
		ownerName?: string | null;
		contactEmail?: string | null;
		heroBanner?: string | null;
		logo?: string | null;
		aboutContent?: string | null;
		ownerCoverImage?: string | null;
	}

	interface Props {
		settings: SiteSettings;
		faqs: FaqItem[];
	}

	let { settings, faqs }: Props = $props();

	let activeTab = $state('preview');
</script>

{#snippet previewTab()}
	<SitePreview {settings} {faqs} />
{/snippet}

{#snippet imagesTab()}
	<SiteImagesForm
		siteTitle={settings.siteTitle}
		logo={settings.logo}
		heroBanner={settings.heroBanner}
		ownerCoverImage={settings.ownerCoverImage}
	/>
{/snippet}

{#snippet aboutTab()}
	<AboutForm
		ownerName={settings.ownerName}
		contactEmail={settings.contactEmail}
		aboutContent={settings.aboutContent}
	/>
{/snippet}

{#snippet faqsTab()}
	<FaqForm {faqs} />
{/snippet}

<div class="space-y-6">
	<Tabs
		bind:value={activeTab}
		tabs={[
			{ value: 'preview', label: 'Live Preview', content: previewTab },
			{ value: 'images', label: 'Branding & Images', content: imagesTab },
			{ value: 'about', label: 'About & Contact', content: aboutTab },
			{ value: 'faqs', label: 'FAQs', content: faqsTab }
		]}
	/>
</div>
