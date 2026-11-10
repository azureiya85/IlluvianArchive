<script lang="ts">
	import Tabs from '#lib/components/atoms/Tabs.svelte';
	import ManageCharacter from '#lib/components/molecules/ManageCharacter.svelte';
	import CharacterForm from '#lib/components/molecules/CharacterForm.svelte';

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

	let { characters = [], universes = [] }: { characters?: Character[], universes?: Universe[] } = $props();

	let activeTab = $state('manage');
	let editingCharacter = $state<Character | null>(null);

	function startEdit(character: Character) {
		editingCharacter = character;
		activeTab = 'edit';
	}

	function resetView() {
		editingCharacter = null;
		activeTab = 'manage';
	}

	let tabList = $derived([
		{ value: 'manage', label: 'Manage Characters', content: manageContent },
		{ value: 'create', label: 'Create Character', content: createContent },
		...(activeTab === 'edit' && editingCharacter
			? [{ value: 'edit', label: 'Edit Character', content: editContent }]
			: [])
	]);
</script>

{#snippet manageContent()}
	<ManageCharacter {characters} {universes} onEdit={startEdit} />
{/snippet}

{#snippet createContent()}
	<CharacterForm {universes} onSuccess={resetView} />
{/snippet}

{#snippet editContent()}
	<CharacterForm character={editingCharacter} {universes} onSuccess={resetView} onCancel={resetView} />
{/snippet}

<Tabs bind:value={activeTab} tabs={tabList} />
