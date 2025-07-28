// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import path from 'path';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	extensions: ['.svelte', '.md'],
// 	preprocess: [
// 		vitePreprocess(),
// 		mdsvex({ extensions: ['.md'] })
// 	],
// 	kit: {
// 		adapter: adapter(),
// 		alias: {
// 		$lib: path.resolve('./src/lib'),
// 		$content: path.resolve('./src/content')
// 		}
// 	}
// };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({ extensions: ['.md'] })
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		alias: {
			$lib: path.resolve('./src/lib'),
			$content: path.resolve('./src/content')
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/svelte-blog' : ''
		}
	}
};

export default config;
