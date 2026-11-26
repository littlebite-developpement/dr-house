<script lang="ts">
	import { page } from '$app/state';
	import CircleUserRound from 'lucide-svelte/icons/circle-user-round';
	import HandHeart from 'lucide-svelte/icons/hand-heart';
	import Hospital from 'lucide-svelte/icons/hospital';
	import House from 'lucide-svelte/icons/house';
	import MessageCircle from 'lucide-svelte/icons/message-circle';

	type Item = {
		key: string;
		label: string;
		href: string;
		Icon: typeof House;
	};

	const ITEMS: Item[] = [
		{ key: 'home', label: 'Accueil', href: '/', Icon: House },
		{ key: 'messages', label: 'Messages', href: '/messages', Icon: MessageCircle },
		{ key: 'routine', label: 'Routine', href: '/patient', Icon: HandHeart },
		{ key: 'medical', label: 'Hôpitaux', href: '/medical', Icon: Hospital },
		{ key: 'profile', label: 'Profil', href: '/profile', Icon: CircleUserRound }
	];

	/* the URL is the single source of truth for the lit tab —
	   deep links and back/forward keep the highlight honest */
	const keyForPath = (path: string): string => {
		if (path.startsWith('/messages')) return 'messages';
		if (path.startsWith('/patient')) return 'routine';
		if (path.startsWith('/medical')) return 'medical';
		if (path.startsWith('/profile')) return 'profile';
		return 'home';
	};

	const active = $derived(keyForPath(page.url.pathname));
</script>

<div class="bar-well">
	<nav class="gnav backdrop-blur-sm" aria-label="Navigation principale">
		{#each ITEMS as { key, label, href, Icon } (key)}
			<a
				href={href}
				class="gnav-item"
				data-active={active === key}
				aria-label={label}
				aria-current={active === key ? 'page' : undefined}
			>
				<Icon size={22} strokeWidth={2} />
				<span class="gnav-label">{label}</span>
			</a>
		{/each}
	</nav>
</div>

<style>
	/* the float — a transparent, full-width stage pinned to the bottom;
	   only the pill inside is interactive */
	.bar-well {
		position: fixed;
		inset: auto 0 0 0;
		z-index: 30;
		display: flex;
		justify-content: center;
		padding: 0.5rem 1rem calc(1rem + env(safe-area-inset-bottom, 0px));
		pointer-events: none;
	}

	/* frosted bar: a light primary wash over the page content */
	.gnav {
		--accent: var(--color-primary, #22c55e);
		/* readable accent for text/icons: primary pulled toward the theme ink */
		--accent-ink: color-mix(
			in oklab,
			var(--color-primary, #22c55e) 45%,
			var(--color-base-content, #14532d)
		);

		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2px;
		width: 100%;
		max-width: 360px;
		padding: 6px;
		border-radius: 999px;
		border: 1px solid color-mix(in oklab, var(--accent) 34%, transparent);
		background: color-mix(in oklab, var(--accent) 16%, transparent);
		-webkit-backdrop-filter: blur(16px) saturate(160%);
		backdrop-filter: blur(16px) saturate(160%);
		box-shadow:
			0 12px 30px -12px rgba(0, 0, 0, 0.35),
			inset 0 1px 0 rgba(255, 255, 255, 0.35);
	}

	.gnav-item {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 999px;
		color: var(--accent-ink);
		opacity: 0.8;
		transition:
			background-color 220ms ease,
			color 220ms ease,
			padding 240ms ease,
			opacity 200ms ease,
			transform 150ms ease;
	}

	.gnav-item:hover {
		opacity: 1;
	}

	.gnav-item:active {
		transform: scale(0.94);
	}

	/* the selected route becomes a solid pill with its label */
	.gnav-item[data-active='true'] {
		width: auto;
		padding: 0 1.05rem 0 0.9rem;
		background: var(--color-base-100, #ffffff);
		opacity: 1;
		box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.18);
	}

	.gnav-label {
		max-width: 0;
		margin-left: 0;
		overflow: hidden;
		white-space: nowrap;
		font-size: 15px;
		font-weight: 500;
		line-height: 1;
		opacity: 0;
		transition:
			max-width 260ms ease,
			margin-left 260ms ease,
			opacity 180ms ease;
	}

	.gnav-item[data-active='true'] .gnav-label {
		max-width: 7rem;
		margin-left: 0.5rem;
		opacity: 1;
	}

	.gnav-item:focus-visible {
		outline: 2px solid var(--accent-ink);
		outline-offset: 2px;
	}
</style>
