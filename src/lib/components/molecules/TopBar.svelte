<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { directImageUrl } from '#lib/utils/image.ts';

	// Pull the global settings directly from the rune-native page state
	let siteTitle = $derived(page.data.siteSettings?.siteTitle || 'Illuvian Archive');
	let logo = $derived(page.data.siteSettings?.logo || null);
	let heroBanner = $derived(page.data.siteSettings?.heroBanner || null);

	// Fallback state if the logo URL is broken
	let logoError = $state(false);

	const PLACEHOLDER_BG = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000";

	// Split the site title to maintain the two-tone stacked typography style
	let titleWords = $derived(siteTitle.trim().split(' '));
	let firstWord = $derived(titleWords[0] || 'Illuvian');
	let restWords = $derived(titleWords.slice(1).join(' '));
</script>

<div class="flex flex-col">
	<!-- Hero Image Header -->
	<div class="relative flex h-[33vh] w-full items-center justify-center overflow-hidden bg-surface-900">
		<!-- Background Banner -->
		<img
			src={heroBanner ? directImageUrl(heroBanner) : PLACEHOLDER_BG}
			alt="Site Background"
			class="absolute inset-0 h-full w-full object-cover opacity-30"
			onerror={(e) => (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_BG}
		/>

		<!-- Logo or Typography Fallback -->
		{#if logo && !logoError}
			<img
				src={directImageUrl(logo)}
				alt={siteTitle}
				class="relative z-10 max-h-48 w-auto max-w-xs object-contain drop-shadow-lg md:max-w-md"
				onerror={() => logoError = true}
			/>
		{:else}
			<div class="relative z-10 text-center text-5xl font-black uppercase tracking-widest text-white drop-shadow-lg md:text-7xl">
				<span class="block text-primary-400">{firstWord}</span>
				{#if restWords}
					<span class="block">{restWords}</span>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Navigation Bar -->
	<nav class="flex w-full items-center justify-center gap-24 border-b border-surface-200-800 bg-surface-100-900 p-4 shadow-md">
		<a
			href={resolve('/')}
			class="font-bold tracking-wide transition-colors duration-200 hover:text-primary-500"
		>
			Home
		</a>
		<a
			href={resolve('/books')}
			class="font-bold tracking-wide transition-colors duration-200 hover:text-primary-500"
		>
			Books
		</a>
		<a
			href={resolve('/about')}
			class="font-bold tracking-wide transition-colors duration-200 hover:text-primary-500"
		>
			About
		</a>
	</nav>
</div>
