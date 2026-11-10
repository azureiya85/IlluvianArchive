<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		children?: Snippet;
		variant?: 'default' | 'icon' | 'dot';
	}

	let {
		children,
		variant = 'default',
		class: className = '',
		...rest
	}: Props = $props();

	let baseClass = $derived(
		variant === 'icon' ? 'badge-icon' :
		variant === 'dot' ? 'badge-dot' :
		'badge'
	);
</script>

<span class="{baseClass} {className}" {...rest}>
	{#if children}
		{@render children()}
	{/if}
</span>
