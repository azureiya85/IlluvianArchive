<script lang="ts">
	import OwnerInfo from '#lib/components/molecules/OwnerInfo.svelte';
	import FaqCard from '#lib/components/molecules/FaqCard.svelte';

	export interface FaqData {
		id: string;
		question: string;
		answer: string;
		orderIndex: number;
	}

	export interface AboutSettings {
		ownerName?: string | null;
		ownerCoverImage?: string | null;
		aboutContent?: string | null;
		contactEmail?: string | null;
	}

	interface Props {
		settings: AboutSettings;
		faqs: FaqData[];
	}

	let { settings, faqs }: Props = $props();
</script>

<div class="space-y-8">
	<OwnerInfo
		ownerName={settings.ownerName}
		ownerCoverImage={settings.ownerCoverImage}
		aboutContent={settings.aboutContent}
		contactEmail={settings.contactEmail}
	/>

	<FaqCard {faqs} />
</div>
