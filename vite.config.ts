import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	server: {
		host: '0.0.0.0', // ⬅ 讓外部可訪問（例如你的主機 localhost）
		port: 4001 ,       // ⬅ 改這裡
  	},
});
