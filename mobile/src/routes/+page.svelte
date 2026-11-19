<script lang="ts">
	import GlassContainer from '$lib/components/GlassContainer.svelte';
	import ActivityChart from '$lib/components/ActivityChart.svelte';
	// Subpath imports: the `lucide-svelte` umbrella barrel re-exports ~1686
	// icons, which Vite can't pre-bundle (it ships one .svelte per icon) and
	// must therefore load entirely at runtime. Importing each icon directly
	// keeps only the used ones in the module graph.
	import Activity from 'lucide-svelte/icons/activity';
	import BedDouble from 'lucide-svelte/icons/bed-double';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import Droplet from 'lucide-svelte/icons/droplet';
	import GlassWater from 'lucide-svelte/icons/glass-water';
	import HeartPulse from 'lucide-svelte/icons/heart-pulse';
	import Pill from 'lucide-svelte/icons/pill';
	import Scale from 'lucide-svelte/icons/scale';
	import Syringe from 'lucide-svelte/icons/syringe';
	import TrendingUp from 'lucide-svelte/icons/trending-up';

	const daily = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

	type Row = { Icon: typeof Droplet; label: string; note: string; chip: string };
	const rows: Row[] = [
		{ Icon: Droplet, label: 'Glycémie', note: 'Dernier relevé', chip: 'bg-primary/15 text-primary' },
		{ Icon: Pill, label: 'Metformine', note: 'Continue — appui', chip: 'bg-success/15 text-success' },
		{ Icon: Syringe, label: 'Insuline', note: 'Intervalle', chip: 'bg-secondary/15 text-secondary' },
		{ Icon: CalendarDays, label: 'Consultation', note: 'Dr House · jeudi 10:15', chip: 'bg-info/15 text-info' },
		{ Icon: HeartPulse, label: 'Tension', note: 'La valeur d’hier', chip: 'bg-error/15 text-error' },
		{ Icon: Activity, label: 'Activité', note: '6 842 pas aujourd’hui', chip: 'bg-accent/15 text-accent' },
		{ Icon: Scale, label: 'Poids', note: '72,4 kg', chip: 'bg-base-content/10 text-base-content/60' },
		{ Icon: BedDouble, label: 'Sommeil', note: '7 h 20', chip: 'bg-info/15 text-info' },
		{ Icon: GlassWater, label: 'Hydratation', note: 'thank', chip: 'bg-info/15 text-info' }
	];
</script>

<!-- test harness for the liquid-glass container:
     a summary card + a list of rows; scroll to trigger the reveal on each -->
<div class="mx-auto max-w-md px-4 pb-28">
	<!-- greeting -->
	<div class="space-y-1 py-6">
		<h1 class="text-2xl font-bold tracking-tight">Bonjour</h1>
		<p class="text-sm text-base-content/60">Votre journée, {daily}</p>
	</div>

	<!-- activity chart -->
	<GlassContainer class="p-6" reveal delay={100}>
		<ActivityChart
			steps={6842}
			maxSteps={10000}
			calories={327}
			maxCalories={500}
			distance={5.2}
			maxDistance={8}
			size={200}
			strokeWidth={12}
			gap={6}
		/>
	</GlassContainer>
</div>
