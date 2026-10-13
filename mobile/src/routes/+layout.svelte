<script lang="ts">
	import '../app.css';
	import { Bell, Cross, Moon, Sun } from 'lucide-svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	let dark = $state(false);

	function toggleTheme() {
		dark = !dark;
		document.documentElement.dataset.theme = dark ? 'dark' : 'light';
		try {
			localStorage.setItem('dr-house-theme', dark ? 'dark' : 'light');
		} catch {}
	}
</script>

<!-- mobile app shell: header on top, scrollable content, floating tab bar pinned to the bottom -->
<div class="flex h-dvh flex-col bg-base-100 text-base-content">
	<header class="navbar sticky top-0 z-20 border-b border-base-200 bg-base-100/70 px-4 backdrop-blur-md"
		style="padding-top: calc(0.75rem + env(safe-area-inset-top, 0px))">
		<div class="flex-1">
			<div class="flex items-center gap-2">
				<Cross size={20} strokeWidth={2.5} class="text-primary" />
				<span class="text-lg font-bold">Dr House</span>
			</div>
		</div>

		<div class="flex-none flex items-center gap-1">
			<button class="btn btn-ghost btn-circle btn-sm" type="button" aria-label="Notifications">
				<Bell size={18} />
				<span class="badge badge-error badge-xs absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full p-0" aria-hidden="true"></span>
			</button>
			<button class="btn btn-ghost btn-circle btn-sm" type="button" aria-label="Toggle theme" onclick={toggleTheme}>
				{#if dark}
					<Sun size={18} />
				{:else}
					<Moon size={18} />
				{/if}
			</button>
		</div>
	</header>

	<!-- bottom padding keeps the last content clear of the floating tab bar -->
	<main class="flex-1 overflow-y-auto pb-28">
		{@render children()}
	</main>

	<Navbar />
</div>
