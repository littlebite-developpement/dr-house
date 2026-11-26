<script lang="ts">
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import SquarePen from 'lucide-svelte/icons/square-pen';

	// À remplacer par les vraies données lors du branchement
	const utilisateur = {
		name: 'Amadou Diamanka',
		email: 'diamankamadou9@gmail.com',
		location: 'Bambey, Sénégal',
		image: '',
		bio: ''
	};

	const initiales = utilisateur.name
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((mot) => mot[0]?.toUpperCase())
		.join('');

	const menu = [
		{ label: 'Compte' },
		{ label: 'Information personnelle' },
		{ label: "Paramètre de l'application" },
		{ label: "Conditions d'utilisateur" }
	];
</script>

<section class="flex min-h-full flex-col px-5 pb-32 pt-2">
	<!-- Bouton modifier -->
	<div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Profile</h1>
        <button type="button" class="btn btn-ghost btn-circle btn-sm" aria-label="Modifier le profil">
            <SquarePen class="size-6" />
        </button>
    </div>

	<!-- Identité -->
	<header class="mt-2 flex flex-col items-center text-center">
		{#if utilisateur.image}
			<img
				src={utilisateur.image}
				alt={`Photo de ${utilisateur.name}`}
				class="size-40 rounded-full object-cover shadow-md ring-2 ring-base-100"
			/>
		{:else}
			<div
				class="flex size-40 items-center justify-center rounded-full bg-primary text-5xl font-bold text-primary-content shadow-md"
				aria-hidden="true"
			>
				{initiales}
			</div>
		{/if}

		<h1 class="mt-5 text-3xl font-bold text-base-content">{utilisateur.name}</h1>
		<p class="mt-1 text-base text-base-content/70">{utilisateur.email}</p>
		<p class="mt-1 text-base text-base-content/70">{utilisateur.location}</p>
	</header>

	<!-- Bio -->
	<div
		class="mt-8 flex min-h-28 items-center justify-center rounded-3xl bg-base-content/30 px-6 py-5 text-center text-lg text-base-100"
	>
		{utilisateur.bio?.trim() ? utilisateur.bio : 'Bios'}
	</div>

	<!-- Menu -->
	<nav class="mt-8 flex flex-col gap-4" aria-label="Paramètres du profil">
		{#each menu as item (item.label)}
			<button
				type="button"
				class="flex h-[76px] w-full items-center justify-between rounded-3xl bg-base-content/30 px-6 text-left text-lg text-base-100 transition active:scale-[0.98]"
			>
				<span>{item.label}</span>
				<ChevronRight class="size-5 opacity-80" />
			</button>
		{/each}
	</nav>
</section>