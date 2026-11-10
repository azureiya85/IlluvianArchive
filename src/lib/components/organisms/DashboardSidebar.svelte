<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import BookIcon from '@lucide/svelte/icons/book';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import UsersIcon from '@lucide/svelte/icons/users';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import HomeIcon from '@lucide/svelte/icons/house';

	let { currentPath = '/admin/dashboard' }: { currentPath?: string } = $props();
</script>

<Navigation layout="sidebar" class="bg-surface-100-900 border-surface-200-800 grid h-screen w-64 grid-rows-[auto_1fr_auto] gap-4 border-r">
	<Navigation.Header class="p-4">
		<h2 class="h3 font-bold">Admin Panel</h2>
	</Navigation.Header>

	<Navigation.Content>
		<Navigation.Group>
			<Navigation.Label class="pl-4 text-xs font-bold uppercase opacity-50">Management</Navigation.Label>
			<Navigation.Menu class="px-2">
				<Navigation.TriggerAnchor href="/admin/dashboard" class={currentPath === '/admin/dashboard' ? 'preset-tonal' : ''}>
					<BookIcon class="size-4" />
					<Navigation.TriggerText>Books</Navigation.TriggerText>
				</Navigation.TriggerAnchor>
				<Navigation.TriggerAnchor href="/admin/dashboard/chapters" class={currentPath === '/admin/dashboard/chapters' ? 'preset-tonal' : ''}>
					<FileTextIcon class="size-4" />
					<Navigation.TriggerText>Chapters</Navigation.TriggerText>
				</Navigation.TriggerAnchor>
				<Navigation.TriggerAnchor href="/admin/dashboard/worlds" class={currentPath === '/admin/dashboard/worlds' ? 'preset-tonal' : ''}>
					<GlobeIcon class="size-4" />
					<Navigation.TriggerText>Worlds</Navigation.TriggerText>
				</Navigation.TriggerAnchor>
				<Navigation.TriggerAnchor href="/admin/dashboard/characters" class={currentPath === '/admin/dashboard/characters' ? 'preset-tonal' : ''}>
					<UsersIcon class="size-4" />
					<Navigation.TriggerText>Characters</Navigation.TriggerText>
				</Navigation.TriggerAnchor>
			</Navigation.Menu>
		</Navigation.Group>
	</Navigation.Content>

	<Navigation.Footer class="space-y-2 p-2">
		<Navigation.TriggerAnchor href="/" title="Back to Home" aria-label="Back to Home">
			<HomeIcon class="size-4" />
			<Navigation.TriggerText>Back to Home</Navigation.TriggerText>
		</Navigation.TriggerAnchor>
		<form method="POST" action="/admin/logout" class="w-full">
			<button type="submit" class="btn w-full justify-start hover:preset-tonal-error">
				<LogOutIcon class="size-4" />
				<span>Sign Out</span>
			</button>
		</form>
	</Navigation.Footer>
</Navigation>
