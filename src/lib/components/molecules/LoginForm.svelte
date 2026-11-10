<script lang="ts">
	import Card from '#lib/components/atoms/Card.svelte';
	import Form from '#lib/components/atoms/Form.svelte';
	import Button from '#lib/components/atoms/Button.svelte';

	interface Props {
		form?: {
			incorrect?: boolean;
			email?: string;
		} | null;
	}

	let { form }: Props = $props();
	let loading = $state(false);
</script>

<Card class="preset-filled-surface-100-900 w-full p-6">
	<Form
		method="POST"
		class="space-y-4"
		submitEnhance={() => {
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
			<input
				class="input"
				type="email"
				name="email"
				autocomplete="username"
				value={form?.email ?? ''}
				required
			/>
		</label>

		<label class="label">
			<span class="label-text">Password</span>
			<input
				class="input"
				type="password"
				name="password"
				autocomplete="current-password"
				required
			/>
		</label>

		<Button class="preset-filled-primary-500 w-full" disabled={loading}>
			{loading ? 'Signing in…' : 'Sign in'}
		</Button>
	</Form>
</Card>
