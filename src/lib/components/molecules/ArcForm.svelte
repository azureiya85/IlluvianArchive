<script lang="ts" module>
	export interface Arc {
		id: string;
		title: string;
		slug: string;
		description?: string | null;
		coverImage?: string | null;
		orderIndex: number;
		bookId: string;
	}
</script>

<script lang="ts">
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';

	interface Book { id: string; title: string; }

	interface Props {
		arc?: Arc | null;
		books: Book[];
		onSuccess: () => void;
		onCancel?: () => void;
	}

	let { arc = null, books, onSuccess, onCancel }: Props = $props();

	let loading = $state(false);
	let action = $derived(arc ? '?/updateArc' : '?/createArc');
	let formTitle = $derived(arc ? 'Edit Arc' : 'Create New Arc');
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-2xl p-6 rounded-sm">
	<Form method="POST" {action} class="space-y-6" submitEnhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
			onSuccess();
		};
	}}>
		<div class="flex items-center justify-between">
			<h2 class="h3 font-bold">{formTitle}</h2>
			{#if onCancel}
				<Button class="btn-sm preset-outlined rounded-sm" type="button" onclick={onCancel}>Cancel</Button>
			{/if}
		</div>

		{#if arc}
			<input type="hidden" name="id" value={arc.id} />
		{/if}

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="label">
				<span class="label-text">Title</span>
				<input class="input rounded-sm" type="text" name="title" value={arc?.title ?? ''} required placeholder="Arc Title" />
			</label>

			<label class="label">
				<span class="label-text">Slug</span>
				<input class="input rounded-sm" type="text" name="slug" value={arc?.slug ?? ''} required placeholder="arc-slug" />
			</label>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="label">
				<span class="label-text">Book</span>
				<select class="select rounded-sm" name="bookId" value={arc?.bookId ?? ''} required>
					<option value="" disabled>Select Book</option>
					{#each books as book (book.id)}
						<option value={book.id}>{book.title}</option>
					{/each}
				</select>
			</label>

			<label class="label">
				<span class="label-text">Order Index</span>
				<input class="input rounded-sm" type="number" step="0.1" name="orderIndex" value={arc?.orderIndex ?? 0} required />
			</label>
		</div>

		<label class="label">
			<span class="label-text">Description</span>
			<textarea class="textarea rounded-sm" name="description" rows="4" placeholder="Arc description...">{arc?.description ?? ''}</textarea>
		</label>

		<label class="label">
			<span class="label-text">Cover Image URL (Optional)</span>
			<input class="input rounded-sm" type="url" name="coverImage" value={arc?.coverImage ?? ''} placeholder="https://..." />
		</label>

		<div class="flex justify-end gap-4 pt-4">
			{#if !arc}
				<Button class="preset-tonal rounded-sm" type="reset">Reset</Button>
			{/if}
			<Button class="preset-filled-primary-500 rounded-sm" disabled={loading}>
				{loading ? 'Saving...' : (arc ? 'Save Changes' : 'Create Arc')}
			</Button>
		</div>
	</Form>
</Card>
