<script lang="ts">
	import RoutineBanner from '$lib/components/RoutineBanner.svelte';
	import Medicale from '$lib/components/Medicale.svelte';
</script>

<div class="mx-auto flex min-h-full w-full max-w-md flex-col px-5 pb-28 pt-3">
	<RoutineBanner />

	<div class="my-4 h-px w-full bg-base-content/10"></div>

	<Medicale />
</div>