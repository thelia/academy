import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// Extra front matter used by scripts/check-content.mjs and scripts/impacted.mjs.
// Never rendered: it records where each statement was checked.
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Thelia version the page was checked against, e.g. "3.3".
				thelia: z.string().optional(),
				// Date of the last check against code and screens.
				verified: z.coerce.date().optional(),
				// "<owner>/<repo>:<path>[:<line>]" for code, "capture:<manifest>" for screens.
				sources: z.array(z.string()).default([]),
				// English pages only: fingerprint of the French page they translate.
				translatedFrom: z.string().optional(),
			}),
		}),
	}),
	// UI strings overriding Starlight's own translations (src/content/i18n/<lang>.json).
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
