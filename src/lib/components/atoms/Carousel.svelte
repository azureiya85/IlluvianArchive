<script lang="ts" generics="T">
	import { Carousel as SkCarousel } from '@skeletonlabs/skeleton-svelte';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import type { Snippet } from 'svelte';

	interface Props {
		items: T[];
		slide: Snippet<[T]>;
		slidesPerPage?: number;
	}

	let { items, slide, slidesPerPage = 3 }: Props = $props();
</script>

<SkCarousel slideCount={items.length} {slidesPerPage} spacing="16px" padding="32px" loop>
	<div class="relative">
		<SkCarousel.Control>
			<SkCarousel.PrevTrigger class="btn-icon preset-filled-surface-500 absolute -left-4 top-[50%] z-10 translate-y-[-50%] rounded-full shadow-lg">
				<ArrowLeftIcon class="size-4" />
			</SkCarousel.PrevTrigger>

			<SkCarousel.NextTrigger class="btn-icon preset-filled-surface-500 absolute -right-4 top-[50%] z-10 translate-y-[-50%] rounded-full shadow-lg">
				<ArrowRightIcon class="size-4" />
			</SkCarousel.NextTrigger>
		</SkCarousel.Control>

		<SkCarousel.ItemGroup>
			{#each items as item, i (i)}
				<SkCarousel.Item index={i}>
					{@render slide(item)}
				</SkCarousel.Item>
			{/each}
		</SkCarousel.ItemGroup>
	</div>
</SkCarousel>
