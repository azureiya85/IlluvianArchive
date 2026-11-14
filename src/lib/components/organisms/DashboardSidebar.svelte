<script lang="ts">
	import { resolve } from '$app/paths';
	import Navigation, { type NavGroup } from '#lib/components/atoms/Navigation.svelte';
	import BookIcon from '@lucide/svelte/icons/book';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import UsersIcon from '@lucide/svelte/icons/users';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import HomeIcon from '@lucide/svelte/icons/house';

	let { currentPath = resolve('/admin/dashboard') }: { currentPath?: string } = $props();

	const navGroups: NavGroup[] = [
		{
			id: 'management',
			label: 'Management',
			items: [
				{ id: 'books', label: 'Books', href: resolve('/admin/dashboard'), icon: BookIcon },
				{ id: 'chapters', label: 'Chapters', href: resolve('/admin/dashboard/chapters'), icon: FileTextIcon },
				{ id: 'worlds', label: 'Worlds', href: resolve('/admin/dashboard/worlds'), icon: GlobeIcon },
				{ id: 'characters', label: 'Characters', href: resolve('/admin/dashboard/characters'), icon: UsersIcon },
				{ id: 'site', label: 'Site Data', href: resolve('/admin/dashboard/site'), icon: SettingsIcon }
			]
		}
	];
</script>

<Navigation
	groups={navGroups}
	{currentPath}
>
	{#snippet footerSnippet({ isCollapsed })}
		<a
			href={resolve('/')}
			title="Back to Home"
			aria-label="Back to Home"
			class="btn flex w-full items-center gap-2 p-2 justify-start hover:preset-tonal rounded-sm"
		>
			<HomeIcon class="size-4 shrink-0" />
			{#if !isCollapsed}
				<span class="truncate">Back to Home</span>
			{/if}
		</a>

		<form method="POST" action="/admin/logout" class="w-full">
			<button
				type="submit"
				title="Sign Out"
				aria-label="Sign Out"
				class="btn flex w-full items-center gap-2 p-2 justify-start hover:preset-tonal-error rounded-sm"
			>
				<LogOutIcon class="size-4 shrink-0" />
				{#if !isCollapsed}
					<span class="truncate">Sign Out</span>
				{/if}
			</button>
		</form>
	{/snippet}
</Navigation>
