<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';
    import { blur, scale } from 'svelte/transition';
    import { cubicIn, cubicInOut } from 'svelte/easing';

	let {
		open = false,
		title = '',
		children,
		onClose,
		class: className = '',
		closeOnBackdrop = true,
		closeOnEscape = true
	}: {
		open: boolean;
		title?: string;
		children: Snippet;
		onClose?: () => void;
		class?: string;
		closeOnBackdrop?: boolean;
		closeOnEscape?: boolean;
	} = $props();

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
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center px-4"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		aria-labelledby={title ? 'modal-title' : undefined}
	>
		<!-- Blurred backdrop (a button so it is keyboard reachable) -->
		<button
			type="button"
			tabindex="-1"
			in:blur={{duration: 50, opacity: 50}}
			out:blur={{duration: 200, opacity: 50, delay: 50}}
			class="absolute inset-0 h-full w-full cursor-default bg-black/25 backdrop-blur-sm transition-opacity duration-200"
			aria-label="Fermer la fenêtre"
			onclick={handleBackdropClick}
		></button>

		<!-- Modal content using Container -->
		<div
		    class={``}
		    in:scale={{duration: 200, opacity: 50, delay:50, start: 0, easing: cubicIn}}
			out:scale={{duration: 50, opacity: 50, start: 0, easing: cubicInOut}}
		>
		<Container
			class="relative w-full max-w-lg max-h-[90vh] overflow-hidden glass rounded-2xl shadow-2xl {className}"
			reveal
		>
			{#if title}
				<header class="flex items-center justify-between px-6 py-4 border-b border-base-200">
					<h2 id="modal-title" class="text-lg font-semibold text-base-content">
						{title}
					</h2>
					<button
						type="button"
						class="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-base-content"
						onclick={onClose}
						aria-label="Fermer"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</header>
			{/if}

			<div
			    class="px-6 py-4 overflow-y-auto max-h-[calc(90vh-60px)]">
				{@render children()}
			</div>
		</Container>
		</div>
	</div>
{/if}
