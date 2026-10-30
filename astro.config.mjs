// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { sidebar } from './sidebar.config.mjs';

export default defineConfig({
	site: 'https://academy.thelia.net',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: { fr: 'Académie Thelia', en: 'Thelia Academy' },
			description: 'Apprendre à gérer une boutique Thelia, pas à pas.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Français', lang: 'fr' },
				en: { label: 'English', lang: 'en' },
			},
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo-white.svg',
				replacesTitle: true,
			},
			favicon: '/favicon-32x32.png',
			head: [{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } }],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/thelia/academy' }],
			editLink: { baseUrl: 'https://github.com/thelia/academy/edit/main/' },
			lastUpdated: true,
			customCss: [
				'@fontsource-variable/bricolage-grotesque',
				'@fontsource-variable/hanken-grotesk',
				'./src/styles/theme.css',
			],
			components: {
				Footer: './src/components/Footer.astro',
			},
			sidebar,
			plugins: [starlightLinksValidator()],
		}),
	],
});
