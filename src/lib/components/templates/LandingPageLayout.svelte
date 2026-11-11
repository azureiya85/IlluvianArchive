<script lang="ts">
	import TopBar from '#lib/components/molecules/TopBar.svelte';
	import FeaturedBooks from '#lib/components/molecules/FeaturedBooks.svelte';
	import LatestUpdates, { type LatestChapter } from '#lib/components/molecules/LatestUpdates.svelte';

	interface FeaturedBook {
		id: string;
		title: string;
		slug: string;
		coverImage?: string | null;
	}

	interface Props {
		featuredBooks: FeaturedBook[];
		latestChapters: LatestChapter[];
		chapterPage: number;
		chapterPageSize: number;
		chapterTotal: number;
	}

	let { featuredBooks, latestChapters, chapterPage, chapterPageSize, chapterTotal }: Props = $props();
</script>

<div class="min-h-screen bg-surface-50-950 pb-20">
	<TopBar />

	<main class="mx-auto mt-8 max-w-6xl space-y-12 px-4">
		<!-- Section 1: Featured Books -->
		<section>
			<FeaturedBooks books={featuredBooks} />
		</section>

		<!-- Section 2: Latest Updates -->
		<section>
			<LatestUpdates
				chapters={latestChapters}
				page={chapterPage}
				pageSize={chapterPageSize}
				total={chapterTotal}
			/>
		</section>
	</main>
</div>
