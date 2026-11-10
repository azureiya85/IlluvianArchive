<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import TrashIcon from '@lucide/svelte/icons/trash-2';

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
	}

	interface Props {
		books: Book[];
		onEdit: (book: Book) => void;
	}

	let { books, onEdit }: Props = $props();
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto p-4">
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
			{#each books as book (book.id)}
				<tr class="hover:preset-tonal-surface">
					<td class="p-3">
						<div class="font-medium">{book.title}</div>
						<div class="text-xs opacity-60">{book.slug}</div>
					</td>
					<td class="p-3 opacity-75">{book.wordCount?.toLocaleString() ?? 0}</td>
					<td class="p-3">
						<Badge class="preset-tonal-secondary">{book.type.replace('_', ' ')}</Badge>
					</td>
					<td class="p-3">
						<Badge class={book.status === 'PUBLISHED' ? 'preset-tonal-success' : 'preset-tonal-warning'}>
							{book.status}
						</Badge>
					</td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(book)} title="Edit">
								<EditIcon class="size-4" />
							</Button>
							<form method="POST" action="?/deleteBook">
								<input type="hidden" name="id" value={book.id} />
								<Button class="btn-icon btn-icon-sm preset-filled-error-500" title="Delete">
									<TrashIcon class="size-4" />
								</Button>
							</form>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="5" class="p-6 text-center opacity-50">No books found. Create one to get started.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
