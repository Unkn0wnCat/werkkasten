<script lang="ts">
	import i18n from '$lib/i18n';
	import { Voicemail, Info, Settings } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import '../global.scss';

	let ReloadPrompt;
	onMount(async () => {
		ReloadPrompt = (await import('../components/ReloadPrompt/ReloadPrompt.svelte')).default;
		/*if (pwaInfo) {
		const { registerSW } = await import('virtual:pwa-register')
		registerSW({
		  immediate: true,
		  onRegistered(r) {
			r && setInterval(() => {
			    console.log('Checking for sw update')
			    r.update()
			}, 60*1000)
			console.log(`SW Registered: ${r}`)
		  },
		  onRegisterError(error) {
			console.log('SW registration error', error)
		  }
		})
	  }*/
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<div class="werkkasten">
	<nav class="navigation">
		<a href="/" class="logo">werkkasten_</a>
		<a href="/tools">{$i18n.t('navigation.tools')}</a>
		<!--<a href="/datasette" title={$i18n.t('navigation.datasette')}><Voicemail /></a>-->
		<a href="/settings" title={$i18n.t('navigation.settings')}><Settings /></a>
		<a href="/about" title={$i18n.t('navigation.about')}><Info /></a>
	</nav>
	{#if ReloadPrompt}
		<svelte:component this={ReloadPrompt} />
	{/if}
	<slot />
	<footer>
		CC-BY-4.0 Kevin Kandlbinder / werkkasten | <a href="https://kevink.dev/legal/about">Imprint</a>
	</footer>
</div>

<style lang="scss">
	.werkkasten {
		footer {
			@include box;
			text-align: center;
			color: rgba(0, 0, 0, 0.75);
		}

		.navigation {
			@include boxNoPad;
			display: flex;

			> a {
				text-decoration: none;
				color: inherit;

				display: flex;
				align-items: center;
				padding: var(--padding);
				color: var(--color-accent);

				&.logo {
					font-weight: 600;
					margin-right: auto;
				}

				:global(svg) {
					color: var(--color-accent);
				}
			}
		}

		@include contentGrid;
		//gap: var(--gap);
		grid-row-gap: var(--gap);
		padding: var(--gap) 0;
	}
</style>
