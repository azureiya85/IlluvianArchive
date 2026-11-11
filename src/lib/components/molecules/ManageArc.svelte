<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import TrashIcon from '@lucide/svelte/icons/trash-2';

	interface Arc {
		id: string;
		title: string;
		slug: string;
		description?: string | null;
		coverImage?: string | null;
		orderIndex: number;
		bookId: string;
	}

	interface Book { id: string; title: string; }

	interface Props {
		arcs: Arc[];
		books: Book[];
		onEdit: (arc: Arc) => void;
	}

	let { arcs, books, onEdit }: Props = $props();

	function getBookTitle(id: string) {
		return books.find(b => b.id === id)?.title ?? 'Unknown Book';
	}
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto p-4">
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
			{#each arcs as arc (arc.id)}
				<tr class="hover:preset-tonal-surface">
					<td class="p-3 opacity-75">{arc.orderIndex}</td>
					<td class="p-3">
						<div class="font-medium">{arc.title}</div>
						<div class="text-xs opacity-60">{arc.slug}</div>
					</td>
					<td class="p-3">
						<Badge class="preset-tonal-secondary">{getBookTitle(arc.bookId)}</Badge>
					</td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(arc)} title="Edit">
								<EditIcon class="size-4" />
							</Button>
							<form method="POST" action="?/deleteArc">
								<input type="hidden" name="id" value={arc.id} />
								<Button class="btn-icon btn-icon-sm preset-filled-error-500" title="Delete">
									<TrashIcon class="size-4" />
								</Button>
							</form>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4" class="p-6 text-center opacity-50">No story arcs found. Create one to get started.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
