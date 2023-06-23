import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: 'src',
			filename: 'service-worker.ts',
			strategies: 'injectManifest',
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				type: 'module',
				enabled: true
			},
			manifest: {
				name: 'werkkasten_',
				short_name: 'werkkasten_',
				theme_color: '#e52b3e',
				background_color: '#e4e4e4',
				handle_links: 'preferred',
				display: 'standalone',
				icons: [
					{
						src: '/icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icon-310.png',
						sizes: '310x310',
						type: 'image/png'
					},
					{
						src: '/icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icon-150.png',
						sizes: '150x150',
						type: 'image/png'
					},
					{
						src: '/icon-70.png',
						sizes: '70x70',
						type: 'image/png'
					}
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
});
