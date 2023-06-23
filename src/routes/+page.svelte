<script>
	import { t } from 'i18next';
</script>

<svelte:head>
	<title>{t('home.title')}</title>
</svelte:head>

<div class="box">
	<h1>{t('home.title')}</h1>
	<p>{t('home.introduction')}</p>
</div>

<style lang="scss">
	.box {
		@include box;
	}
</style>
