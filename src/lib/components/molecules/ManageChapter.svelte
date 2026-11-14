<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import DeleteDialog from '#lib/components/atoms/DeleteDialog.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import SearchField from '#lib/components/atoms/SearchField.svelte';
	import SortField, { type SortOption as SortFieldOption } from '#lib/components/atoms/SortField.svelte';
	import FilterField, { type FilterOption } from '#lib/components/atoms/FilterField.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import FilterIcon from '@lucide/svelte/icons/list-filter';
	import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
	import type { Chapter } from '#lib/components/molecules/ChapterForm.svelte';
	import { availableStoryTypes, filterAndSortChapters, type SortOption } from '#lib/utils/Filter.ts';

	interface Book { id: string; title: string; slug: string; type: string; }
	interface Arc { id: string; title: string; bookId?: string; }

	interface Props {
		chapters: Chapter[];
		books: Book[];
		arcs: Arc[];
		onEdit: (chapter: Chapter) => void;
	}

	let { chapters, books, arcs, onEdit }: Props = $props();

	// Filter & Search State
	let searchQuery = $state('');
	let selectedStoryType = $state('');
	let selectedBookId = $state('');
	let selectedArcId = $state('');
	let selectedStatus = $state('');
	let sortBy = $state<SortOption>('order-asc');

	const sortOptions: SortFieldOption<SortOption>[] = [
		{ value: 'order-asc', label: 'Order (Low to High)' },
		{ value: 'order-desc', label: 'Order (High to Low)' },
		{ value: 'date-desc', label: 'Published (Newest First)' },
		{ value: 'date-asc', label: 'Published (Oldest First)' },
		{ value: 'title-asc', label: 'Title (A - Z)' },
		{ value: 'title-desc', label: 'Title (Z - A)' }
	];

	const statusOptions: FilterOption[] = [
		{ value: 'DRAFT', label: 'Draft' },
		{ value: 'PUBLISHED', label: 'Published' },
		{ value: 'ARCHIVED', label: 'Archived' }
	];

	let availableArcs = $derived(
		selectedBookId ? arcs.filter((a) => a.bookId === selectedBookId) : arcs
	);

	let bookFilterOptions = $derived<FilterOption[]>(
		books.map((b) => ({ value: b.id, label: b.title }))
	);

	let arcFilterOptions = $derived<FilterOption[]>(
		availableArcs.map((a) => ({ value: a.id, label: a.title }))
	);

	let filteredChapters = $derived(
		filterAndSortChapters(chapters, books, arcs, {
			searchQuery,
			storyType: selectedStoryType,
			bookId: selectedBookId,
			arcId: selectedArcId,
			status: selectedStatus,
			sortBy
		})
	);

	let hasActiveFilters = $derived(
		Boolean(searchQuery || selectedStoryType || selectedBookId || selectedArcId || selectedStatus || sortBy !== 'order-asc')
	);

	function resetFilters() {
		searchQuery = '';
		selectedStoryType = '';
		selectedBookId = '';
		selectedArcId = '';
		selectedStatus = '';
		sortBy = 'order-asc';
	}

	function getBookTitle(id: string) { return books.find((b) => b.id === id)?.title ?? 'Unknown Book'; }
	function getBookSlug(id: string) { return books.find((b) => b.id === id)?.slug ?? ''; }
	function getArcTitle(id?: string | null) { return id ? arcs.find((a) => a.id === id)?.title : null; }

	// Pagination
	let page = $state(1);
	const PAGE_SIZE = 10;

	$effect(() => {
		const _deps = [searchQuery, selectedStoryType, selectedBookId, selectedArcId, selectedStatus, sortBy];
		if (_deps) page = 1;
	});

	let paginatedChapters = $derived(
		filteredChapters.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	);
</script>

<Card class="overflow-hidden preset-filled-surface-100-900 !rounded-sm">
	<!-- Filter & Search Controls Bar -->
	<div class="space-y-4 border-b border-surface-200-800 bg-surface-50-950 p-4">
		<!-- Search and Sort -->
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
			<SearchField
				bind:value={searchQuery}
				placeholder="Search title, slug, summary, book, or arc..."
			/>
			<SortField
				bind:value={sortBy}
				options={sortOptions}
			/>
		</div>

		<!-- Multi-Filter Selects -->
		<div class="flex flex-wrap items-center gap-3 pt-1">
			<div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-60">
				<FilterIcon class="size-3.5" />
				<span>Filter:</span>
			</div>

			<FilterField
				bind:value={selectedStoryType}
				options={availableStoryTypes}
				placeholder="All Story Types"
			/>

			<FilterField
				bind:value={selectedBookId}
				options={bookFilterOptions}
				placeholder="All Books"
			/>

			<FilterField
				bind:value={selectedArcId}
				options={arcFilterOptions}
				placeholder="All Arcs"
			/>

			<FilterField
				bind:value={selectedStatus}
				options={statusOptions}
				placeholder="All Statuses"
			/>

			{#if hasActiveFilters}
				<Button
					class="btn-sm flex items-center gap-1 text-xs preset-tonal-error !rounded-sm"
					onclick={resetFilters}
					title="Reset Filters"
				>
					<RotateCcwIcon class="size-3" />
					<span>Reset</span>
				</Button>
			{/if}

			<div class="ml-auto text-xs font-medium opacity-60">
				Showing {filteredChapters.length} of {chapters.length} chapters
			</div>
		</div>
	</div>

	<!-- Table Area -->
	<div class="overflow-x-auto">
		<table class="table w-full text-left">
			<thead>
				<tr class="border-b border-surface-200-800">
					<th class="p-3">Order</th>
					<th class="p-3">Title</th>
					<th class="p-3">Book & Arc</th>
					<th class="p-3">Status</th>
					<th class="p-3 text-right">Actions</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-surface-200-800">
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
								<Badge class="preset-tonal-secondary !rounded-sm">{getBookTitle(chapter.bookId)}</Badge>
								{#if arcTitle}<Badge class="preset-tonal-tertiary !rounded-sm text-xs">{arcTitle}</Badge>{/if}
							</div>
						</td>
						<td class="p-3">
							<Badge class="!rounded-sm {chapter.status === 'PUBLISHED' ? 'preset-tonal-success' : 'preset-tonal-warning'}">
								{chapter.status}
							</Badge>
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
									<Button class="btn-icon btn-icon-sm preset-filled-surface-500 hover:preset-filled-secondary-500 !rounded-sm" type="button">
										<EyeIcon class="size-4" />
									</Button>
								</a>
								<Button class="btn-icon btn-icon-sm preset-filled-primary-500 !rounded-sm" onclick={() => onEdit(chapter)} title="Edit">
									<EditIcon class="size-4" />
								</Button>
								<DeleteDialog action="?/deleteChapter" id={chapter.id} />
							</div>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="5" class="p-8 text-center opacity-60">
							{#if hasActiveFilters}
								No chapters match your selected filters.
							{:else}
								No chapters found. Create one to get started.
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Pagination -->
	{#if filteredChapters.length > PAGE_SIZE}
		<Pagination
			count={filteredChapters.length}
			pageSize={PAGE_SIZE}
			bind:page={page}
			onPageChange={(p) => (page = p)}
		/>
	{/if}
</Card>
