<script lang="ts">
	import { t } from 'i18next';
	import ToolFrame from '../../../../components/ToolFrame/ToolFrame.svelte';
	import type { PageData } from './$types';

	let number = 420;

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('tools.numbers.base.name')} | werkkasten_</title>
</svelte:head>

<ToolFrame tool="base" category="numbers">
	<label for="base10-input">{t('tools.numbers.base.10')}</label>
	<input
		id="base10-input"
		type={'number'}
		inputmode="numeric"
		placeholder={t('tools.numbers.base.10')}
		value={number.toString(10)}
		on:input={(e) => {
			const newNum = Number.parseInt(e.currentTarget.value || '0', 10);
			if (!isNaN(newNum) && (newNum === 0 || newNum)) number = newNum;
			e.currentTarget.value = number.toString(10);
		}}
	/>

	<label for="base16-input">{t('tools.numbers.base.16')}</label>
	<input
		id="base16-input"
		type={'text'}
		placeholder={t('tools.numbers.base.16')}
		value={number.toString(16)}
		on:input={(e) => {
			number = Number.parseInt(e.currentTarget.value || '0', 16);
			e.currentTarget.value = number.toString(16);
		}}
	/>

	<label for="base8-input">{t('tools.numbers.base.8')}</label>
	<input
		id="base8-input"
		type={'text'}
		inputmode="numeric"
		placeholder={t('tools.numbers.base.8')}
		value={number.toString(8)}
		on:input={(e) => {
			number = Number.parseInt(e.currentTarget.value || '0', 8);
			e.currentTarget.value = number.toString(8);
		}}
	/>

	<label for="base2-input">{t('tools.numbers.base.2')}</label>
	<input
		id="base2-input"
		type={'text'}
		inputmode="numeric"
		placeholder={t('tools.numbers.base.2')}
		value={number.toString(2)}
		on:input={(e) => {
			number = Number.parseInt(e.currentTarget.value || '0', 2);
			e.currentTarget.value = number.toString(2);
		}}
	/>
</ToolFrame>
