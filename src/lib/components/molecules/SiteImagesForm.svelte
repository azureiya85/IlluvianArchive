<script lang="ts">
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import { directImageUrl } from '#lib/utils/image.ts';

	interface Props {
		siteTitle: string;
		logo?: string | null;
		heroBanner?: string | null;
		ownerCoverImage?: string | null;
	}

	let { siteTitle, logo, heroBanner, ownerCoverImage }: Props = $props();
	let loading = $state(false);

	function parseUrl(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		target.value = directImageUrl(target.value) || '';
	}
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-4xl p-6">
	<h2 class="h3 mb-6 font-bold">Site Images & Branding</h2>

	<Form method="POST" action="?/updateBranding" class="space-y-6" submitEnhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}>
		<label class="label">
			<span class="label-text">Site Title</span>
			<input class="input" type="text" name="siteTitle" value={siteTitle} required />
		</label>

		<label class="label">
			<span class="label-text">Logo URL (SVG/PNG)</span>
			<input class="input" type="url" name="logo" value={logo ?? ''} onchange={parseUrl} placeholder="https://..." />
		</label>

		<label class="label">
			<span class="label-text">Hero Banner Image URL</span>
			<input class="input" type="url" name="heroBanner" value={heroBanner ?? ''} onchange={parseUrl} placeholder="https://..." />
		</label>

		<label class="label">
			<span class="label-text">Owner Avatar / Cover Image URL</span>
			<input class="input" type="url" name="ownerCoverImage" value={ownerCoverImage ?? ''} onchange={parseUrl} placeholder="https://..." />
		</label>

		<div class="flex justify-end">
			<Button class="preset-filled-primary-500" disabled={loading}>
				{loading ? 'Saving...' : 'Save Branding'}
			</Button>
		</div>
	</Form>
</Card>
