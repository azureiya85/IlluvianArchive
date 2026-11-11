<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Pagination from '#lib/components/atoms/Pagination.svelte';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';

	export interface LatestChapter {
		id: string;
		title: string;
		slug: string;
		publishedAt?: Date | string | null;
		book: {
			title: string;
			slug: string;
			type: string;
			coverImage?: string | null;
		};
	}

	interface Props {
		chapters: LatestChapter[];
		page: number;
		pageSize: number;
		total: number;
	}

	let { chapters, page, pageSize, total }: Props = $props();

	const PLACEHOLDER_IMAGE =
		'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400&h=600';

	function formatType(type: string) {
		return type.replace('_', ' ');
	}

	function changePage(p: number) {
		goto(resolve(`/?page=${p}`), { reset: false });
	}
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-6xl overflow-hidden">
	<!-- Header Bar -->
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<SparklesIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">Latest Updates</h2>
	</header>

	<!-- List Body -->
	<div class="p-6">
		{#if chapters.length > 0}
			<div class="divide-surface-200-800 divide-y">
				{#each chapters as chapter (chapter.id)}
					<div class="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
						<!-- Book cover: fixed 2:3 portrait, never squished -->
						<a
							href={resolve('/books/[bookSlug]', { bookSlug: chapter.book.slug })}
							class="shrink-0 transition-transform duration-200 hover:scale-105"
						>
							<img
								src={chapter.book.coverImage || PLACEHOLDER_IMAGE}
								alt={chapter.book.title}
								class="aspect-2/3 w-12 rounded-sm object-cover shadow-sm md:w-14"
							/>
						</a>

						<!-- Titles (Chapter Name & Book Name) -->
						<div class="flex min-w-0 flex-1 flex-col justify-center gap-1">
							<!-- Chapter Title (Ultra Bold, Bigger) -->
							<a
								href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', {
									bookSlug: chapter.book.slug,
									chapterSlug: chapter.slug
								})}
								class="truncate text-lg font-extrabold transition-colors duration-200 hover:text-primary-500 md:text-xl"
							>
								{chapter.title}
							</a>

							<!-- Book Title (Medium Weight, Smaller) -->
							<a
								href={resolve('/books/[bookSlug]', { bookSlug: chapter.book.slug })}
								class="truncate text-sm font-medium opacity-80 transition-colors duration-200 hover:text-primary-500 md:text-base"
							>
								{chapter.book.title}
							</a>
						</div>

						<!-- Badge on the far right -->
						<Badge class="preset-tonal-secondary ml-auto shrink-0 text-xs uppercase tracking-wider">
							{formatType(chapter.book.type)}
						</Badge>
					</div>
				{/each}
			</div>

			<!-- Pagination -->
			<Pagination
				count={total}
				{pageSize}
				{page}
				onPageChange={changePage}
				class="mt-6 border-t border-surface-200-800 pt-4"
			/>
		{:else}
			<div class="flex flex-col items-center justify-center py-8 text-center opacity-60">
				<BookOpenIcon class="mb-2 size-10" />
				<p class="font-medium">No published chapters found.</p>
				<p class="text-xs">New chapter updates will appear here when published.</p>
			</div>
		{/if}
	</div>
</Card>
