<script lang="ts">
	import Tabs from '#lib/components/atoms/Tabs.svelte';
	import ManageChapter from '#lib/components/molecules/ManageChapter.svelte';
	import ChapterForm from '#lib/components/molecules/ChapterForm.svelte';
	import ManageArc from '#lib/components/molecules/ManageArc.svelte';
	import ArcForm from '#lib/components/molecules/ArcForm.svelte';

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
		chapters?: Chapter[];
		arcs?: Arc[];
		books?: Book[];
	}

	let { chapters = [], arcs = [], books = [] }: Props = $props();

	let activeTab = $state('manage-chapter');

	let editingChapter = $state<Chapter | null>(null);
	let editingArc = $state<Arc | null>(null);

	function startEditChapter(chapter: Chapter) {
		editingChapter = chapter;
		activeTab = 'edit-chapter';
	}

	function resetChapterView() {
		editingChapter = null;
		activeTab = 'manage-chapter';
	}

	function startEditArc(arc: Arc) {
		editingArc = arc;
		activeTab = 'edit-arc';
	}

	function resetArcView() {
		editingArc = null;
		activeTab = 'manage-arc';
	}

	let tabList = $derived([
		{ value: 'manage-chapter', label: 'Manage Chapters', content: manageChapterContent },
		{ value: 'create-chapter', label: 'Create Chapter', content: createChapterContent },
		...(activeTab === 'edit-chapter' && editingChapter ? [{ value: 'edit-chapter', label: 'Edit Chapter', content: editChapterContent }] : []),

		{ value: 'manage-arc', label: 'Manage Arcs', content: manageArcContent },
		{ value: 'create-arc', label: 'Create Arc', content: createArcContent },
		...(activeTab === 'edit-arc' && editingArc ? [{ value: 'edit-arc', label: 'Edit Arc', content: editArcContent }] : []),
	]);
</script>

{#snippet manageChapterContent()}
	<ManageChapter {chapters} {books} {arcs} onEdit={startEditChapter} />
{/snippet}

{#snippet createChapterContent()}
	<ChapterForm {books} {arcs} onSuccess={resetChapterView} />
{/snippet}

{#snippet editChapterContent()}
	<ChapterForm chapter={editingChapter} {books} {arcs} onSuccess={resetChapterView} onCancel={resetChapterView} />
{/snippet}

{#snippet manageArcContent()}
	<ManageArc {arcs} {books} onEdit={startEditArc} />
{/snippet}

{#snippet createArcContent()}
	<ArcForm {books} onSuccess={resetArcView} />
{/snippet}

{#snippet editArcContent()}
	<ArcForm arc={editingArc} {books} onSuccess={resetArcView} onCancel={resetArcView} />
{/snippet}

<Tabs bind:value={activeTab} tabs={tabList} />
