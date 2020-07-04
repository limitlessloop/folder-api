import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import processPostCSS from './preprocess.js';
import glob from 'glob';
import sveltePreprocess from 'svelte-preprocess';
import svg from 'rollup-plugin-svg';
const phtmlUtilityClass = require('phtml-utility-class');
const phtmlMarkdown = require('@phtml/markdown');
import pug from "pug";
import phtml from 'phtml';

const preprocess = sveltePreprocess({
	postcss: true,

	phtml({ content, filename }) {
		return phtmlUtilityClass.process(content, { from: filename }).then(result => ({ code: result.html, map: null }));
		// return phtmlMarkdown.process(content, { from: filename }).then(result => ({ code: result.html, map: null }));
	},
	pug({ content, filename }) {
		const code = pug.render(content)
		return { code, map: null }
	}
});

processPostCSS('src/styles/index.css', 'static/global.css');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			svg(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				preprocess
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			legacy &&
			babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					[
						'@babel/preset-env',
						{
							targets: '> 0.25%, not dead'
						}
					]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					[
						'@babel/plugin-transform-runtime',
						{
							useESModules: true
						}
					]
				]
			}),

			!dev &&
			terser({
				module: true
			})
		],

		preserveEntrySignatures: false,
		onwarn
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			{
				buildStart() {
					var self = this;
					var source = 'content/';
					glob(source + '**/*', null, function (er, files) {
						files.forEach((file) => {
							self.addWatchFile(file);
						});
					});
					glob('src/styles/**/*', null, function (er, files) {
						files.forEach((file) => {
							self.addWatchFile(file);
						});
					});
				}
			},
			svg(),
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev,
				preprocess
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		preserveEntrySignatures: 'strict',
		onwarn
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		preserveEntrySignatures: false,
		onwarn
	}
};
