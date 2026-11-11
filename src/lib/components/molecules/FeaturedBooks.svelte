<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Carousel from '#lib/components/atoms/Carousel.svelte';
	import StarIcon from '@lucide/svelte/icons/star';

	interface FeaturedBook {
		id: string;
		title: string;
		slug: string;
		coverImage?: string | null;
	}

	interface Props {
		books: FeaturedBook[];
	}

	let { books }: Props = $props();

	const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400&h=600";
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-4xl overflow-hidden">
	<header class="flex items-center gap-2 bg-surface-200-800 p-4 font-bold">
		<StarIcon class="size-5 text-tertiary-500" />
		<h2 class="h4">Featured Books</h2>
	</header>

	<div class="p-6">
		<!-- Requesting exactly 3 items at a time -->
		<Carousel items={books} slidesPerPage={3}>
			{#snippet slide(book)}
				<a href={resolve('/books/[bookSlug]', { bookSlug: book.slug })} class="group block p-2 text-center">
					<div class="transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
						<!-- Falls back to PLACEHOLDER_IMAGE seamlessly if coverImage is falsy -->
						<img
							src={book.coverImage || PLACEHOLDER_IMAGE}
							alt={book.title}
							class="aspect-2/3 w-full rounded-container object-cover shadow-md"
						/>
					</div>

					<h3 class="mt-4 truncate px-2 text-sm font-bold transition-colors group-hover:text-primary-500">
						{book.title}
					</h3>
				</a>
			{/snippet}
		</Carousel>
	</div>
</Card>
