<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import './nye.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell slotPageContent="flex flex-col justify-center">
	<slot />
</AppShell>

<svelte:head>
	<title>SydNYE 2023 Updates</title>
</svelte:head>
