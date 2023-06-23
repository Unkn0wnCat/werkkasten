<script lang="ts">
	import { t } from 'i18next';
	import ToolFrame from '../../../../components/ToolFrame/ToolFrame.svelte';
	import type { PageData } from './$types';
	import { X } from 'lucide-svelte';

	let octet1 = 192;
	let octet2 = 168;
	let octet3 = 1;
	let octet4 = 1;
	let subnet = 24;
	let error = false;

	let address = 0;
	let peerNet = false;
	let subnetBinary = NaN;
	let firstAddr = NaN;
	let lastAddr = NaN;

	const intToIPv4String = (ip: number): string => {
		let out = '';

		for (let group = 0; group < 4; group++) {
			let groupBin = ip & 0xff;

			out = groupBin.toString() + '.' + out;

			ip >>= 8;
		}

		return out.substring(0, out.length - 1);
	};

	$: {
		(() => {
			error = false;
			if (
				octet1 > 255 ||
				octet1 < 0 ||
				octet2 > 255 ||
				octet2 < 0 ||
				octet3 > 255 ||
				octet3 < 0 ||
				octet4 > 255 ||
				octet4 < 0 ||
				subnet > 32 ||
				subnet < 0
			) {
				error = true;
			}

			if (error) {
				return;
			}

			if (isNaN(octet1) || isNaN(octet2) || isNaN(octet3) || isNaN(octet4)) {
				return;
			}

			address =
				octet1 * Math.pow(2, 24) + octet2 * Math.pow(2, 16) + octet3 * Math.pow(2, 8) + octet4;

			subnetBinary = NaN;
			firstAddr = NaN;
			lastAddr = NaN;

			if (!isNaN(subnet)) {
				peerNet = subnet > 30;

				let subnetBinaryTemp = new Uint32Array(1);
				for (let index = 0; index < 32 - subnet; index++) {
					subnetBinaryTemp[0] = (subnetBinaryTemp[0] << 1) | 0b1;
				}
				subnetBinaryTemp[0] ^= 0xffffffff;

				subnetBinary = subnetBinaryTemp[0];

				if (!peerNet) {
					firstAddr = (address & subnetBinary) + 1;
					lastAddr = (address | (subnetBinary ^ 0xffffffff)) - 1;
				}

				if (peerNet) {
					firstAddr = address & subnetBinary;
					lastAddr = address | (subnetBinary ^ 0xffffffff);
				}
			}
		})();
	}

	let inputs: HTMLInputElement[] = [];
	let justAutoJumped = false;

	const handleInput = (i: number) => {
		return (e: KeyboardEvent) => {
			if (i < 4 && e.key == '.' && !justAutoJumped) {
				inputs[i + 1].focus();
				inputs[i + 1]?.setSelectionRange(0, -1);
				e.preventDefault();
			}

			if (i > 0 && e.key == ',') {
				inputs[i - 1].focus();
				inputs[i - 1]?.setSelectionRange(0, -1);
				e.preventDefault();
			}

			if (i == 3 && e.key == '/') {
				inputs[i + 1].focus();
				inputs[i + 1]?.setSelectionRange(0, -1);
				e.preventDefault();
			}

			if (e.key == ',' || e.key == '.') {
				e.preventDefault();
			}

			if (e.key == 'Backspace' && inputs[i].value.length == 0) {
				inputs[i - 1]?.focus();
				inputs[i + 1]?.setSelectionRange(-1, -1);
				e.preventDefault();
			}

			justAutoJumped = false;
		};
	};

	const handlePostInput = (i: number) => {
		return () => {
			const value = inputs[i].value;

			if (value.length == 3) {
				inputs[i + 1]?.focus();
				inputs[i + 1]?.setSelectionRange(0, -1);
				justAutoJumped = true;
			}

			let newVal = value;
			const slashSplit = value.split('/');
			const dotSplit = slashSplit[0].split('.');

			if (slashSplit.length > 1) {
				inputs[4].value = slashSplit[1];
				subnet = Number.parseInt(slashSplit[1], 10);
			}

			if (dotSplit.length > 1) {
				dotSplit.forEach((split, offset) => {
					if (i + offset > 3) return;

					inputs[i + offset].value = split;

					switch (i + offset) {
						case 0:
							octet1 = Number.parseInt(split, 10);
							break;
						case 1:
							octet2 = Number.parseInt(split, 10);
							break;
						case 2:
							octet3 = Number.parseInt(split, 10);
							break;
						case 3:
							octet4 = Number.parseInt(split, 10);
							break;
					}
				});
			}
		};
	};

	export let data: PageData;
</script>

<svelte:head>
	<title>{t('tools.networking.ipv4subnetting.name')} | werkkasten_</title>
</svelte:head>

<ToolFrame tool="ipv4subnetting" category="networking">
	<div>
		<label for="ipv4-input">{t('tools.networking.common.ipv4addr')}</label>
		<div class={'combi-input'}>
			<input
				id="ipv4-input"
				placeholder={'192'}
				inputMode={'numeric'}
				type="text"
				value={octet1 || ''}
				on:input={(e) => {
					octet1 = Number.parseInt(e.currentTarget.value, 10);
					handlePostInput(0)();
				}}
				bind:this={inputs[0]}
				on:keydown={handleInput(0)}
			/>
			<span>.</span>
			<input
				id="ipv4-input2"
				placeholder={'168'}
				inputMode={'numeric'}
				type="text"
				value={octet2 || ''}
				on:input={(e) => {
					octet2 = Number.parseInt(e.currentTarget.value, 10);
					handlePostInput(1)();
				}}
				bind:this={inputs[1]}
				on:keydown={handleInput(1)}
			/>
			<span>.</span>
			<input
				id="ipv4-input3"
				placeholder={'178'}
				inputMode={'numeric'}
				type="text"
				value={octet3 || ''}
				on:input={(e) => {
					octet3 = Number.parseInt(e.currentTarget.value, 10);
					handlePostInput(2)();
				}}
				bind:this={inputs[2]}
				on:keydown={handleInput(2)}
			/>
			<span>.</span>
			<input
				id="ipv4-input4"
				placeholder={'1'}
				inputMode={'numeric'}
				type="text"
				value={octet4 || ''}
				on:input={(e) => {
					octet4 = Number.parseInt(e.currentTarget.value, 10);
					handlePostInput(3)();
				}}
				bind:this={inputs[3]}
				on:keydown={handleInput(3)}
			/>
			<span>/</span>
			<input
				id="subnet-input"
				placeholder={'24'}
				inputMode={'numeric'}
				type="text"
				value={subnet || ''}
				on:input={(e) => {
					subnet = Number.parseInt(e.currentTarget.value, 10);
					handlePostInput(4)();
				}}
				bind:this={inputs[4]}
				on:keydown={handleInput(4)}
			/>
			<button
				title="Clear Field"
				on:click={() => {
					octet1 = NaN;
					octet2 = NaN;
					octet3 = NaN;
					octet4 = NaN;
					subnet = NaN;
					inputs[0].focus();
				}}
			>
				<X />
			</button>
		</div>
	</div>

	<div>
		<span class={'fake-label'}>{t('tools.networking.common.subnetMask')}</span>
		<span class={'fake-field'}
			>{subnetBinary || subnetBinary === 0 ? intToIPv4String(subnetBinary) : 'n/a'}</span
		>
	</div>
	<div>
		<span class={'fake-label'}>{t('tools.networking.common.firstAddr')}</span>
		<span class={'fake-field'}
			>{firstAddr || firstAddr === 0 ? intToIPv4String(firstAddr) : 'n/a'}</span
		>
	</div>
	<div>
		<span class={'fake-label'}>{t('tools.networking.common.lastAddr')}</span>
		<span class={'fake-field'}
			>{lastAddr || lastAddr === 0 ? intToIPv4String(lastAddr) : 'n/a'}</span
		>
	</div>
	<div>
		<span class={'fake-label'}>{t('tools.networking.common.netAddr')}</span>
		<span class={'fake-field'}
			>{peerNet || !firstAddr ? 'n/a' : intToIPv4String(firstAddr - 1)}</span
		>
	</div>
	<div>
		<span class={'fake-label'}>{t('tools.networking.common.broadcastAddr')}</span>
		<span class={'fake-field'}>{peerNet || !lastAddr ? 'n/a' : intToIPv4String(lastAddr + 1)}</span>
	</div>
	<div>
		<span class={'fake-label'}
			>{t('tools.networking.common.ipv4addr')} ({t('tools.networking.common.binary')})</span
		>
		<span class={'fake-field monospace'}>
			{#if address || address === 0}
				{#each address.toString(2).padStart(32, '0').split('') as bit, index}
					<span style:color={index >= (subnet || 32) ? 'red' : undefined}>{bit}</span>
				{/each}
			{/if}
			{#if !(address || address === 0)}
				n/a
			{/if}
		</span>
	</div>
	<div>
		<span class={'fake-label'}
			>{t('tools.networking.common.subnetMask')} ({t('tools.networking.common.binary')})</span
		>
		<span class={'fake-field monospace'}>
			{#if subnetBinary || subnetBinary === 0}
				{#each subnetBinary.toString(2).padStart(32, '0').split('') as bit, index}
					<span style:color={index >= (subnet || 32) ? 'red' : undefined}>{bit}</span>
				{/each}
			{/if}
			{#if !(subnetBinary || subnetBinary === 0)}
				n/a
			{/if}
		</span>
	</div>
</ToolFrame>

<style lang="scss">
	.monospace {
		font-family: monospace !important;
		font-size: 1.2em !important;

		span {
			display: inline-block;
			width: 12px;
		}
	}

	.combi-input {
		@include boxNoPad;
		display: flex;
		align-items: baseline;
		width: 100%;
		overflow-x: auto;
		max-width: fit-content;

		&::-webkit-scrollbar {
			height: 5px;
		}
		
		&::-webkit-scrollbar-track {
			background-color: rgba(150, 150, 150, .5);
			border-radius: 20px;
		}
		
		&::-webkit-scrollbar-thumb {
			border-radius: 20px;
			background-color: darkgrey;
		}

		input[type='text'],
		button {
			background-color: transparent !important;
			border: none !important;
			box-shadow: none !important;
			min-width: 65px !important;
			width: 65px !important;
			text-align: center !important;
			padding-left: 0 !important;
			padding-right: 0 !important;
		}

		button {
			cursor: pointer;
			display: flex;
			align-items: center;
			align-self: stretch;
			justify-content: center;
			color: var(--color-accent);
		}
	}

	.fake-label {
		display: block;

		margin-top: var(--padding);
		margin-bottom: calc(0.5 * var(--padding));
	}

	.fake-field {
		@include box;

		display: block;
		border: none;
		font: inherit;
		background-color: var(--color-disabled);
	}
</style>
