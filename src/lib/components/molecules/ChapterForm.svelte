<script lang="ts">
	import { untrack } from 'svelte';
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import MarkdownEditor from '#lib/components/atoms/MarkdownEditor.svelte';

	interface Chapter {
		id: string;
		title: string;
		slug: string;
		summary?: string | null;
		content: string;
		orderIndex: number;
		status: string;
		wordCount: number;
		publishedAt?: Date | null;
		bookId: string;
		arcId?: string | null;
	}

	interface Book { id: string; title: string; }
	interface Arc { id: string; title: string; bookId: string; }

	interface Props {
		chapter?: Chapter | null;
		books: Book[];
		arcs: Arc[];
		onSuccess: () => void;
		onCancel?: () => void;
	}

	let { chapter = null, books, arcs, onSuccess, onCancel }: Props = $props();

	let loading = $state(false);
	let action = $derived(chapter ? '?/updateChapter' : '?/createChapter');
	let formTitle = $derived(chapter ? 'Edit Chapter' : 'Create New Chapter');

	let selectedBookId = $state(untrack(() => chapter?.bookId ?? ''));
	let availableArcs = $derived(arcs.filter(a => a.bookId === selectedBookId));

	let formattedPublishedAt = $derived(
		chapter?.publishedAt
			? new Date(chapter.publishedAt).toISOString().slice(0, 16)
			: ''
	);

	// We bind the content state here so the editor can control it
	let chapterContent = $state(untrack(() => chapter?.content ?? ''));
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-5xl p-6">
	<Form method="POST" {action} class="space-y-6" submitEnhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
			onSuccess();
		};
	}}>
		<div class="flex items-center justify-between">
			<h2 class="h3">{formTitle}</h2>
			{#if onCancel}
				<Button class="btn-sm preset-outlined" type="button" onclick={onCancel}>Cancel</Button>
			{/if}
		</div>

		{#if chapter}
			<input type="hidden" name="id" value={chapter.id} />
		{/if}

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Basic Information</legend>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<label class="label md:col-span-2">
					<span class="label-text">Title</span>
					<input class="input" type="text" name="title" value={chapter?.title ?? ''} required placeholder="Chapter 1: The Beginning" />
				</label>
				<label class="label">
					<span class="label-text">Order Index</span>
					<input class="input" type="number" step="0.1" name="orderIndex" value={chapter?.orderIndex ?? 0} required />
				</label>
			</div>

			<label class="label">
				<span class="label-text">Slug</span>
				<input class="input" type="text" name="slug" value={chapter?.slug ?? ''} required placeholder="chapter-1" />
			</label>
		</fieldset>

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Organization</legend>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<label class="label">
					<span class="label-text">Book</span>
					<select class="select" name="bookId" bind:value={selectedBookId} required>
						<option value="" disabled>Select Book</option>
						{#each books as book (book.id)}
							<option value={book.id}>{book.title}</option>
						{/each}
					</select>
				</label>
				<label class="label">
					<span class="label-text">Arc (Optional)</span>
					<select class="select" name="arcId" value={chapter?.arcId ?? ''} disabled={!selectedBookId}>
						<option value="">None / Outside Arc</option>
						{#each availableArcs as arc (arc.id)}
							<option value={arc.id}>{arc.title}</option>
						{/each}
					</select>
				</label>
			</div>
		</fieldset>

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Content</legend>
			<label class="label">
				<span class="label-text">Summary (Optional)</span>
				<textarea class="textarea" name="summary" rows="2" placeholder="Brief chapter recap...">{chapter?.summary ?? ''}</textarea>
			</label>

			<!-- The new Markdown Editor implementation -->
			<div class="space-y-1">
				<span class="label-text">Chapter Content</span>
				<MarkdownEditor
					name="content"
					bind:value={chapterContent}
					required={true}
					rows={18}
				/>
			</div>
		</fieldset>

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Publishing</legend>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<label class="label">
					<span class="label-text">Status</span>
					<select class="select" name="status" value={chapter?.status ?? 'DRAFT'} required>
						<option value="DRAFT">Draft</option>
						<option value="PUBLISHED">Published</option>
						<option value="ARCHIVED">Archived</option>
					</select>
				</label>
				<label class="label">
					<span class="label-text">Publish Date</span>
					<input class="input" type="datetime-local" name="publishedAt" value={formattedPublishedAt} />
				</label>
				<label class="label">
					<span class="label-text">Word Count</span>
					<input class="input" type="number" name="wordCount" value={chapter?.wordCount ?? 0} />
				</label>
			</div>
		</fieldset>

		<div class="flex justify-end gap-4 pt-4">
			{#if !chapter}
				<Button class="preset-tonal" type="reset">Reset</Button>
			{/if}
			<Button class="preset-filled-primary-500" disabled={loading}>
				{loading ? 'Saving...' : (chapter ? 'Save Changes' : 'Create Chapter')}
			</Button>
		</div>
	</Form>
</Card>
