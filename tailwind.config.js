import { fontFamily } from "tailwindcss/defaultTheme";
import typography from '@tailwindcss/typography';
const defaultTheme = require('tailwindcss/defaultTheme')
import forms from '@tailwindcss/forms';
const plugin = require('tailwindcss/plugin')

const fluidTypeConfig = {
	fontSizeMin: 1.3,    // 18px at minimum screen size. PREV; 1.2
	fontSizeMax: 1.4,     // Slightly reduced from 1.3 to account for preferred zoom
	ratioMin: 1.1,         // Keeping this the same
	ratioMax: 1.25,        // Keeping this the same
	screenMin: 20,         // 320px minimum
	screenMax: 96,         // Adjusted to ~1536px (2560px/1.1 to account for preferred 110% zoom)
	unit: 'rem',
	prefix: '',
	extendValues: true,
}

const proseFontSetting = `clamp(${fluidTypeConfig.fontSizeMin}${fluidTypeConfig.unit}, calc(${fluidTypeConfig.fontSizeMin}${fluidTypeConfig.unit} + ((${fluidTypeConfig.fontSizeMax} - ${fluidTypeConfig.fontSizeMin}) * ((100vw - ${fluidTypeConfig.screenMin}${fluidTypeConfig.unit}) / (${fluidTypeConfig.screenMax} - ${fluidTypeConfig.screenMin})))), ${fluidTypeConfig.fontSizeMax}${fluidTypeConfig.unit})`

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}", 
		'./src/callouts.css',
	],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		screens: {
			'xs': '475px',
			...defaultTheme.screens,
			},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
            // Use slight rounding site‑wide to fit the flat document aesthetic
            borderRadius: {
                DEFAULT: "2px",
                lg: "3px",
                md: "2px",
                sm: "1px",
            },
            // Remove drop‑shadows across the design; prefer borders instead
            boxShadow: {
                none: "none",
                DEFAULT: "none",
                sm: "none",
                md: "none",
                lg: "none",
                xl: "none",
                "2xl": "none",
                inner: "none",
            },
            // Ensure a consistent 1px border by default
            borderWidth: {
                DEFAULT: "1px",
            },
            fontFamily: {
                // Use Times New Roman site‑wide as the primary sans family
                // (Tailwind preflight applies the 'sans' family to html/body by default)
                sans: ['"Times New Roman"', 'Times', 'serif'],
                serif: ['"Times New Roman"', 'Times', 'serif'],
                emphasis: ['"Times New Roman"', 'Times', 'serif'],
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
					'xxs': [-2.5, 1.8],
					'xs': [-2, 1.8],
					'sm': [-1, 1.8],
					'base': [0.3, 1.8],
					'lg': [1, 1.8],
					'xl': [1.5, 1.2],
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

	],
};

export default config;
