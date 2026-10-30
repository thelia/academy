// Sidebar sections, in reading order. A section shows up as soon as its folder
// exists under src/content/docs/: adding a tutorial never requires editing this file.
import { existsSync } from 'node:fs';

export const sections = [
	{ directory: 'getting-started', label: 'Bien démarrer', en: 'Getting started' },
	{ directory: 'catalog', label: 'Catalogue', en: 'Catalog' },
	{ directory: 'orders', label: 'Commandes', en: 'Orders' },
	{ directory: 'customers', label: 'Clients', en: 'Customers' },
	{ directory: 'marketing', label: 'Promotions et marketing', en: 'Promotions and marketing' },
	{ directory: 'content', label: 'Contenus et référencement', en: 'Content and SEO' },
	{ directory: 'payment-delivery', label: 'Paiement et livraison', en: 'Payment and delivery' },
	{ directory: 'settings', label: 'Réglages de la boutique', en: 'Store settings' },
	{ directory: 'glossary', label: 'Lexique du e-commerce', en: 'E-commerce glossary' },
];

const docsRoot = new URL('./src/content/docs/', import.meta.url);

export const sidebar = sections
	.filter(({ directory }) => existsSync(new URL(directory, docsRoot)))
	.map(({ directory, label, en }) => ({
		label,
		translations: { en },
		items: [{ autogenerate: { directory } }],
	}));
