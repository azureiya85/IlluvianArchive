<script lang="ts">
	import Tabs from '#lib/components/atoms/Tabs.svelte';
	import ManageUniverse from '#lib/components/molecules/ManageUniverse.svelte';
	import UniverseForm from '#lib/components/molecules/UniverseForm.svelte';
	import ManageEra from '#lib/components/molecules/ManageEra.svelte';
	import EraForm from '#lib/components/molecules/EraForm.svelte';

	interface Universe {
		id: string;
		name: string;
		slug: string;
		description: string | null;
		coverImage?: string | null;
	}

	interface Era {
		id: string;
		name: string;
		slug: string;
		description: string | null;
		orderIndex?: number;
		universeId: string;
	}

	let { universes = [], eras = [] }: { universes?: Universe[], eras?: Era[] } = $props();

	let activeTab = $state('manage-universe');

	let editingUniverse = $state<Universe | null>(null);
	let editingEra = $state<Era | null>(null);

	function startEditUniverse(universe: Universe) {
		editingUniverse = universe;
		activeTab = 'edit-universe';
	}

	function resetUniverseView() {
		editingUniverse = null;
		activeTab = 'manage-universe';
	}

	function startEditEra(era: Era) {
		editingEra = era;
		activeTab = 'edit-era';
	}

	function resetEraView() {
		editingEra = null;
		activeTab = 'manage-era';
	}

	let tabList = $derived([
		{ value: 'manage-universe', label: 'Manage Universes', content: manageUniverseContent },
		{ value: 'create-universe', label: 'Create Universe', content: createUniverseContent },
		...(activeTab === 'edit-universe' && editingUniverse ? [{ value: 'edit-universe', label: 'Edit Universe', content: editUniverseContent }] : []),

		{ value: 'manage-era', label: 'Manage Eras', content: manageEraContent },
		{ value: 'create-era', label: 'Create Era', content: createEraContent },
		...(activeTab === 'edit-era' && editingEra ? [{ value: 'edit-era', label: 'Edit Era', content: editEraContent }] : []),
	]);
</script>

{#snippet manageUniverseContent()}
	<ManageUniverse {universes} onEdit={startEditUniverse} />
{/snippet}

{#snippet createUniverseContent()}
	<UniverseForm onSuccess={resetUniverseView} />
{/snippet}

{#snippet editUniverseContent()}
	<UniverseForm universe={editingUniverse} onSuccess={resetUniverseView} onCancel={resetUniverseView} />
{/snippet}

{#snippet manageEraContent()}
	<ManageEra {eras} {universes} onEdit={startEditEra} />
{/snippet}

{#snippet createEraContent()}
	<EraForm {universes} onSuccess={resetEraView} />
{/snippet}

{#snippet editEraContent()}
	<EraForm era={editingEra} {universes} onSuccess={resetEraView} onCancel={resetEraView} />
{/snippet}

<Tabs bind:value={activeTab} tabs={tabList} />
