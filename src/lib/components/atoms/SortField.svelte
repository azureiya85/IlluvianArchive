<script lang="ts" module>
	export interface SortOption<T extends string = string> {
		value: T;
		label: string;
	}
</script>

<script lang="ts" generics="T extends string">
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';

	interface Props {
		value?: T;
		options: SortOption<T>[];
		class?: string;
	}

	let {
		value = $bindable() as T,
		options,
		class: className = ''
	}: Props = $props();
</script>

<div class="field-group grid-cols-[auto_1fr] rounded-sm {className}">
	<label class="label label-text preset-tonal-surface flex items-center justify-center px-2.5">
		<ArrowUpDownIcon class="size-4 shrink-0 opacity-60" />
	</label>
	<select class="select field-sm rounded-sm" bind:value={value}>
		{#each options as opt (opt.value)}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
</div>
