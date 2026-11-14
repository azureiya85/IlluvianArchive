<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import DeleteDialog from '#lib/components/atoms/DeleteDialog.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import EditIcon from '@lucide/svelte/icons/pencil';
	import SearchIcon from '@lucide/svelte/icons/search';
	import FilterIcon from '@lucide/svelte/icons/list-filter';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
	import type { Arc } from '#lib/components/molecules/ArcForm.svelte';
	import { filterAndSortArcs, type ArcSortOption } from '#lib/utils/Filter.ts';

	interface Book { id: string; title: string; }

	interface Props {
		arcs: Arc[];
		books: Book[];
		onEdit: (arc: Arc) => void;
	}

	let { arcs, books, onEdit }: Props = $props();

	// Search & Filter State
	let searchQuery = $state('');
	let selectedBookId = $state('');
	let sortBy = $state<ArcSortOption>('order-asc');

	let filteredArcs = $derived(
		filterAndSortArcs(arcs, books, {
			searchQuery,
			bookId: selectedBookId,
			sortBy
		})
	);

	let hasActiveFilters = $derived(Boolean(searchQuery || selectedBookId || sortBy !== 'order-asc'));

	function resetFilters() {
		searchQuery = '';
		selectedBookId = '';
		sortBy = 'order-asc';
	}

	function getBookTitle(id: string) {
		return books.find((b) => b.id === id)?.title ?? 'Unknown Book';
	}

	// Pagination
	let page = $state(1);
	const PAGE_SIZE = 10;

	$effect(() => {
		const _deps = [searchQuery, selectedBookId, sortBy];
		if (_deps) page = 1;
	});

	let paginatedArcs = $derived(
		filteredArcs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	);
</script>

<Card class="preset-filled-surface-100-900 overflow-hidden rounded-sm">
	<!-- Filter & Search Controls Bar -->
	<div class="space-y-4 border-b border-surface-200-800 bg-surface-50-950 p-4">
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
			<!-- Search Bar -->
			<div class="relative flex-1">
				<SearchIcon class="absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-50" />
				<input
					type="text"
					class="input pl-9 rounded-sm bg-surface-100-900 text-sm"
					placeholder="Search arc title, slug, or book..."
					bind:value={searchQuery}
				/>
			</div>

			<!-- Sort By -->
			<div class="flex items-center gap-2">
				<ArrowUpDownIcon class="size-4 shrink-0 opacity-50" />
				<select class="select rounded-sm bg-surface-100-900 text-sm" bind:value={sortBy}>
					<option value="order-asc">Order (Low to High)</option>
					<option value="order-desc">Order (High to Low)</option>
					<option value="title-asc">Title (A - Z)</option>
					<option value="title-desc">Title (Z - A)</option>
				</select>
			</div>
		</div>

		<!-- Filter by Book -->
		<div class="flex flex-wrap items-center gap-3 pt-1">
			<div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-60">
				<FilterIcon class="size-3.5" />
				<span>Filter:</span>
			</div>

			<select class="select rounded-sm bg-surface-100-900 py-1 text-xs" bind:value={selectedBookId}>
				<option value="">All Books</option>
				{#each books as b (b.id)}
					<option value={b.id}>{b.title}</option>
				{/each}
			</select>

			{#if hasActiveFilters}
				<Button
					class="btn-sm preset-tonal-error rounded-sm flex items-center gap-1 text-xs"
					onclick={resetFilters}
					title="Reset Filters"
				>
					<RotateCcwIcon class="size-3" />
					<span>Reset</span>
				</Button>
			{/if}

			<div class="ml-auto text-xs font-medium opacity-60">
				Showing {filteredArcs.length} of {arcs.length} story arcs
			</div>
		</div>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="table w-full text-left">
			<thead>
				<tr class="border-b border-surface-200-800">
					<th class="p-3">Order</th>
					<th class="p-3">Title</th>
					<th class="p-3">Book</th>
					<th class="p-3 text-right">Actions</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-surface-200-800">
				{#each paginatedArcs as arc (arc.id)}
					<tr class="hover:preset-tonal-surface">
						<td class="p-3 opacity-75">{arc.orderIndex}</td>
						<td class="p-3">
							<div class="font-medium">{arc.title}</div>
							<div class="text-xs opacity-60">{arc.slug}</div>
						</td>
						<td class="p-3">
							<Badge class="preset-tonal-secondary rounded-sm">{getBookTitle(arc.bookId)}</Badge>
						</td>
						<td class="p-3 text-right">
							<div class="flex justify-end gap-2">
								<Button class="btn-icon btn-icon-sm preset-filled-primary-500 rounded-sm" onclick={() => onEdit(arc)} title="Edit">
									<EditIcon class="size-4" />
								</Button>
								<DeleteDialog action="?/deleteArc" id={arc.id} />
							</div>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="4" class="p-8 text-center opacity-60">
							{#if hasActiveFilters}
								No story arcs match your selected filters.
							{:else}
								No story arcs found. Create one to get started.
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if filteredArcs.length > PAGE_SIZE}
		<Pagination
			count={filteredArcs.length}
			pageSize={PAGE_SIZE}
			bind:page={page}
			onPageChange={(p) => (page = p)}
		/>
	{/if}
</Card>
