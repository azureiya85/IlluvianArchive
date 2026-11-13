<script lang="ts">
	import TopBar from '#lib/components/molecules/TopBar.svelte';
	import BookList from '#lib/components/organisms/BookList.svelte';
</script>

<div class="min-h-screen bg-surface-50-950 pb-20">
	<TopBar />

	<main class="mx-auto mt-12 max-w-7xl px-4">
		<BookList />
	</main>
</div>
