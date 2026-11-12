<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Accordion from '#lib/components/atoms/Accordion.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Tooltip from '#lib/components/atoms/Tooltip.svelte';
	import ListIcon from '@lucide/svelte/icons/list';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';

	export interface TocChapter {
		id: string;
		title: string;
		slug: string;
		arcName?: string | null;
		arcDesc?: string | null;
		publishedAt: Date | string | null;
	}

	interface Props {
		bookSlug: string;
		chapters: TocChapter[];
	}

	let { bookSlug, chapters }: Props = $props();

	let page = $state(1);
	let pageSize = $state(10);
	let sortDesc = $state(false);

	const accordionItems = [{ id: 'toc', title: 'Table of Contents' }];

	let sortedChapters = $derived(
		[...chapters].sort((a, b) => {
			const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
			const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
			return sortDesc ? dateB - dateA : dateA - dateB;
		})
	);

	let paginatedChapters = $derived(
		sortedChapters.slice((page - 1) * pageSize, page * pageSize)
	);

	function toggleSort() {
		sortDesc = !sortDesc;
		page = 1;
	}

	function onPageSizeChange(e: Event) {
		pageSize = Number((e.target as HTMLSelectElement).value);
		page = 1;
	}

	function formatDate(date: Date | string | null) {
		if (!date) return 'Unknown Date';
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(new Date(date));
	}
</script>

<Card class="preset-filled-surface-100-900 overflow-hidden">
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<ListIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">Table of Contents</h2>
	</header>

	<div class="p-2">
		<Accordion items={accordionItems} defaultValue={['toc']}>
			{#snippet content()}
				<div class="flex flex-wrap items-center justify-between gap-4 border-b border-surface-200-800 pb-4">
					<label class="flex items-center gap-2 text-sm font-medium">
						<span class="opacity-75">Show</span>
						<select class="select select-sm w-20 py-1" value={pageSize} onchange={onPageSizeChange}>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={40}>40</option>
						</select>
						<span class="opacity-75">entries</span>
					</label>

					<Button class="btn-sm preset-tonal" onclick={toggleSort}>
						<ArrowUpDownIcon class="mr-2 size-4" />
						{sortDesc ? 'Newest First' : 'Oldest First'}
					</Button>
				</div>

				<div class="mt-2 flex flex-col">
					<div class="hidden px-4 py-2 text-xs font-bold uppercase tracking-wider opacity-50 md:flex">
						<div class="flex-1">Chapter Name</div>
						<div class="w-1/4">Story Arc</div>
						<div class="w-1/4 text-right">Release Date</div>
					</div>

					{#each paginatedChapters as chapter (chapter.id)}
						<a
							href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', {
								bookSlug,
								chapterSlug: chapter.slug
							})}
							class="group flex flex-col justify-between gap-1 border-b border-surface-200-800/50 p-4 transition-colors duration-200 hover:bg-surface-200-800 last:border-0 md:flex-row md:items-center md:gap-4 rounded-container"
						>
							<div class="flex-1 truncate text-lg font-bold transition-colors group-hover:text-primary-500 md:text-base">
								{chapter.title}
							</div>
							<!-- Tooltip for Arc Name -->
							<div class="truncate md:w-1/4">
								<Tooltip text={chapter.arcDesc}>
									{#snippet trigger()}
										<span class="text-sm font-medium opacity-75 transition-colors group-hover:text-primary-400">
											{chapter.arcName || '-'}
										</span>
									{/snippet}
								</Tooltip>
							</div>

							<div class="text-sm opacity-60 transition-colors group-hover:opacity-100 md:w-1/4 md:text-right">
								{formatDate(chapter.publishedAt)}
							</div>
						</a>
					{:else}
						<div class="p-8 text-center opacity-50">
							No published chapters available yet.
						</div>
					{/each}
				</div>

				{#if chapters.length > pageSize}
					<div class="mt-4 border-t border-surface-200-800 pt-2">
						<Pagination count={chapters.length} {pageSize} bind:page={page} onPageChange={(p) => page = p} />
					</div>
				{/if}
			{/snippet}
		</Accordion>
	</div>
</Card>
