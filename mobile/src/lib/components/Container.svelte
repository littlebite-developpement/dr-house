<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		style = '',
		reveal = false,
		delay = 0
	}: {
		children: Snippet;
		class?: string;
		style?: string;
		reveal?: boolean;
		delay?: number;
	} = $props();
</script>

<div

    class={className} {style} data-reveal={reveal} style:--reveal-delay="{delay}ms">
	{@render children()}
</div>
