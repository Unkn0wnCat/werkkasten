<script lang="ts">
	import { t } from 'i18next';
	import ToolFrame from '../../../../components/ToolFrame/ToolFrame.svelte';
	import type { PageData } from './$types';

	import rot from '$lib/tools/crypto/rot';
	import { AlertCircle } from 'lucide-svelte';
	import { scale } from 'svelte/transition';

	let reverse = false;
	let input = 'CAESAR';
	let output = '';
	let offset = 13;
	let hasOutOfRange = false;

	$: {
		if (!reverse) {
			input = input.toUpperCase();
			const res = rot({ input, offset });
			output = res.output;
			hasOutOfRange = res.hasOutOfRange;
		}
		if (reverse) {
			output = output.toUpperCase();
			const res = rot({ input: output, offset, reverse: true });
			input = res.output;
			hasOutOfRange = res.hasOutOfRange;
		}
	}

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('tools.crypto.rot.name')} | werkkasten_</title>
</svelte:head>

<ToolFrame tool="rot" category="crypto">
	<div class="warning" class:show={hasOutOfRange}>
		<AlertCircle />
		<span>{t('tools.crypto.rot.outOfRange')}</span>
	</div>

	<label for="input">{t('tools.common.clearText')}</label>
	<textarea
		id="input"
		bind:value={input}
		on:keydown={() => {
			reverse = false;
		}}
	/><br />
	<label for="offset" class="center">{t('tools.crypto.rot.offset')}</label>
	<input id="offset" bind:value={offset} type="number" class="center" /><br />
	<label for="output">{t('tools.common.cypherText')}</label>
	<textarea
		id="output"
		bind:value={output}
		on:keydown={() => {
			reverse = true;
		}}
	/>
</ToolFrame>

<style lang="scss">
	.warning {
		@include box;
		background-color: var(--color-error);
		color: var(--color-error-text);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--gap);

		opacity: 0;
		pointer-events: none;
		height: 0;
		padding: 0 var(--padding);
		transition: opacity 0.25s, height 0.25s, padding 0.25s;

		&.show {
			opacity: 1;
			pointer-events: all;
			height: 80px;
			padding: var(--padding);
		}
	}
</style>
