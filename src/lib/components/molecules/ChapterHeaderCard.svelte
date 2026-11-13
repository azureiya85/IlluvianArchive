<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Tooltip from '#lib/components/atoms/Tooltip.svelte';
	import HomeIcon from '@lucide/svelte/icons/house';
	import BookIcon from '@lucide/svelte/icons/book';
	import { directImageUrl } from '#lib/utils/image.ts';

	interface Props {
		title: string;
		bookTitle: string;
		bookSlug: string;
		bookCoverImage?: string | null;
		arcTitle?: string | null;
		wordCount: number;
		summary?: string | null;
	}

	let { title, bookTitle, bookSlug, bookCoverImage, arcTitle, wordCount, summary }: Props = $props();

	const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200&h=300";
</script>

<Card class="preset-filled-surface-100-900 mb-6 overflow-hidden p-6 rounded-sm">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr_auto]">

		<!-- Leftmost: Book Cover -->
		<div class="mx-auto w-24 shrink-0 md:mx-0">
			<a href={resolve('/books/[bookSlug]', { bookSlug })} class="block transition-transform hover:scale-105">
				<img
					src={bookCoverImage ? directImageUrl(bookCoverImage) : PLACEHOLDER_IMAGE}
					alt={bookTitle}
					class="aspect-2/3 w-full rounded-none object-cover shadow-md"
				/>
			</a>
		</div>

		<!-- Middle: Titles & Icons -->
		<div class="flex flex-col justify-center gap-3">
			<div>
				<div class="mb-1 text-sm font-medium opacity-75">
					{bookTitle} {#if arcTitle} <span class="mx-2">|</span> {arcTitle} {/if}
				</div>
				<h1 class="text-3xl font-bold md:text-4xl">{title}</h1>
			</div>

			<!-- Icons -->
			<div class="flex gap-4">
				<Tooltip text="Back to Home" placement="right">
					{#snippet trigger()}
						<a href={resolve('/')} class="text-surface-900-50 opacity-60 transition-colors hover:text-primary-500 hover:opacity-100">
							<HomeIcon class="size-5" />
						</a>
					{/snippet}
				</Tooltip>

				<Tooltip text="Book Details" placement="right">
					{#snippet trigger()}
						<a href={resolve('/books/[bookSlug]', { bookSlug })} class="text-surface-900-50 opacity-60 transition-colors hover:text-primary-500 hover:opacity-100">
							<BookIcon class="size-5" />
						</a>
					{/snippet}
				</Tooltip>
			</div>
		</div>

		<!-- Rightmost: Stats (Centered) -->
		<div class="flex flex-col items-center justify-center md:items-end">
			<Badge class="preset-filled-secondary-500 flex flex-col items-center px-4 py-2 rounded-sm">
				<span class="text-lg font-black">{wordCount.toLocaleString()}</span>
				<span class="text-xs uppercase tracking-widest opacity-80">Words</span>
			</Badge>
		</div>

	</div>

	<!-- Summary (Full Width) -->
	{#if summary}
		<hr class="border-surface-200-800 my-6 opacity-50" />
		<div class="opacity-80">
			<h3 class="mb-2 text-xs font-bold uppercase tracking-widest opacity-50">Summary</h3>
			<p class="leading-relaxed">{summary}</p>
		</div>
	{/if}
</Card>
