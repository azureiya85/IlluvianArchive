<script lang="ts">
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';

	interface Universe {
		id: string;
		name: string;
		slug: string;
		description: string | null;
		coverImage?: string | null;
	}

	interface Props {
		universe?: Universe | null;
		onSuccess: () => void;
		onCancel?: () => void;
	}

	let { universe = null, onSuccess, onCancel }: Props = $props();

	let loading = $state(false);
	let action = $derived(universe ? '?/updateUniverse' : '?/createUniverse');
	let title = $derived(universe ? 'Edit Universe' : 'Create New Universe');
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-2xl p-6">
	<Form method="POST" {action} class="space-y-6" submitEnhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
			onSuccess();
		};
	}}>
		<div class="flex items-center justify-between">
			<h2 class="h3">{title}</h2>
			{#if onCancel}
				<Button class="btn-sm preset-outlined" type="button" onclick={onCancel}>Cancel</Button>
			{/if}
		</div>

		{#if universe}
			<input type="hidden" name="id" value={universe.id} />
		{/if}

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="label">
				<span class="label-text">Name</span>
				<input class="input" type="text" name="name" value={universe?.name ?? ''} required placeholder="Cosmere" />
			</label>

			<label class="label">
				<span class="label-text">Slug</span>
				<input class="input" type="text" name="slug" value={universe?.slug ?? ''} required placeholder="cosmere" />
			</label>
		</div>

		<label class="label">
			<span class="label-text">Description</span>
			<textarea class="textarea" name="description" rows="4" placeholder="Universe description...">{universe?.description ?? ''}</textarea>
		</label>

		<label class="label">
			<span class="label-text">Cover Image URL (Optional)</span>
			<input class="input" type="url" name="coverImage" value={universe?.coverImage ?? ''} placeholder="https://..." />
		</label>

		<div class="flex justify-end gap-4 pt-4">
			{#if !universe}
				<Button class="preset-tonal" type="reset">Reset</Button>
			{/if}
			<Button class="preset-filled-primary-500" disabled={loading}>
				{loading ? 'Saving...' : (universe ? 'Save Changes' : 'Create Universe')}
			</Button>
		</div>
	</Form>
</Card>
