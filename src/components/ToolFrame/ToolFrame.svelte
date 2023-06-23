<script lang="ts">
	import i18n from '$lib/i18n';
	import { AlertOctagon } from 'lucide-svelte';
	import index from '../../routes/tools/index.json';

	const { t, language } = $i18n;

	export let tool: string;
	export let category: string;

	const additionalLinks = index.tools
		.find((el) => {
			return el.tool == tool && el.category == el.category;
		})
		?.additionalLinks.filter((link) => {
			return link.lang == language;
		});
</script>

<div class="frame">
	<div class="meta">
		<div class="text">
			<span class="name">{t(`tools.${category}.${tool}.name`)}</span>
			<span class="category">
				{t('tools.common.categorizedUnder', {
					category: t(`categories.${category}.name`)
				})}
			</span>
		</div>
		<div class="actions">
			<a
				href={`https://github.com/Unkn0wnCat/werkkasten/issues/new?title=Issue+in+${encodeURIComponent(
					category
				)}%2F${encodeURIComponent(tool)}%3A+%5BReport%20Title%20Here%5D`}
				title={t(`tools.common.reportIssue`) + ''}
				target="_blank"
				rel="noreferrer"><AlertOctagon /></a
			>
		</div>
	</div>
	<div class="description">
		<slot name="description">
			<h1>{t(`tools.${category}.${tool}.name`)}</h1>

			<p>{t(`tools.${category}.${tool}.description`)}</p>

			{#if additionalLinks && additionalLinks.length > 0}
				<p><b>{t('tools.common.additionalLinks')}</b></p>
				<ul>
					{#each additionalLinks || [] as additionalLink}
						<li>
							<a href={additionalLink.href} title={additionalLink.title} target="_blank"
								>{additionalLink.title} on {new URL(additionalLink.href).host}</a
							><br />
						</li>
					{/each}
				</ul>
			{/if}
		</slot>
	</div>
	<div class="tool">
		<slot />
	</div>
</div>

<style lang="scss">
	.frame {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: auto auto;
		gap: var(--gap);

		grid-template-areas:
			'meta meta'
			'desc tool';

		@media (width < 900px) {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto;
			grid-template-areas: 'meta' 'desc' 'tool';
		}

		.description {
			@include box;
		}

		.tool {
			@include box;

			:global {
				@include formStyles;
			}
		}

		.meta {
			grid-area: meta;
			@include box;
			display: flex;

			.text {
				display: flex;
				flex-direction: column;
				flex-grow: 1;

				.name {
					font-size: 1.2em;
					font-weight: 800;
				}

				.category {
					font-size: 0.9em;
					font-weight: 200;
				}
			}

			.actions {
				color: var(--color-accent);
				display: flex;
				transform: translateX(var(--padding));

				> a {
					display: flex;
					align-items: center;
					padding: 0 var(--padding);
				}
			}
		}
	}
</style>
