<script lang="ts">
	import Tabs from '#lib/components/atoms/Tabs.svelte';
	import ManageBook from '#lib/components/molecules/ManageBook.svelte';
	import BookForm from '#lib/components/molecules/BookForm.svelte';
	import ManageTag from '#lib/components/molecules/ManageTag.svelte';

	interface Book {
		id: string;
		title: string;
		slug: string;
		description: string;
		author: string;
		type: string;
		status: string;
		coverImage?: string | null;
		wordCount?: number;
		readingEase?: number | null;
		readingLevel?: string | null;
		publishedAt?: Date | null;
		universeId?: string | null;
		eraId?: string | null;
		tags?: { tagId: string }[];
	}

	interface Tag { id: string; name: string; slug: string; }
	interface Universe { id: string; name: string; }
	interface Era { id: string; name: string; universeId: string; }

	interface Props {
		books?: Book[];
		tags?: Tag[];
		universes?: Universe[];
		eras?: Era[];
	}

	let { books = [], tags = [], universes = [], eras = [] }: Props = $props();

	let activeTab = $state('manage');
	let editingBook = $state<Book | null>(null);

	function startEdit(book: Book) {
		editingBook = book;
		activeTab = 'edit';
	}

	function resetView() {
		editingBook = null;
		activeTab = 'manage';
	}

	let tabList = $derived([
		{ value: 'manage', label: 'Manage Books', content: manageContent },
		{ value: 'create', label: 'Create Book', content: createContent },
		{ value: 'tags', label: 'Tag List', content: tagsContent },
		...(activeTab === 'edit' && editingBook
			? [{ value: 'edit', label: 'Edit Book', content: editContent }]
			: [])
	]);
</script>

{#snippet manageContent()}
	<ManageBook {books} onEdit={startEdit} />
{/snippet}

{#snippet createContent()}
	<BookForm {tags} {universes} {eras} onSuccess={resetView} />
{/snippet}

{#snippet editContent()}
	<BookForm book={editingBook} {tags} {universes} {eras} onSuccess={resetView} onCancel={resetView} />
{/snippet}

{#snippet tagsContent()}
	<ManageTag {tags} />
{/snippet}

<Tabs bind:value={activeTab} tabs={tabList} />
