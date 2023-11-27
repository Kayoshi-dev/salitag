import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			external: ['@resvg/resvg-js', 'sharp']
		}
	},
	optimizeDeps: {
		exclude: ['@resvg/resvg-js', 'sharp']
	}
});
