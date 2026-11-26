<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import ActivityChart from '$lib/components/ActivityChart.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Sheet from '$lib/components/Sheet.svelte';
	import Activity from 'lucide-svelte/icons/activity';
	import BedDouble from 'lucide-svelte/icons/bed-double';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import Droplet from 'lucide-svelte/icons/droplet';
	import GlassWater from 'lucide-svelte/icons/glass-water';
	import HeartPulse from 'lucide-svelte/icons/heart-pulse';
	import LayoutDashboard from 'lucide-svelte/icons/layout-dashboard';
	import Pill from 'lucide-svelte/icons/pill';
	import Scale from 'lucide-svelte/icons/scale';
	import Square from 'lucide-svelte/icons/square';
	import Syringe from 'lucide-svelte/icons/syringe';

	const daily = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

	type Row = { Icon: typeof Droplet; label: string; note: string; chip: string };
	const rows: Row[] = [
		{ Icon: Droplet, label: 'Glycémie', note: 'Dernier relevé', chip: 'bg-primary/15 text-primary' },
		{ Icon: Pill, label: 'Metformine', note: 'Continue — appui', chip: 'bg-success/15 text-success' },
		{ Icon: Syringe, label: 'Insuline', note: 'Intervalle', chip: 'bg-secondary/15 text-secondary' },
		{ Icon: CalendarDays, label: 'Consultation', note: 'Dr House · jeudi 10:15', chip: 'bg-info/15 text-info' },
		{ Icon: HeartPulse, label: 'Tension', note: 'La valeur d\'hier', chip: 'bg-error/15 text-error' },
		{ Icon: Activity, label: 'Activité', note: '6 842 pas aujourd\'hui', chip: 'bg-accent/15 text-accent' },
		{ Icon: Scale, label: 'Poids', note: '72,4 kg', chip: 'bg-base-content/10 text-base-content/60' },
		{ Icon: BedDouble, label: 'Sommeil', note: '7 h 20', chip: 'bg-info/15 text-info' },
		{ Icon: GlassWater, label: 'Hydratation', note: 'thank', chip: 'bg-info/15 text-info' }
	];

	// Modal state
	let showModal = $state(false);
	function openModal() { showModal = true; }
	function closeModal() { showModal = false; }

	// BottomSheet state
	let showBottomSheet = $state(false);
	function openBottomSheet() { showBottomSheet = true; }
	function closeBottomSheet() { showBottomSheet = false; }
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
	<Container class="p-6" reveal delay={100}>
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
	</Container>

	<!-- Test Buttons Section -->
	<Container class="p-6 mt-6" reveal delay={200}>
		<h3 class="text-lg font-semibold text-base-content mb-4">Test des composants</h3>
		<div class="space-y-3">
			<button
				class="btn btn-primary w-full justify-start gap-3"
				onclick={openModal}
			>
				<LayoutDashboard class="w-5 h-5" />
				<span>Ouvrir la Modal (avec flou arrière-plan)</span>
			</button>
			<button
				class="btn btn-secondary w-full justify-start gap-3"
				onclick={openBottomSheet}
			>
				<Square class="w-5 h-5" />
				<span>Ouvrir le Bottom Sheet (draggable)</span>
			</button>
		</div>
	</Container>

	<!-- Health rows -->
	<div class="space-y-3 mt-6 px-4">
		{#each rows as row}
			<Container class="p-4 flex items-center gap-4" reveal delay={300}>
				<div class="rounded-xl p-3 {row.chip}">
					<row.Icon class="w-5 h-5" />
				</div>
				<div class="flex-1 min-w-0">
					<p class="font-medium text-base-content truncate">{row.label}</p>
					<p class="text-sm text-base-content/60 truncate">{row.note}</p>
				</div>
				<ChevronRight class="w-5 h-5 text-base-content/30 shrink-0" />
			</Container>
		{/each}
	</div>
</div>

<!-- Modal Component -->
<Modal
	open={showModal}
	title="Modal de test"
	onClose={closeModal}
>
	<div class="space-y-4">
		<p class="text-base-content/80">
			Ceci est une boîte modale avec un arrière-plan flouté.
			Cliquez en dehors de la boîte ou sur le bouton de fermeture pour la fermer.
		</p>
		<div class="flex gap-3 justify-end pt-4 border-t border-base-200">
			<button class="btn btn-ghost" onclick={closeModal}>Annuler</button>
			<button class="btn btn-primary" onclick={closeModal}>Confirmer</button>
		</div>
	</div>
</Modal>

<!-- BottomSheet Component -->
<Sheet
	open={showBottomSheet}
	title="Bottom Sheet"
	onClose={closeBottomSheet}
	snapPoints={['40%', '70%', '100%']}
	defaultSnap={2}
>
	<div class="space-y-4">
		<p class="text-base-content/80">
			Ceci est un panneau déroulant depuis le bas (Bottom Sheet).
			Vous pouvez le faire glisser vers le haut pour l'agrandir ou vers le bas pour le fermer.
		</p>
		<div class="grid grid-cols-2 gap-3">
			<button class="btn btn-outline btn-sm">Option 1</button>
			<button class="btn btn-outline btn-sm">Option 2</button>
			<button class="btn btn-outline btn-sm">Option 3</button>
			<button class="btn btn-outline btn-sm">Option 4</button>
		</div>
		<div class="pt-4 border-t border-base-200">
			<button class="btn btn-primary w-full" onclick={closeBottomSheet}>Fermer</button>
		</div>
	</div>
</Sheet>
