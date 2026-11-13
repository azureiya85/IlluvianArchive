<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '#lib/components/atoms/Button.svelte';
	import ReaderPopover from '#lib/components/atoms/ReaderPopover.svelte';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';

	interface NavChapter { title: string; slug: string; }

	interface Props {
		bookSlug: string;
		prevChapter?: NavChapter | null;
		nextChapter?: NavChapter | null;
		hideBackToTop?: boolean;

		fontFamily?: string;
		fontSize?: string;
		paragraphSpacing?: string;
		indentation?: 'author' | 'forced';
		readerWidth?: string;
	}

	let {
		bookSlug,
		prevChapter = null,
		nextChapter = null,
		hideBackToTop = false,
		fontFamily = $bindable(),
		fontSize = $bindable(),
		paragraphSpacing = $bindable(),
		indentation = $bindable(),
		readerWidth = $bindable()
	}: Props = $props();

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
	<!-- Prev Button -->
	<div class="w-full md:w-1/3">
	{#if prevChapter}
		<a href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', { bookSlug, chapterSlug: prevChapter.slug })} class="block">
			<Button class="preset-tonal w-full justify-start !rounded-sm md:w-auto">
				<ArrowLeftIcon class="mr-2 size-4 shrink-0" />
				<span class="truncate">{prevChapter.title}</span>
			</Button>
		</a>
	{/if}
	</div>

	<!-- Center -->
	<div class="flex w-full justify-center md:w-1/3">
		{#if hideBackToTop}
			<ReaderPopover
				bind:fontFamily
				bind:fontSize
				bind:paragraphSpacing
				bind:indentation
				bind:readerWidth
			/>
		{:else}
			<Button class="btn-icon preset-tonal-surface !rounded-sm" onclick={scrollToTop} title="Back to Top">
				<ArrowUpIcon class="size-5" />
			</Button>
		{/if}
	</div>

	<!-- Next Button -->
	<div class="flex w-full justify-end md:w-1/3">
	{#if nextChapter}
		<a href={resolve('/books/[bookSlug]/chapters/[chapterSlug]', { bookSlug, chapterSlug: nextChapter.slug })} class="block">
			<Button class="preset-filled-primary-500 w-full justify-end !rounded-sm md:w-auto">
				<span class="truncate max-w-37.5">{nextChapter.title}</span>
				<ArrowRightIcon class="ml-2 size-4 shrink-0" />
			</Button>
		</a>
	{/if}
	</div>
</div>
