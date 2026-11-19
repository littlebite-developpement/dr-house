<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { motion } from '@humanspeak/svelte-motion';
	import House from 'lucide-svelte/icons/house';
	import Stethoscope from 'lucide-svelte/icons/stethoscope';
	import User from 'lucide-svelte/icons/user';
	import Users from 'lucide-svelte/icons/users';

	/* ── elastic, as numbers a person can hold ─────────────
	   Every elastic knob is 0..100 on the outside and real
	   units on the inside, and 50 is always what the component
	   was already tuned to. */

	/* duration multiplier: 0 is ~1.6x slower, 100 is 2.5x
	   faster, 50 is exactly 1 */
	const rate = (speed: number) => 1.6 - (speed / 100) * 1.2;

	/* second control point y of a cubic-bezier is the whole
	   overshoot; `tuned` is what the component was drawn
	   with, so 50 returns the design unchanged */
	const overshoot = (bounce: number, tuned: number) =>
		Number((1 + (bounce / 100) * (tuned - 1) * 2).toFixed(3));

	type CubicBezier = [number, number, number, number];

	/* the same, as a motion-dom BezierDefinition */
	const curve = (bounce: number, tuned: number, x1 = 0.28, x2 = 0.36): CubicBezier => [
		x1,
		overshoot(bounce, tuned),
		x2,
		1
	];

	const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

	/* ── the tabs: one per route ─────────────────────────── */
	type Tab = { key: string; label: string; href: string; Icon: typeof House };

	const BAR: Tab[] = [
		{ key: 'home', label: 'Accueil', href: '/', Icon: House },
		{ key: 'patient', label: 'Patient', href: '/patient', Icon: Users },
		{ key: 'medical', label: 'Médical', href: '/medical', Icon: Stethoscope },
		{ key: 'profile', label: 'Profil', href: '/profile', Icon: User }
	];

	/* the URL is the single source of truth for which tab is lit —
	   deep links and back/forward keep the highlight honest */
	const keyForPath = (path: string): string => {
		if (path.startsWith('/patient')) return 'patient';
		if (path.startsWith('/medical')) return 'medical';
		if (path.startsWith('/profile')) return 'profile';
		return 'home';
	};

	type Ind = { p: number; s: number };

	/* the two shared mappings, centred on 50: transform and size
	   overshoot by different amounts on purpose — the box arrives
	   before its edges finish, which reads as give rather than a
	   bounce */
	const settle = (bounce: number) => ({
		move: curve(bounce, 1.28, 0.28, 0.36),
		size: curve(bounce, 1.34, 0.24, 0.38)
	});

	/* the pill's corner. The slot is 44px tall, so 28 is a
	   full round on a 6px pad — a true floating pill */
	const NAV_CORNER = 28;

	type Props = {
		/* glyph size inside the 44px slot */
		glyph?: number;
		axis?: 'row' | 'column';
		/* how much of the gap between the two slots the pill
		   spans while in transit: 0 slides, 100 covers both
		   ends at once */
		dilate?: number;
		bounce?: number;
		speed?: number;
		hug?: number;
		/* the pill's own corner, 0..28 */
		corner?: number;
	};

	let {
		glyph = 18,
		axis = 'row',
		dilate = 100,
		bounce = 50,
		speed = 50,
		hug = 6,
		corner = NAV_CORNER
	}: Props = $props();

	const vertical = $derived(axis === 'column');
	const cornerRadius = $derived(clamp(corner, 0, NAV_CORNER));

	let active = $state(keyForPath(page.url.pathname));
	let ind = $state<Ind | null>(null);
	let phase = $state<'idle' | 'stretch' | 'settle'>('idle');

	let track: HTMLElement;
	let refs = $state<Record<string, HTMLButtonElement | null>>({});
	let indRef: Ind | null = null;
	let timer: ReturnType<typeof setTimeout> | undefined;

	const measure = (k: string): Ind | null => {
		const el = refs[k];
		if (!el) return null;
		return vertical
			? { p: el.offsetTop, s: el.offsetHeight }
			: { p: el.offsetLeft, s: el.offsetWidth };
	};

	/* snap the pill under the active tab without animating
	   (first paint, resize) */
	function remeasure() {
		const next = measure(active);
		if (!next) return;
		indRef = next;
		phase = 'idle';
		ind = next;
	}

	/* glide the pill to a tab, running the two-phase stretch/settle */
	function moveTo(k: string, animate = true) {
		if (k === active) return;
		const to = measure(k);
		const from = indRef;
		active = k;
		if (!to) return;
		clearTimeout(timer);
		if (!from || !animate) {
			indRef = to;
			phase = animate ? 'settle' : 'idle';
			ind = to;
			return;
		}
		/* the full union of both slots is as far as the pill ever
		   reaches; dilate scales back from there, so 0 is a slide
		   and 100 is the stretch */
		const start = Math.min(from.p, to.p);
		const end = Math.max(from.p + from.s, to.p + to.s);
		const grow = dilate / 100;
		phase = 'stretch';
		ind = {
			p: to.p + (start - to.p) * grow,
			s: to.s + (end - start - to.s) * grow
		};
		/* the handoff rides the same clock as the phases */
		timer = setTimeout(() => {
			indRef = to;
			phase = 'settle';
			ind = to;
		}, 150 * rate(speed));
	}

	onMount(() => {
		/* adopt the route we landed on before the first measure */
		active = keyForPath(page.url.pathname);
		remeasure();
		const ro = new ResizeObserver(remeasure);
		ro.observe(track);
		return () => {
			ro.disconnect();
			clearTimeout(timer);
		};
	});

	/* back/forward, redirects and deep links move the pill too */
	$effect(() => {
		const k = keyForPath(page.url.pathname);
		if (k !== active) moveTo(k);
	});

	function go(key: string, href: string) {
		/* animate on tap for an instant response, then change route */
		moveTo(key);
		goto(href);
	}

	/* per-phase transitions for the indicator. Transform moves
	   on the move curve, width/height finish on the size curve —
	   same split as the CSS version, decided in JS this time. */
	const indicatorTransition = $derived.by(() => {
		if (phase === 'idle') return { duration: 0 };
		const r = rate(speed);
		if (phase === 'stretch') {
			return { duration: (190 * r) / 1000, ease: [0.32, 0.72, 0.24, 1] as CubicBezier };
		}
		const curves = settle(bounce);
		return {
			duration: (420 * r) / 1000,
			ease: curves.move,
			width: { ease: curves.size },
			height: { ease: curves.size }
		};
	});

	const indicatorAnimate = $derived(
		vertical
			? { y: ind?.p ?? 0, height: ind?.s ?? 0, opacity: ind ? 1 : 0 }
			: { x: ind?.p ?? 0, width: ind?.s ?? 0, opacity: ind ? 1 : 0 }
	);
</script>

<div class="bar-well" style:--gnav-r="{cornerRadius}px">
	<nav
		bind:this={track}
		class="gnav"
		data-orientation={vertical ? 'vertical' : 'horizontal'}
		style:--nav-pad="{hug}px"
		aria-label="Navigation principale"
	>
		<motion.span
			class="gnav-ind"
			data-phase={phase}
			initial={false}
			animate={indicatorAnimate}
			transition={indicatorTransition}
			aria-hidden="true"
		></motion.span>
		{#each BAR as { key, label, href, Icon } (key)}
			<motion.button
				bind:ref={refs[key]}
				class="gnav-item"
				data-active={active === key}
				aria-label={label}
				aria-current={active === key ? 'page' : undefined}
				whileTap={{ scale: 0.88 }}
				onclick={() => go(key, href)}
			>
				<Icon size={glyph} strokeWidth={2} />
			</motion.button>
		{/each}
	</nav>
</div>

<style>
	/* ── floating glass tab bar ────────────────────────────
	   A frosted pill hovering above the bottom edge, tinted
	   from the active daisyUI theme: base-100 for the glass,
	   base-content for the glyphs, primary for the selection. */

	/* the float — a transparent, full-width stage pinned to the
	   bottom. It ignores pointer events so taps fall through to
	   the page; only the pill inside it is interactive. */
	.bar-well {
		position: fixed;
		inset: auto 0 0 0;
		z-index: 30;
		display: flex;
		justify-content: center;
		padding: 0.5rem 1rem calc(1rem + env(safe-area-inset-bottom, 0px));
		pointer-events: none;
	}

	/* the pill itself */
	.gnav {
		/* glass, expressed in daisyUI theme colours so it follows
		   whichever theme is active (light, dark, or a custom one) */
		--pane: color-mix(in oklab, var(--color-base-100, #ffffff) 70%, transparent);
		--ink: var(--color-base-content, #1c1c1e);
		--pane-thumb: color-mix(in oklab, var(--color-primary, #000000) 18%, transparent);
		--pane-edge: color-mix(in oklab, var(--color-base-content, #000000) 12%, transparent);
		--bar-slot: 44px;
		--bar-gap: 2px;

		position: relative;
		display: inline-flex;
		gap: var(--bar-gap);
		padding: var(--nav-pad);
		border-radius: var(--gnav-r, 999px);
		background: var(--pane);
		-webkit-backdrop-filter: blur(var(--g-blur, 12px)) saturate(var(--g-sat, 180%));
		backdrop-filter: blur(var(--g-blur, 12px)) saturate(var(--g-sat, 180%));
		box-shadow: var(
			--g-shadow,
			0 12px 32px -8px rgba(0, 0, 0, 0.3),
			0 2px 8px -2px rgba(0, 0, 0, 0.12)
		);
		isolation: isolate;
		color: var(--ink);
		pointer-events: auto;
	}

	/* ── the rim ─────────────────────────────────────────────
	   A graded border — bright toward the light, a weaker catch
	   at the far corner — painted with the two-mask trick since
	   gradients can't live in a border. */
	.gnav::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		border: 1px solid transparent;
		background:
			linear-gradient(
				142deg,
				rgba(255, 255, 255, var(--g-edge-hi, 0.75)) 0%,
				rgba(255, 255, 255, var(--g-edge-lo, 0.1)) 26%,
				rgba(255, 255, 255, var(--g-edge-lo, 0.1)) 62%,
				rgba(255, 255, 255, var(--g-edge-far, 0.4)) 100%
			)
			border-box;
		-webkit-mask:
			linear-gradient(#000 0 0) padding-box,
			linear-gradient(#000 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#000 0 0) padding-box,
			linear-gradient(#000 0 0);
		mask-composite: exclude;
		pointer-events: none;
		z-index: 3;
	}

	.gnav[data-orientation='vertical'] {
		flex-direction: column;
		border-radius: var(--gnav-r, 30px);
	}

	/* the indicator: a soft primary wash — the active glyph colour
	   does most of the selection work */
	:global(.gnav-ind) {
		position: absolute;
		top: var(--nav-pad);
		left: 0;
		height: calc(100% - var(--nav-pad) * 2);
		border-radius: var(--gnav-r, 999px);
		background: var(--pane-thumb);
		pointer-events: none;
		will-change: transform, width;
	}

	:global(.gnav)[data-orientation='vertical'] :global(.gnav-ind) {
		top: 0;
		left: var(--nav-pad);
		width: calc(100% - var(--nav-pad) * 2);
		height: auto;
	}

	:global(.gnav-item) {
		position: relative;
		z-index: 1;
		width: var(--bar-slot);
		height: var(--bar-slot);
		border: 0;
		padding: 0;
		border-radius: var(--gnav-r, 999px);
		background: none;
		color: inherit;
		opacity: 0.45;
		display: grid;
		place-items: center;
		cursor: pointer;
		transition:
			opacity 260ms cubic-bezier(0.32, 0.72, 0.24, 1),
			color 260ms cubic-bezier(0.32, 0.72, 0.24, 1);
	}

	:global(.gnav-item):hover {
		opacity: 0.72;
	}

	/* Entirely :global: the .gnav-item elements are rendered by the
	   motion.button child component, so Svelte cannot scope-match a
	   bare [data-active] compound and would prune it from the CSS. */
	:global(.gnav-item[data-active='true']) {
		opacity: 1;
		color: var(--color-primary, var(--ink));
	}

	:global(.gnav-item):focus-visible {
		outline: 1.5px solid var(--ink);
		outline-offset: 2px;
	}
</style>
