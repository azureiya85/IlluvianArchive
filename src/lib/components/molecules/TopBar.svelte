<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="flex flex-col">
	<!-- Hero Image Header -->
	<div class="relative flex h-[33vh] w-full items-center justify-center overflow-hidden bg-surface-900">
		<img
			src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
			alt="Library Background"
			class="absolute inset-0 h-full w-full object-cover opacity-30"
		/>

		<!--
			SVG Placeholder - Uncomment and replace when ready
			<img src="/illuvian-logo.svg" alt="Illuvian Archive" class="relative z-10 w-64" />
		-->

		<div class="relative z-10 text-center text-5xl font-black uppercase tracking-widest text-white drop-shadow-lg md:text-7xl">
			<span class="block text-primary-400">Illuvian</span>
			<span class="block">Archive</span>
		</div>
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
