<script lang="ts">
	import { onDestroy, untrack } from 'svelte';
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicInOut, cubicOut } from 'svelte/easing';

	let {
		open = false,
		title = '',
		children,
		onClose,
		class: className = '',
		snapPoints = ['50%', '90%'],
		defaultSnap = 0,
		closeOnBackdrop = true,
		closeOnEscape = true,
		showDragHandle = true
	}: {
		open: boolean;
		title?: string;
		children: Snippet;
		onClose?: () => void;
		class?: string;
		snapPoints?: (string | number)[];
		defaultSnap?: number;
		closeOnBackdrop?: boolean;
		closeOnEscape?: boolean;
		showDragHandle?: boolean;
	} = $props();

	/* `defaultSnap` only seeds the initial position: the sheet then owns it */
	let currentSnap = $state(untrack(() => defaultSnap));
	let dragOffset = $state(0);
	let isDragging = $state(false);
	let startY = 0;
	/* height of the full-screen reference layer, i.e. what the
	   percentages in `snapPoints` are relative to */
	let sheetHeight = $state(0);

	const snapValues = $derived(
		snapPoints.map((point) => {
			if (typeof point === 'number') return point;
			if (point.endsWith('%')) {
				return (parseFloat(point) / 100) * sheetHeight;
			}
			return parseFloat(point);
		})
	);

	const maxSnapHeight = $derived(snapValues.length ? Math.max(...snapValues) : 0);
	const currentHeight = $derived((snapValues[currentSnap] ?? 0) + dragOffset);
	const sheetTransition = $derived(
		isDragging || sheetHeight === 0
			? 'none'
			: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
	);

	/* every time the sheet opens it takes the page from the start
	   (its configured default snap point, full page by default) */
	$effect(() => {
		if (open) {
			currentSnap = untrack(() =>
				Math.min(Math.max(defaultSnap, 0), Math.max(snapPoints.length - 1, 0))
			);
			dragOffset = 0;
		}
	});

	function handleBackdropClick() {
		if (closeOnBackdrop) {
			onClose?.();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!open) return;
		if (closeOnEscape && event.key === 'Escape') {
			onClose?.();
		}
	}

	function handleDragStart(event: PointerEvent) {
		isDragging = true;
		startY = event.clientY;
		window.addEventListener('pointermove', handleDragMove);
		window.addEventListener('pointerup', handleDragEnd);
		window.addEventListener('pointercancel', handleDragEnd);
	}

	function handleDragMove(event: PointerEvent) {
		if (!isDragging) return;
		event.preventDefault();

		const delta = startY - event.clientY;
		const base = snapValues[currentSnap] ?? 0;
		dragOffset = Math.max(-base, Math.min(sheetHeight - base, delta));
	}

	function handleDragEnd() {
		if (!isDragging) return;
		isDragging = false;
		window.removeEventListener('pointermove', handleDragMove);
		window.removeEventListener('pointerup', handleDragEnd);
		window.removeEventListener('pointercancel', handleDragEnd);

		/* dragged down from the lowest snap point → close */
		if (currentSnap === 0 && dragOffset < -50) {
			onClose?.();
			dragOffset = 0;
			return;
		}

		/* snap to the nearest reachable height */
		const target = (snapValues[currentSnap] ?? 0) + dragOffset;
		let nearest = currentSnap;
		let best = Infinity;
		snapValues.forEach((height, index) => {
			const distance = Math.abs(height - target);
			if (distance < best) {
				best = distance;
				nearest = index;
			}
		});

		currentSnap = nearest;
		dragOffset = 0;
	}

	function handleHandleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			snapTo(Math.min(currentSnap + 1, snapValues.length - 1));
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			snapTo(Math.max(currentSnap - 1, 0));
		}
	}

	function snapTo(index: number) {
		if (index >= 0 && index < snapValues.length) {
			currentSnap = index;
			dragOffset = 0;
		}
	}

	onDestroy(() => {
		window.removeEventListener('pointermove', handleDragMove);
		window.removeEventListener('pointerup', handleDragEnd);
		window.removeEventListener('pointercancel', handleDragEnd);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- the overlay stops right below the app header, which stays visible -->
	<div
		class="fixed inset-x-0 bottom-0 z-50 overflow-hidden"
		style="top: var(--app-header, 0px)"
		role="dialog"
		tabindex="-1"
		aria-labelledby={title ? 'bottomsheet-title' : undefined}
	>
		<!-- Backdrop (a button so it is keyboard reachable) -->
		<button
			type="button"
			tabindex="-1"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 200 }}
			class="absolute inset-0 h-full w-full cursor-default bg-black/25 backdrop-blur-sm"
			aria-label="Fermer le panneau"
			onclick={handleBackdropClick}
		></button>

		<!-- full-height reference layer: the snap percentages are relative to it -->
		<div
			class="pointer-events-none absolute inset-0"
			bind:clientHeight={sheetHeight}
			in:fly={{ y: '100%', duration: 320, easing: cubicOut }}
			out:fly={{ y: '100%', duration: 220, easing: cubicInOut }}
		>
			<div
				class="pointer-events-auto absolute inset-x-0 bottom-0"
				style="height: {maxSnapHeight}px; transform: translateY(calc(100% - {currentHeight}px)); transition: {sheetTransition}"
			>
				<Container
					class="glass flex h-full flex-col overflow-hidden rounded-t-2xl shadow-2xl {className}"
					reveal
				>
					<!-- Drag Handle -->
					{#if showDragHandle}
						<div
							class="flex cursor-grab justify-center pb-2 pt-3 touch-none active:cursor-grabbing"
							onpointerdown={handleDragStart}
							onkeydown={handleHandleKeydown}
							role="button"
							tabindex="0"
							aria-label="Déplacer le panneau"
						>
							<div class="h-1 w-10 rounded-full bg-base-content/20"></div>
						</div>
					{/if}

					{#if title}
						<header class="border-b border-base-200 px-6 pb-4">
							<h2 id="bottomsheet-title" class="text-lg font-semibold text-base-content">
								{title}
							</h2>
						</header>
					{/if}

					<div class="min-h-0 flex-1 overflow-y-auto px-6 py-4">
						{@render children()}
					</div>
				</Container>
			</div>
		</div>
	</div>
{/if}
