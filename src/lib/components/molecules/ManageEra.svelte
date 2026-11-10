<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import TrashIcon from '@lucide/svelte/icons/trash-2';

	interface Era {
		id: string;
		name: string;
		slug: string;
		description: string | null;
		orderIndex?: number;
		universeId: string;
	}

	interface Universe {
		id: string;
		name: string;
	}

	interface Props {
		eras: Era[];
		universes: Universe[];
		onEdit: (era: Era) => void;
	}

	let { eras, universes, onEdit }: Props = $props();

	function getUniverseName(id: string) {
		return universes.find(u => u.id === id)?.name ?? 'Unknown';
	}
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto p-4">
	<table class="table w-full text-left">
		<thead>
			<tr class="border-surface-200-800 border-b">
				<th class="p-3">Order</th>
				<th class="p-3">Name</th>
				<th class="p-3">Universe</th>
				<th class="p-3 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-surface-200-800 divide-y">
			{#each eras as era (era.id)}
				<tr class="hover:preset-tonal-surface">
					<td class="p-3 opacity-75">{era.orderIndex}</td>
					<td class="p-3 font-medium">{era.name}</td>
					<td class="p-3">
						<Badge class="preset-tonal-secondary">{getUniverseName(era.universeId)}</Badge>
					</td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(era)} title="Edit">
								<EditIcon class="size-4" />
							</Button>
							<form method="POST" action="?/deleteEra">
								<input type="hidden" name="id" value={era.id} />
								<Button class="btn-icon btn-icon-sm preset-filled-error-500" title="Delete">
									<TrashIcon class="size-4" />
								</Button>
							</form>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4" class="p-6 text-center opacity-50">No eras found. Create one to get started.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
