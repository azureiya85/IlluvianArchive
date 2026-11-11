<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import DeleteDialog from '#lib/components/atoms/DeleteDialog.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import StarIcon from '@lucide/svelte/icons/star';

	interface Tag { id: string; name: string; slug: string; }
	interface Book {
		id: string; title: string; slug: string; description: string; author: string; type: string; status: string;
		coverImage?: string | null; wordCount?: number; readingEase?: number | null; readingLevel?: string | null;
		publishedAt?: Date | null; universeId?: string | null; eraId?: string | null; tags?: { tagId: string }[];
	}

	interface Props {
		books: Book[];
		tags: Tag[];
		onEdit: (book: Book) => void;
	}

	let { books, tags, onEdit }: Props = $props();

	let favoriteTagId = $derived(
		tags.find(t => t.slug === 'favorite' || t.name.toLowerCase() === 'favorite')?.id
	);

	function isFavorite(book: Book) {
		if (!favoriteTagId || !book.tags) return false;
		return book.tags.some(t => t.tagId === favoriteTagId);
	}

	// Pagination Logic
	let page = $state(1);
	const PAGE_SIZE = 10;

	// Reset to page 1 if the total number of books changes (e.g., search/filter or deletion)
	$effect(() => { if (books) page = 1; });

	let paginatedBooks = $derived(books.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto">
	<table class="table w-full text-left">
		<thead>
			<tr class="border-surface-200-800 border-b">
				<th class="p-3">Title</th>
				<th class="p-3">Words</th>
				<th class="p-3">Type</th>
				<th class="p-3">Status</th>
				<th class="p-3 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-surface-200-800 divide-y">
			{#each paginatedBooks as book (book.id)}
				{@const featured = isFavorite(book)}
				<tr class="hover:preset-tonal-surface {featured ? 'bg-surface-200-800/40' : ''}">
					<td class="p-3">
						<div class="flex items-center gap-2 font-medium">
							{book.title}
							{#if featured}<StarIcon class="size-3 fill-tertiary-500 text-tertiary-500" />{/if}
						</div>
						<div class="text-xs opacity-60">{book.slug}</div>
					</td>
					<td class="p-3 opacity-75">{book.wordCount?.toLocaleString() ?? 0}</td>
					<td class="p-3"><Badge class="preset-tonal-secondary">{book.type.replace('_', ' ')}</Badge></td>
					<td class="p-3">
						<Badge class={book.status === 'PUBLISHED' ? 'preset-tonal-success' : 'preset-tonal-warning'}>{book.status}</Badge>
					</td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(book)} title="Edit"><EditIcon class="size-4" /></Button>
							<DeleteDialog action="?/deleteBook" id={book.id} />
						</div>
					</td>
				</tr>
			{:else}
				<tr><td colspan="5" class="p-6 text-center opacity-50">No books found. Create one to get started.</td></tr>
			{/each}
		</tbody>
	</table>

	<Pagination
		count={books.length}
		pageSize={PAGE_SIZE}
		bind:page={page}
		onPageChange={(p) => page = p}
	/>
</Card>
