<script lang="ts">
	import { PartyPopper, RefreshCw, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import i18n from '$lib/i18n';

	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r) {
			r &&
				setInterval(() => {
					console.log('Checking for sw update');
					r.update();
				}, 60 * 1000);
			console.log(`SW Registered: ${r}`);
		},
		onRegisterError(error) {
			console.log('SW registration error', error);
		}
	});
	const close = () => {
		offlineReady.set(false);
		needRefresh.set(false);
	};
	$: toast = $offlineReady || $needRefresh;

	const { t } = $i18n;
</script>

{#if toast}
	<div class="pwa-notice" role="alert" in:fly={{ duration: 500, x: -300, opacity: 0 }}>
		<PartyPopper />
		<div class="message">
			{#if $offlineReady}
				<span>
					{t('pwa.offlineReady')}
				</span>
			{:else}
				<span>
					{t('pwa.newContent')}
				</span>
			{/if}
		</div>
		{#if $needRefresh}
			<button on:click={() => updateServiceWorker(true)}>
				<RefreshCw />
				{t('pwa.updateNow')}
			</button>
		{/if}
		<button on:click={close} title={t('generic.close')}>
			<X />
		</button>
	</div>
{/if}

<style lang="scss">
	.pwa-notice {
		@include box;

		display: flex;
		gap: var(--gap);
		align-items: center;

		.message {
			flex-grow: 1;
		}

		button {
			display: flex;
			align-items: center;
			align-self: stretch;
			gap: calc(0.5 * var(--gap));
			background-color: transparent;
			font: inherit;
			border: none;
			cursor: pointer;
			color: var(--color-accent);
		}
	}
</style>
