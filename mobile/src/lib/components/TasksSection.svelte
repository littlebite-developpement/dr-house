<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import TaskItem from './TaskItem.svelte';
	import type { Task } from '$lib/utils/tasks';

	let { tasks, onAdd }: { tasks: Task[]; onAdd?: () => void } = $props();

	/* two visual columns, filled row by row (1 → left, 2 → right, …)
	   so the reading order stays natural */
	const left = $derived(tasks.filter((_, i) => i % 2 === 0));
	const right = $derived(tasks.filter((_, i) => i % 2 === 1));
</script>

<section class="flex flex-1 flex-col pt-2">
	<header class="flex items-center justify-between pb-4">
		<h2 class="text-xl font-semibold text-primary">Tâches</h2>
		<button
			type="button"
			onclick={onAdd}
			class="flex items-center gap-1 rounded-full bg-primary/20 px-3.5 py-1.5 text-sm font-medium text-primary transition active:scale-95"
		>
			<Plus size={14} strokeWidth={2.5} />
			Task
		</button>
	</header>

	<!-- flex-1 lets the centre rule run down to the bottom of the screen -->
	<div class="grid flex-1 grid-cols-2">
		<div class="space-y-3 pr-3">
			{#each left as task (task.id)}
				<TaskItem {task} />
			{/each}
		</div>
		<div class="space-y-3 border-l border-base-content/15 pl-3">
			{#each right as task (task.id)}
				<TaskItem {task} />
			{/each}
		</div>
	</div>
</section>
