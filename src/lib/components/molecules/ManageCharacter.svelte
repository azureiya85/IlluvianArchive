<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import TrashIcon from '@lucide/svelte/icons/trash-2';

	interface Character {
		id: string;
		name: string;
		description?: string | null;
		image?: string | null;
		universeId?: string | null;
	}

	interface Universe {
		id: string;
		name: string;
	}

	interface Props {
		characters: Character[];
		universes: Universe[];
		onEdit: (character: Character) => void;
	}

	let { characters, universes, onEdit }: Props = $props();

	function getUniverseName(id?: string | null) {
		if (!id) return 'None';
		return universes.find(u => u.id === id)?.name ?? 'Unknown';
	}
</script>

<Card class="preset-filled-surface-100-900 overflow-x-auto p-4">
	<table class="table w-full text-left">
		<thead>
			<tr class="border-surface-200-800 border-b">
				<th class="p-3">Name</th>
				<th class="p-3">Universe</th>
				<th class="p-3 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-surface-200-800 divide-y">
			{#each characters as character (character.id)}
				<tr class="hover:preset-tonal-surface">
					<td class="p-3 font-medium">{character.name}</td>
					<td class="p-3">
						{#if character.universeId}
							<Badge class="preset-tonal-secondary">{getUniverseName(character.universeId)}</Badge>
						{:else}
							<span class="opacity-50 text-sm">Standalone</span>
						{/if}
					</td>
					<td class="p-3 text-right">
						<div class="flex justify-end gap-2">
							<Button class="btn-icon btn-icon-sm preset-filled-primary-500" onclick={() => onEdit(character)} title="Edit">
								<EditIcon class="size-4" />
							</Button>
							<form method="POST" action="?/deleteCharacter">
								<input type="hidden" name="id" value={character.id} />
								<Button class="btn-icon btn-icon-sm preset-filled-error-500" title="Delete">
									<TrashIcon class="size-4" />
								</Button>
							</form>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="3" class="p-6 text-center opacity-50">No characters found. Create one to get started.</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
