<script lang="ts">
	import { t } from 'i18next';
	import type { PageData } from './$types';

	const paragraphs = t('about.paragraphs', { returnObjects: true, defaultValue: [] }) as string[];

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('about.title')}</title>
</svelte:head>

<div class="box">
	<h1>{t('about.title')}</h1>

	{#each paragraphs as paragraph}
		<p>{paragraph}</p>
	{/each}

	<h2>{t('about.more')}</h2>

	<p><a href="https://kevink.dev/projects">{t('about.websiteCta')}</a></p>
</div>

<style lang="scss">
	.box {
		@include box;
	}
</style>
