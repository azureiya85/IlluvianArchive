<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import TrashIcon from '@lucide/svelte/icons/trash-2';

	interface Props {
		action: string;
		id: string;
	}

	let { action, id }: Props = $props();

	// Smooth entry animation for the modal
	const animation =
		"transition transition-discrete opacity-0 translate-y-[20px] starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-[20px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0";
</script>

<Dialog role="alertdialog">
	<Dialog.Trigger class="btn-icon btn-icon-sm preset-filled-error-500 hover:preset-filled-error-600" title="Delete">
		<TrashIcon class="size-4" />
	</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="bg-surface-950/50 fixed inset-0 z-50 transition-opacity" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="card bg-surface-100-900 w-full max-w-sm space-y-4 p-6 shadow-xl {animation}">
				<Dialog.Title class="text-xl font-bold text-error-500">Confirm Deletion</Dialog.Title>

				<Dialog.Description class="opacity-80">
					Are you sure you want to delete this item? This action cannot be undone.
				</Dialog.Description>

				<footer class="flex justify-end gap-3 pt-4">
					<Dialog.CloseTrigger class="btn preset-tonal hover:preset-tonal-surface">
						Cancel
					</Dialog.CloseTrigger>
					<form method="POST" {action}>
						<input type="hidden" name="id" value={id} />
						<Button class="preset-filled-error-500 hover:preset-filled-error-600" type="submit">
							Delete
						</Button>
					</form>
				</footer>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
