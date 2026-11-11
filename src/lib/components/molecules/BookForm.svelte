<script lang="ts">
	import { untrack } from 'svelte';
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import MarkdownEditor from '#lib/components/atoms/MarkdownEditor.svelte';

	interface Tag { id: string; name: string; slug: string; }
	interface Book {
		id: string;
		title: string;
		slug: string;
		description: string;
		author: string;
		type: string;
		status: string;
		coverImage?: string | null;
		wordCount?: number;
		readingEase?: number | null;
		readingLevel?: string | null;
		publishedAt?: Date | null;
		universeId?: string | null;
		eraId?: string | null;
		tags?: { tagId: string }[];
	}

	interface Universe { id: string; name: string; }
	interface Era { id: string; name: string; universeId: string; }

	interface Props {
		book?: Book | null;
		tags?: Tag[];
		universes: Universe[];
		eras: Era[];
		onSuccess: () => void;
		onCancel?: () => void;
	}

	let { book = null, tags = [], universes, eras, onSuccess, onCancel }: Props = $props();

	let loading = $state(false);
	let action = $derived(book ? '?/updateBook' : '?/createBook');
	let title = $derived(book ? 'Edit Book' : 'Create New Book');

	let selectedUniverseId = $state(untrack(() => book?.universeId ?? ''));
	let availableEras = $derived(eras.filter(e => e.universeId === selectedUniverseId));

	let formattedPublishedAt = $derived(
		book?.publishedAt
			? new Date(book.publishedAt).toISOString().slice(0, 16)
			: ''
	);

	// Bind the description state here so the MarkdownEditor can control it
	let bookDescription = $state(untrack(() => book?.description ?? ''));

	// Helper to check if a tag was already assigned to this book
	function hasTag(tagId: string) {
		return book?.tags?.some(t => t.tagId === tagId) ?? false;
	}
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
			<h2 class="h3">{title}</h2>
			{#if onCancel}
				<Button class="btn-sm preset-outlined" type="button" onclick={onCancel}>Cancel</Button>
			{/if}
		</div>

		{#if book}
			<input type="hidden" name="id" value={book.id} />
		{/if}

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Basic Information</legend>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<label class="label">
					<span class="label-text">Title</span>
					<input class="input" type="text" name="title" value={book?.title ?? ''} required placeholder="Book Title" />
				</label>
				<label class="label">
					<span class="label-text">Slug</span>
					<input class="input" type="text" name="slug" value={book?.slug ?? ''} required placeholder="book-title" />
				</label>
			</div>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<label class="label">
					<span class="label-text">Author</span>
					<input class="input" type="text" name="author" value={book?.author ?? 'Ryhze'} required />
				</label>
				<label class="label">
					<span class="label-text">Cover Image URL</span>
					<input class="input" type="url" name="coverImage" value={book?.coverImage ?? ''} placeholder="https://..." />
				</label>
			</div>

			<div class="space-y-1">
				<span class="label-text">Description / Synopsis</span>
				<MarkdownEditor
					name="description"
					bind:value={bookDescription}
					required={true}
					rows={8}
					placeholder="Enter a punchy synopsis..."
				/>
			</div>
		</fieldset>

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Worldbuilding & Timeline</legend>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<label class="label">
					<span class="label-text">Universe</span>
					<select class="select" name="universeId" bind:value={selectedUniverseId}>
						<option value="">None / Standalone</option>
						{#each universes as uni (uni.id)}
							<option value={uni.id}>{uni.name}</option>
						{/each}
					</select>
				</label>
				<label class="label">
					<span class="label-text">Era</span>
					<select class="select" name="eraId" value={book?.eraId ?? ''} disabled={!selectedUniverseId}>
						<option value="">Unknown Era</option>
						{#each availableEras as era (era.id)}
							<option value={era.id}>{era.name}</option>
						{/each}
					</select>
				</label>
			</div>
		</fieldset>

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Tags</legend>
			<div class="flex flex-wrap gap-3">
				{#each tags as tag (tag.id)}
					<label class="flex cursor-pointer items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							name="tags"
							value={tag.id}
							checked={hasTag(tag.id)}
						/>
						<span class="text-sm font-medium">{tag.name}</span>
					</label>
				{/each}
				{#if tags.length === 0}
					<span class="text-sm opacity-50">No tags created yet. Go to the Tag List tab to make some.</span>
				{/if}
			</div>
		</fieldset>

		<fieldset class="fieldset space-y-4">
			<legend class="legend">Publishing Details</legend>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<label class="label">
					<span class="label-text">Story Type</span>
					<select class="select" name="type" value={book?.type ?? 'NOVEL'} required>
						<option value="NOVEL">Novel</option>
						<option value="NOVELLA">Novella</option>
						<option value="SHORT_FICTION">Short Fiction</option>
						<option value="WEB_SERIAL">Web Serial</option>
					</select>
				</label>
				<label class="label">
					<span class="label-text">Status</span>
					<select class="select" name="status" value={book?.status ?? 'DRAFT'} required>
						<option value="DRAFT">Draft</option>
						<option value="PUBLISHED">Published</option>
						<option value="ARCHIVED">Archived</option>
					</select>
				</label>
				<label class="label">
					<span class="label-text">Publish Date</span>
					<input class="input" type="datetime-local" name="publishedAt" value={formattedPublishedAt} />
				</label>
			</div>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<label class="label">
					<span class="label-text">Word Count</span>
					<input class="input" type="number" name="wordCount" value={book?.wordCount ?? 0} />
				</label>
				<label class="label">
					<span class="label-text">Reading Ease Score</span>
					<input class="input" type="number" step="0.1" name="readingEase" value={book?.readingEase ?? ''} />
				</label>
				<label class="label">
					<span class="label-text">Reading Level</span>
					<select class="select" name="readingLevel" value={book?.readingLevel ?? ''}>
						<option value="">Auto/Unknown</option>
						<option value="VERY_EASY">Very Easy (90-100)</option>
						<option value="EASY">Easy (80-90)</option>
						<option value="FAIRLY_EASY">Fairly Easy (70-80)</option>
						<option value="STANDARD">Standard (60-70)</option>
						<option value="FAIRLY_DIFFICULT">Fairly Difficult (50-60)</option>
						<option value="DIFFICULT">Difficult (30-50)</option>
						<option value="VERY_DIFFICULT">Very Difficult (0-30)</option>
					</select>
				</label>
			</div>
		</fieldset>

		<div class="flex justify-end gap-4 pt-4">
			{#if !book}
				<Button class="preset-tonal" type="reset">Reset</Button>
			{/if}
			<Button class="preset-filled-primary-500" disabled={loading}>
				{loading ? 'Saving...' : (book ? 'Save Changes' : 'Create Book')}
			</Button>
		</div>
	</Form>
</Card>
