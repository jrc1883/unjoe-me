import type { CollectionEntry } from 'astro:content';

/**
 * Calculate similarity score between two posts based on tag overlap
 */
function calculateSimilarity(post1Tags: string[], post2Tags: string[]): number {
	const commonTags = post1Tags.filter(tag => post2Tags.includes(tag));
	return commonTags.length;
}

/**
 * Find related posts based on tag overlap
 * @param currentPostId - The id of the current post
 * @param currentTags - Tags of the current post
 * @param allPosts - All available blog posts
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related posts sorted by relevance
 */
export function findRelatedPosts(
	currentPostId: string,
	currentTags: string[],
	allPosts: CollectionEntry<'blog'>[],
	limit: number = 3
): CollectionEntry<'blog'>[] {
	if (currentTags.length === 0) {
		// If current post has no tags, return most recent posts
		return allPosts
			.filter(post => post.id !== currentPostId)
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.slice(0, limit);
	}

	// Calculate similarity scores for all other posts
	const postsWithScores = allPosts
		.filter(post => post.id !== currentPostId)
		.map(post => ({
			post,
			score: calculateSimilarity(currentTags, post.data.tags || []),
		}))
		.filter(item => item.score > 0) // Only include posts with at least one common tag
		.sort((a, b) => {
			// Sort by score (descending), then by date (descending)
			if (b.score !== a.score) {
				return b.score - a.score;
			}
			return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
		});

	// If we have enough posts with common tags, return them
	if (postsWithScores.length >= limit) {
		return postsWithScores.slice(0, limit).map(item => item.post);
	}

	// If we don't have enough posts with common tags, fill with recent posts
	const relatedPosts = postsWithScores.map(item => item.post);
	const remainingCount = limit - relatedPosts.length;

	const recentPosts = allPosts
		.filter(post =>
			post.id !== currentPostId &&
			!relatedPosts.some(rp => rp.id === post.id)
		)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, remainingCount);

	return [...relatedPosts, ...recentPosts];
}
