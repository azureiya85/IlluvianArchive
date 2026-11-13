<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '#lib/components/atoms/Card.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import WrenchIcon from '@lucide/svelte/icons/wrench';
	import HomeIcon from '@lucide/svelte/icons/house';
</script>

<div class="flex min-h-[50vh] flex-col items-center justify-center p-4">
	<Card class="preset-filled-surface-100-900 w-full max-w-md p-8 text-center rounded-sm shadow-xl">
		<div class="mb-6 flex justify-center">
			<div class="rounded-full bg-surface-200-800 p-4">
				<WrenchIcon class="size-8 text-tertiary-500 opacity-80" />
			</div>
		</div>

		<h1 class="h3 mb-2 font-bold uppercase tracking-widest">Under Construction</h1>

		<p class="mb-8 text-sm leading-relaxed opacity-70">
			The library archives are currently being organized and cataloged. Please check back later to browse the full collection of books.
		</p>

		<a href={resolve('/')} class="block">
			<Button class="preset-filled-primary-500 w-full rounded-sm">
				<HomeIcon class="mr-2 size-4 shrink-0" />
				<span>Return to Home</span>
			</Button>
		</a>
	</Card>
</div>
