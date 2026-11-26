<script lang="ts">
	type Slide = { id: string; src: string; alt: string };

	const DEFAULT_SLIDES: Slide[] = [
		{ id: 'glycemie', src: '/ads/pub-glycemie.svg', alt: 'Suivez votre glycémie' },
		{ id: 'nutrition', src: '/ads/pub-nutrition.svg', alt: 'Mangez équilibré' },
		{ id: 'activite', src: '/ads/pub-activite.svg', alt: 'Bougez chaque jour' },
		{
			id: 'teleconsultation',
			src: '/ads/pub-teleconsultation.svg',
			alt: 'Téléconsultation avec un médecin'
		},
		{ id: 'routine', src: '/ads/pub-routine.svg', alt: 'Votre routine santé' }
	];

	let {
		slides = DEFAULT_SLIDES,
		index = $bindable(0)
	}: { slides?: Slide[]; index?: number } = $props();

	let viewport: HTMLDivElement;

	type Drag = {
		active: boolean;
		axis: 'x' | 'y' | null;
		startX: number;
		startY: number;
		dx: number;
	};

	let drag = $state<Drag>({ active: false, axis: null, startX: 0, startY: 0, dx: 0 });

	const dragging = $derived(drag.active && drag.axis === 'x');
	const shift = $derived(
		`translate3d(calc(${-index * 100}% + ${dragging ? drag.dx : 0}px), 0, 0)`
	);

	function goTo(i: number) {
		index = Math.max(0, Math.min(slides.length - 1, i));
	}

	function releaseCapture(e: PointerEvent) {
		if (viewport?.hasPointerCapture(e.pointerId)) {
			viewport.releasePointerCapture(e.pointerId);
		}
	}

	function onPointerDown(e: PointerEvent) {
		/* ignore right/middle mouse buttons */
		if (e.pointerType === 'mouse' && e.button !== 0) return;

		drag = { active: true, axis: null, startX: e.clientX, startY: e.clientY, dx: 0 };
		/* keep receiving moves even when the finger leaves the banner */
		viewport?.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!drag.active) return;

		const dx = e.clientX - drag.startX;
		const dy = e.clientY - drag.startY;

		/* decide once whether this gesture is a horizontal swipe or a
		   vertical page scroll, so the two never fight each other */
		if (!drag.axis) {
			if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
			drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
			if (drag.axis === 'y') {
				drag.active = false;
				releaseCapture(e);
				return;
			}
		}

		if (drag.axis !== 'x') return;
		e.preventDefault();

		/* damp the pull at both ends so the edges feel elastic */
		const atStart = index === 0 && dx > 0;
		const atEnd = index === slides.length - 1 && dx < 0;
		drag.dx = atStart || atEnd ? dx * 0.35 : dx;
	}

	function onPointerEnd(e: PointerEvent, commit: boolean) {
		const wasSwiping = drag.active && drag.axis === 'x';
		const dx = drag.dx;
		const width = viewport?.clientWidth ?? 0;

		drag = { active: false, axis: null, startX: 0, startY: 0, dx: 0 };
		releaseCapture(e);

		if (!wasSwiping || !commit || !width) return;

		/* a short flick or a decisive drag both move one slide */
		const threshold = Math.max(40, Math.min(80, width * 0.18));
		if (dx <= -threshold) index = Math.min(slides.length - 1, index + 1);
		else if (dx >= threshold) index = Math.max(0, index - 1);
	}
</script>

<section aria-label="Annonces">
	<div class="mb-3 flex justify-center gap-2">
		{#each slides as slide, i (slide.id)}
			<button
				type="button"
				class="h-2.5 w-2.5 rounded-full transition-colors {i === index
					? 'bg-primary'
					: 'bg-base-content/20'}"
				aria-label="Aller à l’annonce {i + 1}"
				aria-current={i === index ? 'true' : undefined}
				onclick={() => goTo(i)}
			></button>
		{/each}
	</div>

	<div
		bind:this={viewport}
		class="carousel overflow-hidden rounded-[28px]"
		class:dragging
		role="group"
		aria-roledescription="carrousel"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={(e) => onPointerEnd(e, true)}
		onpointercancel={(e) => onPointerEnd(e, false)}
	>
		<div class="track" class:dragging style:transform={shift}>
			{#each slides as slide (slide.id)}
				<img
					src={slide.src}
					alt={slide.alt}
					class="aspect-[780/380] w-full shrink-0 object-cover"
					draggable="false"
				/>
			{/each}
		</div>
	</div>
</section>

<style>
	/* the stage is the element that receives the gestures: it never moves,
	   so every visible slide is always under the pointer */
	.carousel {
		cursor: grab;
		touch-action: pan-y;
		user-select: none;
		-webkit-user-select: none;
		-webkit-touch-callout: none;
	}

	.carousel.dragging {
		cursor: grabbing;
	}

	.track {
		display: flex;
		will-change: transform;
		transition: transform 340ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* no easing while the finger is down — the slide must track it 1:1 */
	.track.dragging {
		transition: none;
	}

	.track img {
		-webkit-user-drag: none;
		pointer-events: none;
	}
</style>
