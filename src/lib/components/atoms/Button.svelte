<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children?: Snippet;
	}

	let { children, class: className = '', disabled, ...rest }: Props = $props();
</script>

<button class="btn {className}" {disabled} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</button>
