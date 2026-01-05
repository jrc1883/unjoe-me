/**
 * Calculate reading time for blog content
 * @param content - The markdown/text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function getReadingTime(content: string, wordsPerMinute: number = 200): number {
  // Handle undefined or empty content
  if (!content || typeof content !== 'string') {
    return 1; // Default to 1 minute for empty/missing content
  }

  // Remove markdown syntax for more accurate word count
  const cleanContent = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]*`/g, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove frontmatter (if any)
    .replace(/---[\s\S]*?---/g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Count words
  const words = cleanContent.split(/\s+/).length;

  // Calculate reading time and round up
  const minutes = Math.ceil(words / wordsPerMinute);

  // Minimum 1 minute
  return Math.max(1, minutes);
}

/**
 * Format reading time as human-readable string
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Get reading time from Astro collection entry
 * @param entry - Astro content collection entry with optional body property
 * @returns Reading time in minutes
 */
export function getReadingTimeFromEntry(entry: { body?: string }): number {
  return getReadingTime(entry.body || '');
}
