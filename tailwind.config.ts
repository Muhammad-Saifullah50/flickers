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
			animation: {
				'scroll-up': 'scrollUp 0.5s ease-in-out',
				'scroll-down': 'scrollDown 0.5s ease-in-out',
			},
			keyframes: {
				scrollUp: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0%)' }
				},
				scrollDown: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0%)' }
				}
			},
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
					'1': '#000000',
					'2': '#09090A',
					'3': '#101012',
					'4': '#1F1F22'
				},
				light: {
					'1': '#FFFFFF',
					'2': '#EFEFEF'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
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
