<script lang="ts">
	import { t } from 'i18next';
	import ToolFrame from '../../../../components/ToolFrame/ToolFrame.svelte';
	import type { PageData } from './$types';
	import { Buffer } from 'buffer/';

	import rot from '$lib/tools/crypto/rot';
	import { AlertCircle } from 'lucide-svelte';

	let reverse = false;
	let octal = 0o766;

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('tools.encodings.linuxpermissions.name')} | werkkasten_</title>
</svelte:head>

<ToolFrame tool="linuxpermissions" category="encodings">
	<label for="octal-input">{t('tools.encodings.linuxpermissions.octal')}</label>
	<input
		id="octal-input"
		type="text"
		placeholder={t('tools.encodings.linuxpermissions.octal')}
		value={`${octal.toString(8).padStart(4, '0')}`}
		on:keyup={(e) => {
			octal = Number.parseInt(e.currentTarget.value, 8);
		}}
	/>

	<label for="table-input">{t('tools.encodings.linuxpermissions.bits')}</label>
	<table class={'input-table'} id="table-input">
		<colgroup>
			<col span={3} />
			<col span={1} class={'gap'} />
			<col span={3} />
			<col span={1} class={'gap'} />
			<col span={3} />
			<col span={1} class={'gap'} />
			<col span={3} />
		</colgroup>
		<thead>
			<tr>
				<th colspan={3}>Flags</th>
				<th />
				<th colspan={3}>User</th>
				<th />
				<th colspan={3}>Group</th>
				<th />
				<th colspan={3}>Other</th>
			</tr>
			<tr>
				<th title="Set UID">U</th>
				<th title="Set GID">G</th>
				<th title="Sticky">S</th>
				<th />
				<th title="Read">R</th>
				<th title="Write">W</th>
				<th title="Execute">X</th>
				<th />
				<th title="Read">R</th>
				<th title="Write">W</th>
				<th title="Execute">X</th>
				<th />
				<th title="Read">R</th>
				<th title="Write">W</th>
				<th title="Execute">X</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td
					><input
						type="checkbox"
						checked={((octal >> 11) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 11;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 10) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 10;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 9) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 9;
						}}
					/></td
				>
				<td />
				<td
					><input
						type="checkbox"
						checked={((octal >> 8) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 8;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 7) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 7;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 6) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 6;
						}}
					/></td
				>
				<td />
				<td
					><input
						type="checkbox"
						checked={((octal >> 5) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 5;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 4) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 4;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 3) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 3;
						}}
					/></td
				>
				<td />
				<td
					><input
						type="checkbox"
						checked={((octal >> 2) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 2;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 1) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 1;
						}}
					/></td
				>
				<td
					><input
						type="checkbox"
						checked={((octal >> 0) & 0b1) == 1}
						on:change={() => {
							octal ^= 0b1 << 0;
						}}
					/></td
				>
			</tr>
		</tbody>
	</table>

	<label for="umask-input">{t('tools.encodings.linuxpermissions.umask')}</label>
	<input
		id="umask-input"
		type="text"
		placeholder={t('tools.encodings.linuxpermissions.umask')}
		value={`0${((octal ^ 0b000111111111) & 0b000111111111).toString(8).padStart(3, '0')}`}
		on:keyup={(e) => {
			octal = (Number.parseInt(e.currentTarget.value, 8) ^ 0b000111111111) & 0b000111111111;
		}}
	/>
</ToolFrame>

<style lang="scss">
</style>
