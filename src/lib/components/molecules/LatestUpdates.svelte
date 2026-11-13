<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import FilterIcon from '@lucide/svelte/icons/list-filter';
	import { directImageUrl } from '#lib/utils/image.ts';
	import { availableStoryTypes, formatStoryType } from '#lib/utils/Filter.ts';
	import type { LatestChapter } from '#lib/types/landing.ts';
	import { navigating } from '$app/state';
	import Loading from '#lib/components/atoms/Loading.svelte';
	import { page as pageState } from '$app/state';


	interface FilterOptions {
		books: { title: string; slug: string }[];
		currentType: string;
		currentBook: string;
	}

	interface Props {
		chapters: LatestChapter[];
		page: number;
		pageSize: number;
		total: number;
		filters: FilterOptions;
	}

	let { chapters, page, pageSize, total, filters }: Props = $props();

	let selectedType = $derived(filters.currentType);
	let selectedBook = $derived(filters.currentBook);
	let isLoading = $derived(navigating.to?.route.id === '/');

	const PLACEHOLDER_IMAGE =
		'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400&h=600';

	function navigate(query: Record<string, string>) {
		const params = new URLSearchParams(query);
		goto(resolve(`/?${params.toString()}`), { reset: false });
	}

	function applyFilters() {
		navigate({
			page: '1',
			...(selectedType ? { type: selectedType } : {}),
			...(selectedBook ? { book: selectedBook } : {})
		});
	}

	function changePage(p: number) {
		navigate({
			...Object.fromEntries(pageState.url.searchParams),
			page: String(p)
		});
	}
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-6xl overflow-hidden rounded-sm">
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<SparklesIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">Latest Updates</h2>
	</header>

	<div class="flex flex-col gap-4 border-b border-surface-200-800 bg-surface-50-950 p-4 md:flex-row md:items-center">
		<div class="flex items-center gap-2 font-bold opacity-70">
			<FilterIcon class="size-4" />
			<span class="text-sm uppercase tracking-widest">Filter By</span>
		</div>

		<div class="flex flex-1 flex-col gap-3 sm:flex-row">
			<select
				class="select rounded-sm bg-surface-100-900 py-1 text-sm font-medium"
				bind:value={selectedType}
				onchange={applyFilters}
			>
				<option value="">All Story Types</option>
				<!-- Added Key (type.value) -->
				{#each availableStoryTypes as type (type.value)}
					<option value={type.value}>{type.label}</option>
				{/each}
			</select>

			<select
				class="select rounded-sm bg-surface-100-900 py-1 text-sm font-medium"
				bind:value={selectedBook}
				onchange={applyFilters}
			>
				<option value="">All Books</option>
				<!-- Added Key (book.slug) -->
				{#each filters.books as book (book.slug)}
					<option value={book.slug}>{book.title}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="relative p-6" aria-busy={isLoading}>
		{#if isLoading}
			<Loading overlay label="Loading chapters" />
		{/if}

		<div class:opacity-50={isLoading} class="transition-opacity duration-150">
			{#if chapters.length > 0}
			<div class="divide-surface-200-800 divide-y">
				{#each chapters as chapter (chapter.id)}
					<div class="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
						<a href={resolve('/books/[bookSlug]', { bookSlug: chapter.book.slug })} class="shrink-0 transition-transform duration-200 hover:scale-105">
							<img src={directImageUrl(chapter.book.coverImage) || PLACEHOLDER_IMAGE} alt={chapter.book.title} class="aspect-2/3 w-12 rounded-none object-cover shadow-sm md:w-14" />
						</a>

						<div class="flex min-w-0 flex-1 flex-col justify-center gap-1">
							<a href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', { bookSlug: chapter.book.slug, chapterSlug: chapter.slug })} class="truncate text-lg font-extrabold transition-colors duration-200 hover:text-primary-500 md:text-xl">
								{chapter.title}
							</a>
							<a href={resolve('/books/[bookSlug]', { bookSlug: chapter.book.slug })} class="truncate text-sm font-medium opacity-80 transition-colors duration-200 hover:text-primary-500 md:text-base">
								{chapter.book.title}
							</a>
						</div>

						<Badge class="preset-tonal-secondary ml-auto shrink-0 rounded-sm text-xs uppercase tracking-wider">
							{formatStoryType(chapter.book.type)}
						</Badge>
					</div>
				{/each}
			</div>

			{#if total > pageSize}
				<Pagination count={total} {pageSize} {page} onPageChange={changePage} class="mt-6 border-t border-surface-200-800 pt-4" />
			{/if}
		{:else}
			<div class="flex flex-col items-center justify-center py-8 text-center opacity-60">
				<BookOpenIcon class="mb-2 size-10" />
				<p class="font-medium">No chapters found for these filters.</p>
				<button class="mt-2 text-sm text-primary-500 hover:underline" onclick={() => { selectedType = ''; selectedBook = ''; applyFilters(); }}>
					Clear filters
				</button>
			</div>
		{/if}
	</div>
	</div>
</Card>
