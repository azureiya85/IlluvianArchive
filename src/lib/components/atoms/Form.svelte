<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { SubmitFunction } from '$app/forms';

	interface Props extends HTMLFormAttributes {
		children: Snippet;
		submitEnhance?: SubmitFunction;
	}

	let { children, class: className = '', submitEnhance, ...rest }: Props = $props();
</script>

{#if submitEnhance}
	<form class={className} {...rest} use:enhance={submitEnhance}>
		{@render children()}
	</form>
{:else}
	<form class={className} {...rest}>
		{@render children()}
	</form>
{/if}
