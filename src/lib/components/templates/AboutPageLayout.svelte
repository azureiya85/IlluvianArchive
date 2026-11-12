<script lang="ts">
	import TopBar from '#lib/components/molecules/TopBar.svelte';
	import AboutPage, { type AboutSettings, type FaqData } from '#lib/components/organisms/AboutPage.svelte';

	interface Props {
		settings: AboutSettings;
		faqs: FaqData[];
	}

	let { settings, faqs }: Props = $props();
</script>

<div class="min-h-screen bg-surface-50-950 pb-20">
	<TopBar />

	<main class="mx-auto mt-8 max-w-4xl px-4 lg:max-w-5xl">
		<AboutPage {settings} {faqs} />
	</main>
</div>
