<script lang="ts" module>
	export interface FilterOption {
		value: string;
		label: string;
	}
</script>

<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface Props extends HTMLSelectAttributes {
		value?: string;
		options: FilterOption[];
		placeholder?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		options,
		placeholder = 'All',
		class: className = '',
		...rest
	}: Props = $props();
</script>

<select class="select field-sm rounded-sm {className}" bind:value={value} {...rest}>
	{#if placeholder}
		<option value="">{placeholder}</option>
	{/if}
	{#each options as opt (opt.value)}
		<option value={opt.value}>{opt.label}</option>
	{/each}
</select>
