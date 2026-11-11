<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';

	interface Props {
		content: string;
		class?: string;
	}

	let { content, class: className = '' }: Props = $props();

	// Reactively parse and sanitize the markdown whenever content changes
	let safeHtml = $derived(DOMPurify.sanitize(marked.parse(content) as string));
</script>

<div class="prose prose-surface max-w-none dark:prose-invert {className}">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html safeHtml}
</div>
