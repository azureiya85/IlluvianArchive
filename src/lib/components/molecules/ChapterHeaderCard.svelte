<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';

	interface Props {
		title: string;
		bookTitle: string;
		arcTitle?: string | null;
		wordCount: number;
		summary?: string | null;
	}

	let { title, bookTitle, arcTitle, wordCount, summary }: Props = $props();
</script>

<Card class="preset-filled-surface-100-900 mb-6 p-6">
	<div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
		<div>
			<h1 class="h1 font-bold">{title}</h1>
			<p class="mt-2 text-sm opacity-75">
				Part of {#if arcTitle}<span class="font-bold">{arcTitle}</span> of {/if}
				<span class="font-bold">{bookTitle}</span>
			</p>
		</div>

		<div class="whitespace-nowrap text-sm font-medium opacity-60">
			{wordCount.toLocaleString()} words
		</div>
	</div>

	{#if summary}
		<hr class="hr my-6" />
		<div class="opacity-80">
			<h3 class="h6 mb-2 font-bold uppercase opacity-50">Summary</h3>
			<p>{summary}</p>
		</div>
	{/if}
</Card>
