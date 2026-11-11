<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import { Pagination as SkPagination } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		count: number;
		pageSize?: number;
		page: number;
		onPageChange?: (page: number) => void;
		class?: string;
	}

	let {
		count,
		pageSize = 10,
		page = $bindable(1),
		onPageChange,
		class: className = ''
	}: Props = $props();
</script>

{#if count > pageSize}
	<div class="flex w-full items-center justify-center p-4 {className}">
		<SkPagination
			{count}
			{pageSize}
			{page}
			onPageChange={(event) => {
				page = event.page; // Updates the bound variable automatically
				if (onPageChange) onPageChange(event.page); // Fires callback if one was provided
			}}
		>
			<SkPagination.PrevTrigger class="btn-icon preset-tonal-surface">
				<ArrowLeftIcon class="size-4" />
			</SkPagination.PrevTrigger>

			<SkPagination.Context>
				{#snippet children(pagination)}
					<div class="flex items-center gap-2">
						{#each pagination().pages as p, index (p)}
							{#if p.type === "page"}
								<SkPagination.Item
									{...p}
									class="btn-icon {p.value === page ? 'preset-filled-primary-500' : 'preset-tonal-surface hover:preset-tonal-secondary'}"
								>
									{p.value}
								</SkPagination.Item>
							{:else}
								<SkPagination.Ellipsis {index} class="px-2 opacity-50">&#8230;</SkPagination.Ellipsis>
							{/if}
						{/each}
					</div>
				{/snippet}
			</SkPagination.Context>

			<SkPagination.NextTrigger class="btn-icon preset-tonal-surface">
				<ArrowRightIcon class="size-4" />
			</SkPagination.NextTrigger>
		</SkPagination>
	</div>
{/if}
