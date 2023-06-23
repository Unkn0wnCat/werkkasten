<script lang="ts">
	import i18n from '$lib/i18n';
	import type { PageData } from './$types';

	const { t, changeLanguage, language } = $i18n;

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('settings.title')} | werkkasten_</title>
</svelte:head>

<div class="box">
	<h1>{t('settings.title')}</h1>

	<label for="language">{t('settings.language')}</label>
	<select
		id="language"
		on:input={(e) => {
			changeLanguage(e.currentTarget.value);
		}}
	>
		<option value={'en'} selected={language == 'en'}>English</option>
		<option value={'de'} selected={language == 'de'}>Deutsch</option>
	</select>
</div>

<style lang="scss">
	.box {
		@include box;
		@include formStyles;
	}
</style>
