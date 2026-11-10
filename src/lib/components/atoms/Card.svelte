<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<div class="card {className}" {...rest}>
	{@render children()}
</div>
