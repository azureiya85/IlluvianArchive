<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Tooltip from '#lib/components/atoms/Tooltip.svelte';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import { directImageUrl } from '#lib/utils/image.ts';

	interface Tag {
		id: string;
		name: string;
	}

	export interface BookStats {
		title: string;
		type: string;
		coverImage?: string | null;
		universeName?: string | null;
		universeDesc?: string | null;
		eraName?: string | null;
		eraDesc?: string | null;
		tags: Tag[];
		readingEase?: number | null;
		readingLevel?: string | null;
		totalWordCount: number;
	}

	interface Props {
		book: BookStats;
	}

	let { book }: Props = $props();

	const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600&h=900";

	// Filter out the 'favorite' tag (case-insensitive) so it isn't displayed to users
	let displayTags = $derived(book.tags.filter(tag => tag.name.toLowerCase() !== 'favorite'));

	function capitalizeWords(str: string) {
		return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
	}

	function formatEnum(str?: string | null) {
		if (!str) return 'Unknown';
		return str.replace(/_/g, ' ');
	}
</script>

<Card class="preset-filled-surface-100-900 overflow-hidden">
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<BookOpenIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">Book Info</h2>
	</header>

	<div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-[auto_1fr_auto]">
		<!-- Left: Cover Image -->
		<div class="mx-auto w-48 shrink-0 md:mx-0 lg:w-56">
			<img
				src={directImageUrl(book.coverImage) || PLACEHOLDER_IMAGE}
				alt={book.title}
				class="aspect-2/3 w-full object-cover shadow-lg"
			/>
		</div>

		<!-- Middle: Title, Universe, Tags -->
		<div class="flex flex-col justify-center gap-4">
			<div>
				<h1 class="text-4xl font-black md:text-5xl">{book.title}</h1>

				<div class="mt-2 text-lg font-medium opacity-75">
					{#if book.universeName}
						<!-- Tooltip for Universe -->
						<Tooltip text={book.universeDesc}>
							{#snippet trigger()}
								<span class="border-b border-dashed border-surface-900-50/30 hover:text-primary-500 transition-colors">
									{book.universeName}
								</span>
							{/snippet}
						</Tooltip>

						{#if book.eraName}
							<span class="mx-2">|</span>

							<!-- Tooltip for Era -->
							<Tooltip text={book.eraDesc}>
								{#snippet trigger()}
									<span class="border-b border-dashed border-surface-900-50/30 hover:text-primary-500 transition-colors">
										{book.eraName}
									</span>
								{/snippet}
							</Tooltip>
						{/if}
					{:else}
						<span>Standalone {capitalizeWords(formatEnum(book.type))}</span>
					{/if}
				</div>
			</div>

			<div class="flex flex-wrap gap-2">
				<!-- Iterate over the filtered displayTags instead of book.tags -->
				{#each displayTags as tag (tag.id)}
					<Badge class="preset-tonal-primary font-medium tracking-wide">
						{capitalizeWords(tag.name)}
					</Badge>
				{/each}
			</div>
		</div>

		<!-- Right: Stats -->
		<div class="flex flex-row items-center justify-between gap-4 border-t border-surface-200-800 pt-6 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:pl-6 md:pt-0">
			<div class="text-center md:text-right">
				<div class="text-sm font-bold uppercase tracking-widest opacity-60">Reading Ease</div>
				<div class="text-5xl font-black text-primary-500 md:text-6xl">
					{book.readingEase !== null && book.readingEase !== undefined ? book.readingEase.toFixed(0) : 'N/A'}
				</div>
			</div>

			<div class="flex flex-col items-center gap-2 md:items-end">
				<Badge class="preset-filled-secondary-500 uppercase tracking-widest">
					{formatEnum(book.readingLevel)}
				</Badge>
				<div class="text-sm font-medium opacity-75">
					{book.totalWordCount.toLocaleString()} Words
				</div>
			</div>
		</div>
	</div>
</Card>
