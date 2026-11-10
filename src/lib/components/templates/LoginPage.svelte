<script lang="ts">
	import LoginForm from '#lib/components/molecules/LoginForm.svelte';

	interface Props {
		form?: {
			incorrect?: boolean;
			email?: string;
		} | null;
	}

	let { form }: Props = $props();
</script>

<svelte:head>
	<title>Sign in</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-sm items-center px-4">
	<LoginForm {form} />
</main>
