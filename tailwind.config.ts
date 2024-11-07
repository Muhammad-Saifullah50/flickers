import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				purple: {
					primary: '#877EFF',
					secondary: '#7878A3',
					tertiary: '#5C5C7B'
				},
				yellow: {
					primary: '#FFB620'
				},
				dark: {
					1: '#000000',
					2: '#09090A',
					3: '#101012',
					4: '#1F1F22',
				},
				light: {
					1: '#FFFFFF',
					2: '#EFEFEF',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			gradient: {
				purpleblue: 'linear-gradient(180deg, #877EFF 0%, #685DFF 46.15%, #3121FF 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
