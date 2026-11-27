<script lang="ts">
	const raccourcis = [
		{ label: 'Hôpital', href: '#' },
		{ label: 'Pharmacie', href: '#' },
		{ label: 'Ordonnance', href: '#' },
		{ label: 'Médecin', href: '#' }
	];

	const rubriques = [
		{ label: 'Rappel et consultation', href: '#' },
		{ label: 'Rendez-vous', href: '#' },
		{ label: 'Dossier médical', href: '#' }
	];
</script>

<section class="flex flex-col gap-5">
	<div>
		<h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/50">
			Accès rapide
		</h2>

		<div class="grid grid-cols-2 gap-3">
			{#each raccourcis as item (item.label)}
				<a
					href={item.href}
					class="flex h-20 items-center justify-center rounded-2xl bg-base-content/30 px-3 text-center text-base text-base-100 transition active:scale-[0.97]"
				>
					{item.label}
				</a>
			{/each}
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/50">
			Mon suivi
		</h2>

		<nav class="flex flex-col gap-3" aria-label="Rubriques médicales">
			{#each rubriques as item (item.label)}
				<a
					href={item.href}
					class="flex h-14 items-center rounded-2xl bg-base-content/30 px-5 text-base text-base-100 transition active:scale-[0.98]"
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</section>