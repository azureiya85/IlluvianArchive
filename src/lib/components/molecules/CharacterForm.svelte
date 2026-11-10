<script lang="ts">
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';

	interface Character {
		id: string;
		name: string;
		description?: string | null;
		image?: string | null;
		universeId?: string | null;
	}

	interface Universe {
		id: string;
		name: string;
	}

	interface Props {
		character?: Character | null;
		universes: Universe[];
		onSuccess: () => void;
		onCancel?: () => void;
	}

	let { character = null, universes, onSuccess, onCancel }: Props = $props();

	let loading = $state(false);
	let action = $derived(character ? '?/updateCharacter' : '?/createCharacter');
	let title = $derived(character ? 'Edit Character' : 'Create New Character');
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

		{#if character}
			<input type="hidden" name="id" value={character.id} />
		{/if}

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="label">
				<span class="label-text">Name</span>
				<input class="input" type="text" name="name" value={character?.name ?? ''} required placeholder="Character Name" />
			</label>

			<label class="label">
				<span class="label-text">Universe (Optional)</span>
				<select class="select" name="universeId" value={character?.universeId ?? ''}>
					<option value="">None / Standalone</option>
					{#each universes as uni (uni.id)}
						<option value={uni.id}>{uni.name}</option>
					{/each}
				</select>
			</label>
		</div>

		<label class="label">
			<span class="label-text">Description</span>
			<textarea class="textarea" name="description" rows="4" placeholder="Character bio, personality, appearance...">{character?.description ?? ''}</textarea>
		</label>

		<label class="label">
			<span class="label-text">Image URL (Optional)</span>
			<input class="input" type="url" name="image" value={character?.image ?? ''} placeholder="https://..." />
		</label>

		<div class="flex justify-end gap-4 pt-4">
			{#if !character}
				<Button class="preset-tonal" type="reset">Reset</Button>
			{/if}
			<Button class="preset-filled-primary-500" disabled={loading}>
				{loading ? 'Saving...' : (character ? 'Save Changes' : 'Create Character')}
			</Button>
		</div>
	</Form>
</Card>
