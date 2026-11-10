<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Form from '#lib/components/atoms/Form.svelte';
	import PlusIcon from '@lucide/svelte/icons/plus';

	interface Tag {
		id: string;
		name: string;
		slug: string;
	}

	let { tags }: { tags: Tag[] } = $props();

	let showInput = $state(false);
	let loading = $state(false);
</script>

<Card class="preset-filled-surface-100-900 p-6">
	<div class="flex flex-wrap items-center gap-3">
		{#each tags as tag (tag.id)}
			<Badge class="preset-tonal-secondary flex items-center gap-2 px-3 py-1.5 text-sm">
				{tag.name}
				<form method="POST" action="?/deleteTag" class="inline-flex items-center">
					<input type="hidden" name="id" value={tag.id} />
					<button type="submit" class="hover:text-error-500 opacity-50 transition-opacity hover:opacity-100" title="Delete {tag.name}">
						&times;
					</button>
				</form>
			</Badge>
		{/each}

		{#if showInput}
			<Form method="POST" action="?/createTag" class="preset-tonal-surface flex items-center gap-2 rounded-lg p-1" submitEnhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
					showInput = false;
				};
			}}>
				<input type="text" name="name" placeholder="Tag Name" class="input input-sm w-28" required />
				<input type="text" name="slug" placeholder="slug" class="input input-sm w-24" required />
				<Button class="btn-sm preset-filled-primary-500" disabled={loading}>Save</Button>
				<Button type="button" class="btn-sm preset-outlined" onclick={() => showInput = false}>Cancel</Button>
			</Form>
		{:else}
			<Button class="btn-sm preset-tonal-primary rounded-full" onclick={() => showInput = true}>
				<PlusIcon class="size-4" />
				<span>Add Tag</span>
			</Button>
		{/if}
	</div>
</Card>
