<script lang="ts">
	import type { PageData } from './$types';
	import index from '../index.json';
	import { t } from 'i18next';
	import { Filter, X } from 'lucide-svelte';

	const toolsBase = index.tools;
	$: tools = toolsBase;

	export let data: PageData;

	$: if (data.params.category) {
		tools = tools.filter((tool) => {
			return tool.category == data.params.category;
		});
	}
	$: if (!data.params.category) {
		tools = toolsBase;
	}
</script>

<svelte:head>
	<title>{t('navigation.tools')} | werkkasten_</title>
</svelte:head>

<div class="tools">
	<h1>{t('navigation.tools')}</h1>

	<div class="filters">
		{#if data.params.category}
			<span class="filter">
				<Filter />
				<span
					>{t('filter.category', {
						category: t(`categories.${data.params.category}.name`, {
							defaultValue: data.params.category
						})
					})}</span
				>
				<a href="/tools"><X /></a>
			</span>
		{/if}
	</div>
</div>

<div class="toolList">
	{#each tools as tool}
		<div class="tool">
			<a class="name" href={`/tools/${tool.category}/${tool.tool}`}
				>{t(`tools.${tool.category}.${tool.tool}.name`)}</a
			>
			<a class="category" href={`/tools/${tool.category}`}
				>{t(`categories.${tool.category}.name`)}</a
			>
			<span class="description">{t(`tools.${tool.category}.${tool.tool}.description`)}</span>

			<a href={`/tools/${tool.category}/${tool.tool}`} class="cta-btn"
				>{t('tools.common.use', { tool: t(`tools.${tool.category}.${tool.tool}.name`) })}</a
			>
		</div>
	{/each}
</div>

<style lang="scss">
	.tools {
		@include box;
	}

	.toolList {
		display: grid;
		grid-template-columns: repeat(3, calc((100% - (2 * var(--gap))) / 3));
		gap: var(--gap);

		@media(max-width: 1000px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media(max-width: 700px) {
			grid-template-columns: 1fr;
		}

		> .tool {
			@include boxNoPad;
			display: flex;
			flex-direction: column;
			gap: var(--gap);
			overflow: hidden;

			.name {
				font-weight: 700;
				font-size: 2em;
				overflow-wrap: break-word;
				padding: var(--padding) var(--padding) 0 var(--padding);
			}

			.category {
				padding: 0 var(--padding) 0 var(--padding);
				opacity: 0.75;
				font-weight: 300;
				margin-top: -15px;
			}

			.description {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				flex-grow: 1;
				padding: 0 var(--padding) 0 var(--padding);
				line-clamp: 4;
				-webkit-line-clamp: 4;
				overflow: hidden;
			}

			.cta-btn {
				background-color: var(--color-accent);
				padding: var(--padding);
				text-align: center;
				color: white;
				text-decoration: none;
				font-weight: 600;
			}
		}
	}

	.filters {
		display: flex;
		.filter {
			display: flex;
			align-items: center;
			gap: 5px;
			border-radius: 100px;
			border: thin solid var(--color-accent);

			> :global(svg) {
				opacity: 0.5;
				margin-left: 10px;
			}

			a {
				display: flex;
				align-items: center;
				color: var(--color-accent);
				padding: 5px 10px;
			}
		}
	}
</style>
