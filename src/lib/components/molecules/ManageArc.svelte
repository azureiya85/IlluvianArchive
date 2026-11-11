<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import DeleteDialog from '#lib/components/atoms/DeleteDialog.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';

	interface Arc { id: string; title: string; slug: string; description?: string | null; coverImage?: string | null; orderIndex: number; bookId: string; }
	interface Book { id: string; title: string; }

	interface Props { arcs: Arc[]; books: Book[]; onEdit: (arc: Arc) => void; }

	let { arcs, books, onEdit }: Props = $props();

	function getBookTitle(id: string) { return books.find(b => b.id === id)?.title ?? 'Unknown Book'; }

	let page = $state(1);
	const PAGE_SIZE = 10;
	$effect(() => { if (arcs) page = 1; });
	let paginatedArcs = $derived(arcs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto">
	<table class="table w-full text-left">
		<thead>
			<tr class="border-surface-200-800 border-b">
				<th class="p-3">Order</th>
				<th class="p-3">Title</th>
				<th class="p-3">Book</th>
				<th class="p-3 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-surface-200-800 divide-y">
			{#each paginatedArcs as arc (arc.id)}
				<tr class="hover:preset-tonal-surface">
					<td class="p-3 opacity-75">{arc.orderIndex}</td>
					<td class="p-3">
						<div class="font-medium">{arc.title}</div>
						<div class="text-xs opacity-60">{arc.slug}</div>
					</td>
					<td class="p-3"><Badge class="preset-tonal-secondary">{getBookTitle(arc.bookId)}</Badge></td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(arc)} title="Edit"><EditIcon class="size-4" /></Button>
							<DeleteDialog action="?/deleteArc" id={arc.id} />
						</div>
					</td>
				</tr>
			{:else}
				<tr><td colspan="4" class="p-6 text-center opacity-50">No story arcs found. Create one to get started.</td></tr>
			{/each}
		</tbody>
	</table>

	<Pagination count={arcs.length} pageSize={PAGE_SIZE} bind:page={page} onPageChange={(p) => page = p} />
</Card>
