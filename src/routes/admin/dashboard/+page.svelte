<svelte:head>
	<title>Dashboard</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center gap-4 px-4">
	<p class="text-lg">You are logged in as Admin.</p>

	<form method="POST" action="/admin/logout">
		<button class="btn preset-filled-primary-500">Log out</button>
	</form>
</main>
