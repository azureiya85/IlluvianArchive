<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import DeleteDialog from '#lib/components/atoms/DeleteDialog.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';

	interface Universe {
		id: string;
		name: string;
		slug: string;
		description: string | null;
		coverImage?: string | null;
	}

	interface Props {
		universes: Universe[];
		onEdit: (universe: Universe) => void;
	}

	let { universes, onEdit }: Props = $props();
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto p-4">
	<table class="table w-full text-left">
		<thead>
			<tr class="border-surface-200-800 border-b">
				<th class="p-3">Name</th>
				<th class="p-3">Slug</th>
				<th class="p-3 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-surface-200-800 divide-y">
			{#each universes as universe (universe.id)}
				<tr class="hover:preset-tonal-surface">
					<td class="p-3 font-medium">{universe.name}</td>
					<td class="p-3 opacity-75">{universe.slug}</td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(universe)} title="Edit">
								<EditIcon class="size-4" />
							</Button>

							<DeleteDialog action="?/deleteUniverse" id={universe.id} />
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="3" class="p-6 text-center opacity-50">No universes found. Create one to get started.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
