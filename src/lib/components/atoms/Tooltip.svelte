<script lang="ts">
	import { Portal, Tooltip as SkTooltip } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		text?: string | null;
		trigger: Snippet;
		placement?: "top" | "bottom" | "left" | "right";
	}

	let { text, trigger, placement = "top" }: Props = $props();
</script>

{#if text && text.trim().length > 0}
	<!-- If text exists, wrap the element in a Tooltip -->
	<SkTooltip positioning={{ placement }}>
		<SkTooltip.Trigger class="inline-flex cursor-help">
			{@render trigger()}
		</SkTooltip.Trigger>
		<Portal>
			<SkTooltip.Positioner class="z-50!">
				<SkTooltip.Content class="card bg-surface-100-900 p-4 shadow-xl">
					<p class="opacity-90">{text}</p>
					<SkTooltip.Arrow class="[--arrow-background:var(--color-surface-100-900)] [--arrow-size:--spacing(2)]"
									>
						<SkTooltip.ArrowTip />
					</SkTooltip.Arrow>
				</SkTooltip.Content>
			</SkTooltip.Positioner>
		</Portal>
	</SkTooltip>
{:else}
	<!-- If no text exists, just render the element normally -->
	{@render trigger()}
{/if}
