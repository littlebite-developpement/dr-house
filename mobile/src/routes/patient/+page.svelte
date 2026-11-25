<script lang="ts">
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import QuickActions from '$lib/components/QuickActions.svelte';
	import RoutineBanner from '$lib/components/RoutineBanner.svelte';
	import TasksSection from '$lib/components/TasksSection.svelte';
	import { routineTasks, type Task } from '$lib/utils/tasks';

	let slide = $state(0);
	let tasks = $state<Task[]>(routineTasks.map((task) => ({ ...task })));

	function addTask() {
		tasks.push({
			id: crypto.randomUUID(),
			title: 'Nouvelle tâche',
			subtitle: 'À planifier',
			Icon: ClipboardList
		});
	}
</script>

<div class="mx-auto flex min-h-full w-full max-w-md flex-col px-5 pt-3">
	<RoutineBanner bind:index={slide} />

	<QuickActions />

	<div class="h-px w-full bg-base-content/10"></div>

	<TasksSection {tasks} onAdd={addTask} />
</div>
