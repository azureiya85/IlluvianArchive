<script lang="ts">
	import { Popover as SkPopover, Portal } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';
	import XIcon from '@lucide/svelte/icons/x';

	interface Props {
		trigger: Snippet;
		content: Snippet;
		title?: string;
		description?: string;
		placement?: "top" | "bottom" | "left" | "right" | "bottom-start" | "bottom-end";
		class?: string;
		triggerClass?: string;
		triggerTitle?: string;
	}

	let {
		trigger,
		content,
		title,
		description,
		placement = "bottom",
		class: className = '',
		triggerClass = '',
		triggerTitle
	}: Props = $props();
</script>

<SkPopover positioning={{ placement }}>
	<SkPopover.Trigger>
		<!-- Takes Skeleton's raw attributes and applies them directly to OUR single button -->
		{#snippet element(attributes)}
			<button {...attributes} class={triggerClass} title={triggerTitle}>
				{@render trigger()}
			</button>
		{/snippet}
	</SkPopover.Trigger>

	<Portal>
		<SkPopover.Positioner class="z-50!">
			<SkPopover.Content class="card preset-filled-surface-100-900 w-80 p-4 shadow-xl !rounded-sm {className}">

				{#if title || description}
					<header class="mb-4 grid grid-cols-[1fr_auto] items-start gap-4">
						<div>
							{#if title}
								<SkPopover.Title class="text-lg font-bold">{title}</SkPopover.Title>
							{/if}
							{#if description}
								<SkPopover.Description class="text-sm opacity-60">
									{description}
								</SkPopover.Description>
							{/if}
						</div>
						<SkPopover.CloseTrigger class="btn-icon btn-icon-sm hover:preset-tonal !rounded-sm">
							<XIcon class="size-4" />
						</SkPopover.CloseTrigger>
					</header>
				{/if}

				<div class="space-y-4">
					{@render content()}
				</div>

				<SkPopover.Arrow class="[--arrow-background:var(--color-surface-100-900)] [--arrow-size:--spacing(2)]">
					<SkPopover.ArrowTip />
				</SkPopover.Arrow>
			</SkPopover.Content>
		</SkPopover.Positioner>
	</Portal>
</SkPopover>
