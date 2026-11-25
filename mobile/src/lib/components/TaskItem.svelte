<script lang="ts">
	import Circle from 'lucide-svelte/icons/circle';
	import type { Task } from '$lib/utils/tasks';

	let { task }: { task: Task } = $props();

	const Icon = $derived(task.Icon ?? Circle);
</script>

<div class="flex items-center gap-3">
	<span
		class="grid size-12 shrink-0 place-items-center rounded-lg bg-base-content/15 text-base-content/70"
	>
		<Icon size={20} strokeWidth={1.75} />
	</span>

	<div class="min-w-0">
		<p
			class="truncate text-sm font-medium {task.done
				? 'text-base-content/40 line-through'
				: ''}"
		>
			{task.title}
		</p>
		{#if task.subtitle}
			<p class="truncate text-xs text-base-content/55">{task.subtitle}</p>
		{/if}
	</div>
</div>
