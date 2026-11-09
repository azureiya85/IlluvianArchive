<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Sign in</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-sm items-center px-4">
	<form
		method="POST"
		class="card preset-filled-surface-100-900 w-full space-y-4 p-6"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<h1 class="h3">Sign in</h1>

		{#if form?.incorrect}
			<p class="text-error-500" role="alert">Incorrect email or password.</p>
		{/if}

		<label class="label">
			<span class="label-text">Email</span>
			<input class="input" type="email" name="email" autocomplete="username"
				value={form?.email ?? ''} required />
		</label>

		<label class="label">
			<span class="label-text">Password</span>
			<input class="input" type="password" name="password"
				autocomplete="current-password" required />
		</label>

		<button class="btn preset-filled-primary-500 w-full" disabled={loading}>
			{loading ? 'Signing in…' : 'Sign in'}
		</button>
	</form>
</main>
