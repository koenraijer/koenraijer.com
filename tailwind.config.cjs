/** @type {import('tailwindcss').Config}*/
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

const fluidTypeConfig = {
	fontSizeMin: 1.0375, // 1.125rem === 18px
	fontSizeMax: 1.25, // 1.25rem === 20px
	ratioMin: 1.20, // Multiplicator Min
	ratioMax: 1.25, // Multiplicator Max
	screenMin: 20, // 20rem === 320px
	screenMax: 159, // 159 rem === 2545 px (my large monitor)
	unit: 'rem', // default is rem but it's also possible to use 'px'
	prefix: '', // set a prefix to use it alongside the default font sizes
	extendValues: true, // When you set extendValues to true it will extend the default values. Set it to false to overwrite the values.
}

const proseFontSetting = `clamp(${fluidTypeConfig.fontSizeMin}${fluidTypeConfig.unit}, calc(${fluidTypeConfig.fontSizeMin}${fluidTypeConfig.unit} + ((${fluidTypeConfig.fontSizeMax} - ${fluidTypeConfig.fontSizeMin}) * ((100vw - ${fluidTypeConfig.screenMin}${fluidTypeConfig.unit}) / (${fluidTypeConfig.screenMax} - ${fluidTypeConfig.screenMin})))), ${fluidTypeConfig.fontSizeMax}${fluidTypeConfig.unit})`

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			fontFamily: {
				mona: ['"Mona Sans"', ...defaultTheme.fontFamily.sans],
			},
			borderRadius: {
				base: 'var(--theme-rounded-base)',
				container: 'var(--theme-rounded-container)',
			  },
			screens: {
				'screen-5xl': '1200px',
			  },
			typography: () => ({
				DEFAULT: {
					css: {
					'font-size': proseFontSetting,
					 maxWidth: '80ch',
					},
				},
				quoteless: {
					css: {
					'blockquote p:first-of-type::before': { content: 'none' },
					'blockquote p:first-of-type::after': { content: 'none' },
					},
				},
			}),
		}
	},
	plugins: [
		forms, 
		typography, 
		plugin(function ({addVariant}) {
			addVariant( 
			  'prose-inline-code',
			  '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))'
			);
		}),
		...skeleton(), 
		require('tailwindcss-fluid-type')(
			{
					// your fluid type settings
				// works only with unitless numbers
				// This numbers are the defaults settings
				settings: fluidTypeConfig,
				// Creates the text-xx classes
				// This are the default settings and analog to the tailwindcss defaults
				// Each `lineHeight` is set unitless and we think that's the way to go especially in context with fluid type.
				values: {
					'xs': [-2, 1.6],
					'sm': [-1, 1.6],
					'base': [0, 1.6],
					'lg': [1, 1.6],
					'xl': [2, 1.2],
					'2xl': [3, 1.2],
					'3xl': [4, 1.2],
					'4xl': [5, 1.1],
					'5xl': [6, 1.1],
					'6xl': [7, 1.1],
					'7xl': [8, 1],
					'8xl': [9, 1],
					'9xl': [10, 1],
				},
			}
		)

	]
};

