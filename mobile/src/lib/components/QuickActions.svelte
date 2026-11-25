<script lang="ts">
	import Apple from 'lucide-svelte/icons/apple';
	import Dumbbell from 'lucide-svelte/icons/dumbbell';
	import NotebookPen from 'lucide-svelte/icons/notebook-pen';
	import QuickAction from './QuickAction.svelte';

	type ActionKey = 'sport' | 'nutrition' | 'routine';

	type Action = { key: ActionKey; label: string; Icon: typeof Dumbbell };

	const ACTIONS: Action[] = [
		{ key: 'sport', label: 'Sport', Icon: Dumbbell },
		{ key: 'nutrition', label: 'Nourriture', Icon: Apple },
		{ key: 'routine', label: 'Routine', Icon: NotebookPen }
	];

	let { onSelect }: { onSelect?: (key: ActionKey) => void } = $props();
</script>

<div class="flex items-start justify-between px-2 py-6">
	{#each ACTIONS as { key, label, Icon } (key)}
		<QuickAction {label} {Icon} onclick={() => onSelect?.(key)} />
	{/each}
</div>
