/**
 * Generates beautiful gradient backgrounds for blog posts without hero images
 * Based on post tags or title, creates consistent, branded gradients
 */

interface GradientTheme {
	from: string;
	via: string;
	to: string;
	accent: string;
}

// Gradient themes mapped to common tags/topics
const gradientThemes: Record<string, GradientTheme> = {
	// Technical/Engineering
	technical: {
		from: '#0f172a', // slate-900
		via: '#1e3a8a', // blue-900
		to: '#1e40af', // blue-800
		accent: '#3b82f6', // blue-500
	},
	engineering: {
		from: '#0c4a6e', // sky-900
		via: '#075985', // sky-800
		to: '#0369a1', // sky-700
		accent: '#0ea5e9', // sky-500
	},

	// Leadership/Career
	leadership: {
		from: '#4c1d95', // violet-900
		via: '#6d28d9', // violet-700
		to: '#7c3aed', // violet-600
		accent: '#a78bfa', // violet-400
	},
	career: {
		from: '#581c87', // purple-900
		via: '#7e22ce', // purple-700
		to: '#9333ea', // purple-600
		accent: '#c084fc', // purple-400
	},
	navy: {
		from: '#1e3a8a', // blue-900
		via: '#1e40af', // blue-800
		to: '#1d4ed8', // blue-700
		accent: '#60a5fa', // blue-400
	},

	// Philosophy/Faith
	philosophy: {
		from: '#431407', // orange-950
		via: '#7c2d12', // orange-900
		to: '#9a3412', // orange-800
		accent: '#fb923c', // orange-400
	},
	faith: {
		from: '#78350f', // amber-900
		via: '#92400e', // amber-800
		to: '#b45309', // amber-700
		accent: '#fbbf24', // amber-400
	},

	// AI/Technology
	ai: {
		from: '#0c4a6e', // cyan-900
		via: '#0e7490', // cyan-800
		to: '#0891b2', // cyan-700
		accent: '#22d3ee', // cyan-400
	},
	automation: {
		from: '#064e3b', // emerald-900
		via: '#065f46', // emerald-800
		to: '#047857', // emerald-700
		accent: '#34d399', // emerald-400
	},

	// Projects/Family
	projects: {
		from: '#1e1b4b', // indigo-950
		via: '#312e81', // indigo-900
		to: '#3730a3', // indigo-800
		accent: '#818cf8', // indigo-400
	},
	'family-tech': {
		from: '#881337', // rose-900
		via: '#9f1239', // rose-800
		to: '#be123c', // rose-700
		accent: '#fb7185', // rose-400
	},

	// Default/Fallback
	default: {
		from: '#0a0a0b',
		via: '#1e293b', // slate-800
		to: '#334155', // slate-700
		accent: '#3b82f6', // blue-500
	},
};

/**
 * Get gradient theme based on post tags or title
 */
export function getGradientTheme(tags: string[] = [], title: string = ''): GradientTheme {
	// Check tags first
	for (const tag of tags) {
		const theme = gradientThemes[tag.toLowerCase()];
		if (theme) return theme;
	}

	// Check title for keywords
	const titleLower = title.toLowerCase();
	for (const [keyword, theme] of Object.entries(gradientThemes)) {
		if (titleLower.includes(keyword)) {
			return theme;
		}
	}

	// Return default
	return gradientThemes.default;
}

/**
 * Generate CSS gradient string for hero background
 */
export function generateGradientCSS(theme: GradientTheme): string {
	return `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.to} 100%)`;
}

/**
 * Generate SVG pattern overlay for visual interest
 */
export function generatePatternOverlay(theme: GradientTheme): string {
	return `
		<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="${theme.accent}" stroke-width="0.5" opacity="0.1"/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	`;
}

/**
 * Complete fallback hero component data
 */
export interface FallbackHeroData {
	gradient: string;
	title: string;
	accentColor: string;
}

export function getFallbackHero(tags: string[], title: string): FallbackHeroData {
	const theme = getGradientTheme(tags, title);
	return {
		gradient: generateGradientCSS(theme),
		title,
		accentColor: theme.accent,
	};
}
