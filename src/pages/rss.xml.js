import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE, AUTHOR } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			// Author information
			author: AUTHOR.name,
			// Categories from tags
			categories: post.data.tags || [],
			// Image enclosure for hero images
			enclosure: post.data.heroImage ? {
				url: new URL(post.data.heroImage, context.site).toString(),
				type: 'image/jpeg',
				length: 0, // Placeholder - RSS readers don't strictly require this
			} : undefined,
		})),
	});
}
