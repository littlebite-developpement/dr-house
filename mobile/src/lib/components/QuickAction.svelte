<script lang="ts">
	import Dumbbell from 'lucide-svelte/icons/dumbbell';

	type Props = {
		label: string;
		Icon: typeof Dumbbell;
		onclick?: () => void;
	};

	let { label, Icon, onclick }: Props = $props();
</script>

<button
	type="button"
	class="flex flex-col items-center gap-2.5 transition active:scale-95"
	aria-label={label}
	{onclick}
>
	<span
		class="grid size-[72px] place-items-center rounded-full bg-base-content/15 text-base-content/70"
	>
		<Icon size={26} strokeWidth={1.75} />
	</span>
	<span class="text-[15px] leading-none text-primary">{label}</span>
</button>

<style>
	/* keep the label from being announced twice */
	button:focus-visible {
		outline: 2px solid var(--color-primary, #22c55e);
		outline-offset: 4px;
		border-radius: 999px;
	}
</style>
