<script lang="ts">
	import { untrack } from 'svelte';
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import MarkdownEditor from '#lib/components/atoms/MarkdownEditor.svelte';

	interface Props {
		ownerName?: string | null;
		contactEmail?: string | null;
		aboutContent?: string | null;
	}

	let { ownerName, contactEmail, aboutContent }: Props = $props();
	let loading = $state(false);

	// Bind state for Markdown Editor
	let content = $state(untrack(() => aboutContent ?? ''));
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-4xl p-6">
	<h2 class="h3 mb-6 font-bold">About Page & Contact</h2>

	<Form method="POST" action="?/updateAbout" class="space-y-6" submitEnhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="label">
				<span class="label-text">Owner Name</span>
				<input class="input" type="text" name="ownerName" value={ownerName ?? ''} placeholder="Ryhze" />
			</label>

			<label class="label">
				<span class="label-text">Contact Email</span>
				<input class="input" type="email" name="contactEmail" value={contactEmail ?? ''} placeholder="hello@example.com" />
			</label>
		</div>

		<div class="space-y-1">
			<span class="label-text">About Page Content</span>
			<MarkdownEditor
				name="aboutContent"
				bind:value={content}
				rows={15}
				placeholder="Write about yourself and the site..."
			/>
		</div>

		<div class="flex justify-end">
			<Button class="preset-filled-primary-500" disabled={loading}>
				{loading ? 'Saving...' : 'Save About Page'}
			</Button>
		</div>
	</Form>
</Card>
