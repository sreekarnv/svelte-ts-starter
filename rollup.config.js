import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import scss from 'rollup-plugin-scss';
import routerServe from 'rollup-plugin-serve';
import del from 'rollup-plugin-delete';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn(
				'npm',
				['run', 'start', '--', '--dev'],
				{
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				}
			);

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		},
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: !production,
		format: 'es',
		name: 'app',
		dir: 'public/build/',
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				sourcemap: !production,
				dev: !production,
			},
		}),
		scss({
			sourceMap: !production,
			output: 'public/build/bundle.css',
			outputStyle: production ? 'compressed' : undefined,
		}),
		css({
			output: 'public/build/bundle.css',
			sourceMap: !production,
			outputStyle: production ? 'compressed' : undefined,
		}),
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
		}),
		!production && serve(),
		!production && livereload('public'),
		production && terser(),
		!production &&
			routerServe({
				contentBase: 'dist',
				port: 5000,
				historyApiFallback: true,
				historyApiFallback: 'index.html',
			}),
		del({
			targets: 'public/build/*',
			runOnce: !production,
		}),
	],
	watch: {
		clearScreen: false,
	},
};
