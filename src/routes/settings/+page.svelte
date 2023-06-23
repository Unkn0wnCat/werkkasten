<script lang="ts">
	import i18n from '$lib/i18n';
	import type { PageData } from './$types';
	import settings from '$lib/settings';

	const { t, changeLanguage, language } = $i18n;
	const { theme } = $settings;

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

	<label for="theme">{t('settings.theme')}</label>
	<select
		id="theme"
		on:input={(e) => {
			if (
				e.currentTarget.value !== 'auto' &&
				e.currentTarget.value !== 'light' &&
				e.currentTarget.value !== 'dark'
			)
				return;

			settings.patch({ theme: e.currentTarget.value });
		}}
	>
		<option value={'auto'} selected={theme == 'auto'}>{t('settings.theme_auto')}</option>
		<option value={'light'} selected={theme == 'light'}>{t('settings.theme_light')}</option>
		<option value={'dark'} selected={theme == 'dark'}>{t('settings.theme_dark')}</option>
	</select>
</div>

<style lang="scss">
	.box {
		@include box;
		@include formStyles;
	}
</style>
