<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '#lib/components/atoms/Button.svelte';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';

	interface NavChapter {
		title: string;
		slug: string;
	}

	interface Props {
		bookSlug: string;
		prevChapter?: NavChapter | null;
		nextChapter?: NavChapter | null;
	}

	let { bookSlug, prevChapter = null, nextChapter = null }: Props = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
	<div class="w-full md:w-1/3">
	{#if prevChapter}
		<a
			href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', {
				bookSlug,
				chapterSlug: prevChapter.slug
			})}
			class="block"
		>
			<Button class="preset-tonal w-full justify-start md:w-auto">
				<ArrowLeftIcon class="mr-2 size-4" />
				<span class="truncate y">{prevChapter.title}</span>
			</Button>
		</a>
	{/if}
	</div>

	<div class="flex w-full justify-center md:w-1/3">
		<Button class="btn-icon preset-tonal-surface rounded-full" onclick={scrollToTop} title="Back to Top">
			<ArrowUpIcon class="size-5" />
		</Button>
	</div>

	<div class="flex w-full justify-end md:w-1/3">
	{#if nextChapter}
		<a
			href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', {
				bookSlug,
				chapterSlug: nextChapter.slug
			})}
			class="block"
		>
			<Button class="preset-filled-primary-500 w-full justify-end md:w-auto">
				<span class="truncate max-w-37.5">{nextChapter.title}</span>
				<ArrowRightIcon class="ml-2 size-4" />
			</Button>
		</a>
	{/if}
	</div>
</div>
