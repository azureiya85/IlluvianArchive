<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import EyeIcon from '@lucide/svelte/icons/eye';

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

	interface Book { id: string; title: string; slug: string; }
	interface Arc { id: string; title: string; }

	interface Props {
		chapters: Chapter[];
		books: Book[];
		arcs: Arc[];
		onEdit: (chapter: Chapter) => void;
	}

	let { chapters, books, arcs, onEdit }: Props = $props();

	function getBookTitle(id: string) {
		return books.find(b => b.id === id)?.title ?? 'Unknown Book';
	}

	function getBookSlug(id: string) {
		return books.find(b => b.id === id)?.slug ?? '';
	}

	function getArcTitle(id?: string | null) {
		if (!id) return null;
		return arcs.find(a => a.id === id)?.title;
	}
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto p-4">
	<table class="table w-full text-left">
		<thead>
			<tr class="border-surface-200-800 border-b">
				<th class="p-3">Order</th>
				<th class="p-3">Title</th>
				<th class="p-3">Book & Arc</th>
				<th class="p-3">Status</th>
				<th class="p-3 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-surface-200-800 divide-y">
			{#each chapters as chapter (chapter.id)}
				{@const arcTitle = getArcTitle(chapter.arcId)}
				{@const bookSlug = getBookSlug(chapter.bookId)}
				<tr class="hover:preset-tonal-surface">
					<td class="p-3 opacity-75">{chapter.orderIndex}</td>
					<td class="p-3">
						<div class="font-medium">{chapter.title}</div>
						<div class="text-xs opacity-60">{chapter.slug}</div>
					</td>
					<td class="p-3">
						<div class="flex flex-col items-start gap-1">
							<Badge class="preset-tonal-secondary">{getBookTitle(chapter.bookId)}</Badge>
							{#if arcTitle}
								<Badge class="preset-tonal-tertiary text-xs">{arcTitle}</Badge>
							{/if}
						</div>
					</td>
					<td class="p-3">
						<Badge class={chapter.status === 'PUBLISHED' ? 'preset-tonal-success' : 'preset-tonal-warning'}>
							{chapter.status}
						</Badge>
					</td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
						<a
							href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', {
								bookSlug,
								chapterSlug: chapter.slug
							})}
							target="_blank"
							title="View Chapter"
						>
								<Button class="btn-icon btn-icon-sm preset-filled-surface-500 hover:preset-filled-secondary-500" type="button">
									<EyeIcon class="size-4" />
								</Button>
							</a>

							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(chapter)} title="Edit">
								<EditIcon class="size-4" />
							</Button>

							<form method="POST" action="?/deleteChapter">
								<input type="hidden" name="id" value={chapter.id} />
								<Button class="btn-icon btn-icon-sm preset-filled-error-500" title="Delete">
									<TrashIcon class="size-4" />
								</Button>
							</form>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="5" class="p-6 text-center opacity-50">No chapters found. Create one to get started.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
