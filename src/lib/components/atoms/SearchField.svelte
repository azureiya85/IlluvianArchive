<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		value?: string;
		placeholder?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		class: className = '',
		...rest
	}: Props = $props();
</script>

<div class="field-group grid-cols-[auto_1fr] flex-1 !rounded-sm {className}">
	<label class="label label-text preset-tonal-surface flex items-center justify-center px-3" for={rest.id}>
		<SearchIcon class="size-4 shrink-0 opacity-60" />
	</label>
	<input
		type="search"
		class="input field-sm !rounded-sm"
		{placeholder}
		bind:value={value}
		{...rest}
	/>
</div>
