<script lang="ts">
	import { t } from 'i18next';
	import ToolFrame from '../../../../components/ToolFrame/ToolFrame.svelte';
	import type { PageData } from './$types';
	import { Buffer } from 'buffer/';
	import { AlertCircle } from 'lucide-svelte';

	let reverse = false;
	let component = false;
	let input = 'Hello, World 👋';
	let output = '';
	let malformed = false;

	$: {
		if (!reverse) {
			output = component ? encodeURIComponent(input) : encodeURI(input);
			malformed = false;
		}
		if (reverse) {
			try {
				input = component ? decodeURIComponent(output) : decodeURI(output);
				malformed = false;
			} catch (e) {
				malformed = true;
			}
		}
	}

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('tools.encodings.urlencode.name')} | werkkasten_</title>
</svelte:head>

<ToolFrame tool="urlencode" category="encodings">
	<div class="warning" class:show={malformed}>
		<AlertCircle />
		<span>{t('tools.encodings.urlencode.malformed')}</span>
	</div>

	<label for="input">{t('tools.common.utf-8')}</label>
	<textarea
		id="input"
		bind:value={input}
		on:keydown={() => {
			reverse = false;
		}}
	/><br />
	<label for="component"
		>{t('tools.encodings.urlencode.isComponent')}
		<input
			type="checkbox"
			id="component"
			checked={component}
			on:change={() => {
				component = !component;
			}}
		/></label
	>
	<label for="output">{t('tools.encodings.urlencode.encoded')}</label>
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
