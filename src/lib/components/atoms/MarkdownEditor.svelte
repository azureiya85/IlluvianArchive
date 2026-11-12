<script lang="ts">
	import Button from '#lib/components/atoms/Button.svelte';

	// Icons
	import BoldIcon from '@lucide/svelte/icons/bold';
	import ItalicIcon from '@lucide/svelte/icons/italic';
	import UnderlineIcon from '@lucide/svelte/icons/underline';
	import StrikethroughIcon from '@lucide/svelte/icons/strikethrough';
	import MinusIcon from '@lucide/svelte/icons/minus';
	import QuoteIcon from '@lucide/svelte/icons/text-quote';
	import AlignLeftIcon from '@lucide/svelte/icons/align-left';
	import AlignCenterIcon from '@lucide/svelte/icons/align-center';
	import AlignRightIcon from '@lucide/svelte/icons/align-right';
	import AlignJustifyIcon from '@lucide/svelte/icons/align-justify';
	import MaximizeIcon from '@lucide/svelte/icons/maximize';
	import MinimizeIcon from '@lucide/svelte/icons/minimize';
	import Heading1Icon from '@lucide/svelte/icons/heading-1';
	import Heading2Icon from '@lucide/svelte/icons/heading-2';
	import Heading3Icon from '@lucide/svelte/icons/heading-3';
	import ListIcon from '@lucide/svelte/icons/list';
	import ListOrderedIcon from '@lucide/svelte/icons/list-ordered';
	import LinkIcon from '@lucide/svelte/icons/link';
	import TableIcon from '@lucide/svelte/icons/table';

	interface Props {
		name: string;
		value?: string;
		placeholder?: string;
		required?: boolean;
		rows?: number;
		class?: string;
	}

	let {
		name,
		value = $bindable(''),
		placeholder = 'Write your chapter here...',
		required = false,
		rows = 12,
		class: className = ''
	}: Props = $props();

	let textareaRef: HTMLTextAreaElement;
	let isFullscreen = $state(false);

	// Core formatting helper
	function applyFormat(prefix: string, suffix: string = '') {
		if (!textareaRef) return;

		const start = textareaRef.selectionStart;
		const end = textareaRef.selectionEnd;
		const text = value;

		const selected = text.slice(start, end);
		const before = text.slice(0, start);
		const after = text.slice(end);

		value = before + prefix + selected + suffix + after;

		setTimeout(() => {
			textareaRef.focus();
			const newCursorPos = selected.length === 0 && suffix === ''
				? start + prefix.length
				: start + prefix.length + selected.length;

			textareaRef.setSelectionRange(
				suffix ? start + prefix.length : newCursorPos,
				suffix ? start + prefix.length + selected.length : newCursorPos
			);
		}, 0);
	}

	// Insert Table Template
	function insertTable() {
		const tableTemplate = `\n\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Data | Data | Data |\n| Data | Data | Data |\n\n`;
		applyFormat(tableTemplate, '');
	}

	// Insert Link Prompt
	function insertLink() {
		applyFormat('[', '](https://...)');
	}

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
		if (isFullscreen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<div class="flex flex-col overflow-hidden border border-surface-200-800 rounded-container {isFullscreen ? 'fixed inset-0 z-50 bg-surface-100-900 m-0 rounded-none' : className}">

	<!-- Toolbar -->
	<div class="flex flex-wrap items-center gap-1 border-b border-surface-200-800 bg-surface-50-950 p-2">

		<!-- Text Styles -->
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('**', '**')} title="Bold">
			<BoldIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('*', '*')} title="Italic">
			<ItalicIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('<u>', '</u>')} title="Underline">
			<UnderlineIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('~~', '~~')} title="Strikethrough">
			<StrikethroughIcon class="size-4" />
		</Button>

		<div class="mx-1 h-4 w-px bg-surface-300-700"></div>

		<!-- Headings -->
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n# ', '')} title="Heading 1">
			<Heading1Icon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n## ', '')} title="Heading 2">
			<Heading2Icon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n### ', '')} title="Heading 3">
			<Heading3Icon class="size-4" />
		</Button>

		<div class="mx-1 h-4 w-px bg-surface-300-700"></div>

		<!-- Lists & Blocks -->
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n- ', '')} title="Unordered List">
			<ListIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n1. ', '')} title="Ordered List">
			<ListOrderedIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n> ', '')} title="Blockquote">
			<QuoteIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n\n---\n\n', '')} title="Divider">
			<MinusIcon class="size-4" />
		</Button>

		<div class="mx-1 h-4 w-px bg-surface-300-700"></div>

		<!-- Media & Tables -->
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={insertLink} title="Insert Link">
			<LinkIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={insertTable} title="Insert Table">
			<TableIcon class="size-4" />
		</Button>

		<div class="mx-1 h-4 w-px bg-surface-300-700"></div>

		<!-- Alignment -->
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n<div align="left">\n', '\n</div>\n')} title="Align Left">
			<AlignLeftIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n<div align="center">\n', '\n</div>\n')} title="Align Center">
			<AlignCenterIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n<div align="right">\n', '\n</div>\n')} title="Align Right">
			<AlignRightIcon class="size-4" />
		</Button>
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={() => applyFormat('\n<div align="justify">\n', '\n</div>\n')} title="Align Justify">
			<AlignJustifyIcon class="size-4" />
		</Button>

		<div class="mx-1 h-4 w-px bg-surface-300-700"></div>

		<!-- Typography Adjustments -->
		<select
			class="select select-sm w-28 py-1"
			title="Font Size"
			onchange={(e) => {
				const size = (e.target as HTMLSelectElement).value;
				if(size) applyFormat(`<span style="font-size: ${size}">`, '</span>');
				(e.target as HTMLSelectElement).value = "";
			}}
		>
			<option value="" disabled selected>Size...</option>
			<option value="0.875rem">Small</option>
			<option value="1.125rem">Large</option>
			<option value="1.25rem">X-Large</option>
			<option value="1.5rem">Huge</option>
		</select>

		<div class="grow"></div>

		<!-- Full Screen Toggle -->
		<Button type="button" class="btn-icon btn-icon-sm preset-tonal" onclick={toggleFullscreen} title="Toggle Fullscreen">
			{#if isFullscreen}
				<MinimizeIcon class="size-4" />
			{:else}
				<MaximizeIcon class="size-4" />
			{/if}
		</Button>
	</div>

	<!-- Text Area -->
	<textarea
		bind:this={textareaRef}
		{name}
		bind:value
		{required}
		{placeholder}
		rows={isFullscreen ? undefined : rows}
		class="textarea grow border-0 rounded-none focus:ring-0 focus:outline-none p-4 font-mono text-sm resize-y min-h-75 {isFullscreen ? 'h-full resize-none max-w-6xl mx-auto shadow-xl my-4 rounded-container' : ''}"
	></textarea>
</div>
