<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		reveal = false,
		delay = 0
	}: {
		children: Snippet;
		class?: string;
		reveal?: boolean;
		delay?: number;
	} = $props();
</script>

<div class={className} data-reveal={reveal} style:--reveal-delay="{delay}ms">
	{@render children()}
</div>
