<script lang="ts">
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';

	interface Era {
		id: string;
		name: string;
		slug: string;
		description: string | null;
		orderIndex?: number;
		universeId: string;
	}

	interface Universe {
		id: string;
		name: string;
	}

	interface Props {
		era?: Era | null;
		universes: Universe[];
		onSuccess: () => void;
		onCancel?: () => void;
	}

	let { era = null, universes, onSuccess, onCancel }: Props = $props();

	let loading = $state(false);
	let action = $derived(era ? '?/updateEra' : '?/createEra');
	let title = $derived(era ? 'Edit Era' : 'Create New Era');
</script>

<Card class="preset-filled-surface-100-900 mx-auto max-w-2xl p-6">
	<Form method="POST" {action} class="space-y-6" submitEnhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
			onSuccess();
		};
	}}>
		<div class="flex items-center justify-between">
			<h2 class="h3">{title}</h2>
			{#if onCancel}
				<Button class="btn-sm preset-outlined" type="button" onclick={onCancel}>Cancel</Button>
			{/if}
		</div>

		{#if era}
			<input type="hidden" name="id" value={era.id} />
		{/if}

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="label">
				<span class="label-text">Name</span>
				<input class="input" type="text" name="name" value={era?.name ?? ''} required placeholder="First Age" />
			</label>

			<label class="label">
				<span class="label-text">Slug</span>
				<input class="input" type="text" name="slug" value={era?.slug ?? ''} required placeholder="first-age" />
			</label>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="label">
				<span class="label-text">Universe</span>
				<select class="select" name="universeId" value={era?.universeId ?? ''} required>
					<option value="" disabled>Select Universe</option>
					{#each universes as uni (uni.id)}
						<option value={uni.id}>{uni.name}</option>
					{/each}
				</select>
			</label>

			<label class="label">
				<span class="label-text">Order Index</span>
				<input class="input" type="number" step="0.1" name="orderIndex" value={era?.orderIndex ?? 0} required />
			</label>
		</div>

		<label class="label">
			<span class="label-text">Description</span>
			<textarea class="textarea" name="description" rows="4" placeholder="Era description...">{era?.description ?? ''}</textarea>
		</label>

		<div class="flex justify-end gap-4 pt-4">
			{#if !era}
				<Button class="preset-tonal" type="reset">Reset</Button>
			{/if}
			<Button class="preset-filled-primary-500" disabled={loading}>
				{loading ? 'Saving...' : (era ? 'Save Changes' : 'Create Era')}
			</Button>
		</div>
	</Form>
</Card>
