<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import './algolia.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell slotPageContent="flex flex-col justify-center">
	<slot />
</AppShell>