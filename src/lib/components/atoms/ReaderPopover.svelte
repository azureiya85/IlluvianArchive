<script lang="ts">
	import Popover from '#lib/components/atoms/Popover.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Settings2Icon from '@lucide/svelte/icons/settings-2';

	interface Props {
		fontSize?: string;
		paragraphSpacing?: string;
		indentation?: 'author' | 'forced';
		readerWidth?: string;
	}

	let {
		fontSize = $bindable('16'),
		paragraphSpacing = $bindable('24'),
		indentation = $bindable('author'),
		readerWidth = $bindable('100')
	}: Props = $props();

	const fontSizes = Array.from({ length: 23 }, (_, i) => String(10 + i));
	const widthOptions = ['100', '90', '80', '70', '60'];
</script>

<Popover
	placement="bottom-end"
	title="Reader Preferences"
	triggerClass="btn-icon preset-tonal-surface !rounded-sm"
	triggerTitle="Reader Settings"
>
	{#snippet trigger()}
		<Settings2Icon class="size-5" />
	{/snippet}

	{#snippet content()}
		<div class="flex flex-col gap-4">

			<label class="flex flex-col gap-1">
				<span class="text-sm font-bold opacity-75">Font Size (px)</span>
				<select class="select !rounded-sm py-1" bind:value={fontSize}>
					{#each fontSizes as size (size)}
						<option value={size}>{size}px</option>
					{/each}
				</select>
			</label>

			<label class="flex flex-col gap-1">
				<span class="text-sm font-bold opacity-75">Paragraph Spacing (px)</span>
				<input
					type="number"
					class="input !rounded-sm py-1"
					min="20" max="60"
					bind:value={paragraphSpacing}
				/>
			</label>

			<div class="flex flex-col gap-2">
				<span class="text-sm font-bold opacity-75">Indentation</span>
				<div class="flex gap-2">
					<Button
						class="flex-1 !rounded-sm btn-sm {indentation === 'author' ? 'preset-filled-primary-500' : 'preset-tonal'}"
						onclick={() => indentation = 'author'}
					>
						Author
					</Button>
					<Button
						class="flex-1 !rounded-sm btn-sm {indentation === 'forced' ? 'preset-filled-primary-500' : 'preset-tonal'}"
						onclick={() => indentation = 'forced'}
					>
						Forced
					</Button>
				</div>
			</div>

			<label class="flex flex-col gap-1">
				<span class="text-sm font-bold opacity-75">Reader Width</span>
				<select class="select !rounded-sm py-1" bind:value={readerWidth}>
					{#each widthOptions as width (width)}
						<option value={width}>{width === '100' ? 'Max (100%)' : `${width}%`}</option>
					{/each}
				</select>
			</label>

		</div>
	{/snippet}
</Popover>
