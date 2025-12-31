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
	}),
});

export const collections = { blog };
