<script lang="ts">
	import LoaderIcon from '@lucide/svelte/icons/loader-circle';

	interface Props {
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		/** Cover the nearest positioned parent with a translucent backdrop. */
		overlay?: boolean;
		class?: string;
	}

	let { label = 'Loading', size = 'md', overlay = false, class: className = '' }: Props = $props();

	const sizes = {
		sm: 'size-4',
		md: 'size-6',
		lg: 'size-10'
	} as const;
</script>

<div
	role="status"
	aria-live="polite"
	class="flex items-center justify-center gap-2 text-primary-500 {overlay
		? 'absolute inset-0 z-10 bg-surface-50-950/60 backdrop-blur-[1px]'
		: ''} {className}"
>
	<LoaderIcon class="animate-spin {sizes[size]}" />
	<span class="sr-only">{label}</span>
</div>
