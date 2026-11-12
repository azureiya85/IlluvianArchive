<script lang="ts">
	import Form from '#lib/components/atoms/Form.svelte';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import DeleteDialog from '#lib/components/atoms/DeleteDialog.svelte';

	interface FaqItem {
		id: string; question: string; answer: string; orderIndex: number;
	}

	interface Props {
		faqs: FaqItem[];
	}

	let { faqs }: Props = $props();
	let loading = $state(false);
</script>

<div class="mx-auto max-w-4xl space-y-6">
	<!-- Add New FAQ -->
	<Card class="preset-filled-surface-100-900 p-6">
		<h2 class="h3 mb-6 font-bold">Add New FAQ</h2>

		<Form method="POST" action="?/createFaq" class="space-y-4" submitEnhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_80px]">
				<label class="label">
					<span class="label-text">Question</span>
					<input class="input" type="text" name="question" required />
				</label>
				<label class="label">
					<span class="label-text">Order</span>
					<input class="input" type="number" name="orderIndex" value={faqs.length + 1} required />
				</label>
			</div>

			<label class="label">
				<span class="label-text">Answer</span>
				<textarea class="textarea" name="answer" rows="3" required></textarea>
			</label>

			<div class="flex justify-end">
				<Button class="preset-filled-primary-500" disabled={loading}>
					{loading ? 'Adding...' : 'Add FAQ'}
				</Button>
			</div>
		</Form>
	</Card>

	<!-- Existing FAQs List -->
	<Card class="preset-filled-surface-100-900 p-4 overflow-x-auto">
		<table class="table w-full text-left">
			<thead>
				<tr class="border-b border-surface-200-800">
					<th class="p-3">Order</th>
					<th class="p-3">Question</th>
					<th class="p-3 text-right">Actions</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-surface-200-800">
				{#each faqs as faq (faq.id)}
					<tr class="hover:preset-tonal-surface">
						<td class="p-3 opacity-75">{faq.orderIndex}</td>
						<td class="p-3">
							<div class="font-bold">{faq.question}</div>
							<div class="text-sm opacity-60 line-clamp-1">{faq.answer}</div>
						</td>
						<td class="p-3 text-right">
							<DeleteDialog action="?/deleteFaq" id={faq.id} />
						</td>
					</tr>
				{:else}
					<tr><td colspan="3" class="p-6 text-center opacity-50">No FAQs created yet.</td></tr>
				{/each}
			</tbody>
		</table>
	</Card>
</div>
