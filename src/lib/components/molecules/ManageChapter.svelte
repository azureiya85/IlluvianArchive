<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import DeleteDialog from '#lib/components/atoms/DeleteDialog.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import EyeIcon from '@lucide/svelte/icons/eye';

	interface Chapter { id: string; title: string; slug: string; summary?: string | null; content: string; orderIndex: number; status: string; wordCount: number; publishedAt?: Date | null; bookId: string; arcId?: string | null; }
	interface Book { id: string; title: string; slug: string; }
	interface Arc { id: string; title: string; }

	interface Props { chapters: Chapter[]; books: Book[]; arcs: Arc[]; onEdit: (chapter: Chapter) => void; }

	let { chapters, books, arcs, onEdit }: Props = $props();

	function getBookTitle(id: string) { return books.find(b => b.id === id)?.title ?? 'Unknown Book'; }
	function getBookSlug(id: string) { return books.find(b => b.id === id)?.slug ?? ''; }
	function getArcTitle(id?: string | null) { return id ? arcs.find(a => a.id === id)?.title : null; }

	let page = $state(1);
	const PAGE_SIZE = 10;
	$effect(() => { if (chapters) page = 1; });
	let paginatedChapters = $derived(chapters.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto">
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
			{#each paginatedChapters as chapter (chapter.id)}
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
							{#if arcTitle}<Badge class="preset-tonal-tertiary text-xs">{arcTitle}</Badge>{/if}
						</div>
					</td>
					<td class="p-3">
						<Badge class={chapter.status === 'PUBLISHED' ? 'preset-tonal-success' : 'preset-tonal-warning'}>{chapter.status}</Badge>
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
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(chapter)} title="Edit"><EditIcon class="size-4" /></Button>
							<DeleteDialog action="?/deleteChapter" id={chapter.id} />
						</div>
					</td>
				</tr>
			{:else}
				<tr><td colspan="5" class="p-6 text-center opacity-50">No chapters found. Create one to get started.</td></tr>
			{/each}
		</tbody>
	</table>

	<Pagination count={chapters.length} pageSize={PAGE_SIZE} bind:page={page} onPageChange={(p) => page = p} />
</Card>
