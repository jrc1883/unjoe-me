import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		heroImageAlt: z.string().optional(),
		// Meta prompt for AI image generation (future automation)
		heroImagePrompt: z.string().optional(),
		// Tags for categorization and filtering
		tags: z.array(z.string()).default([]),
		// Optional: Featured flag for highlighting important posts
		featured: z.boolean().default(false),
		// Draft mode: only visible in development
		draft: z.boolean().default(false),
		// Series support for multi-part posts
		series: z.string().optional(),
		seriesPart: z.number().optional(),
		seriesTotal: z.number().optional(),
	}),
});

const events = defineCollection({
	// Load Markdown and MDX files in the `src/content/events/` directory.
	loader: glob({ base: './src/content/events', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		date: z.string().datetime(),
		venue: z.string(),
		location: z.string(),
		description: z.string().optional(),
		ticketUrl: z.string().url().optional(),
		featured: z.boolean().default(false),
		customImage: z.string().optional(),
		eventType: z.enum(['upcoming', 'recurring', 'past']).default('upcoming'),
		displayDate: z.string().optional(),
		time: z.string().optional(),
		address: z.string().optional(),
		ticketType: z.string().optional(),
	}),
});

export const collections = { blog, events };
