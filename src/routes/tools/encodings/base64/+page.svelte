<script lang="ts">
	import { t } from 'i18next';
	import ToolFrame from '../../../../components/ToolFrame/ToolFrame.svelte';
	import type { PageData } from './$types';
	import { Buffer } from 'buffer/';

	let reverse = false;
	let input = 'Hello World';
	let output = '';

	$: {
		if (!reverse) {
			const buf = Buffer.from(input, 'utf-8');
			output = buf.toString('base64');
		}
		if (reverse) {
			const buf = Buffer.from(output, 'base64');
			input = buf.toString('utf-8');
		}
	}

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('tools.encodings.base64.name')} | werkkasten_</title>
</svelte:head>

<ToolFrame tool="base64" category="encodings">
	<label for="input">{t('tools.common.utf-8')}</label>
	<textarea
		id="input"
		bind:value={input}
		on:keydown={() => {
			reverse = false;
		}}
	/><br />
	<label for="output">{t('tools.encodings.base64.base64')}</label>
	<textarea
		id="output"
		bind:value={output}
		on:keydown={() => {
			reverse = true;
		}}
	/>
</ToolFrame>

<style lang="scss">
</style>
