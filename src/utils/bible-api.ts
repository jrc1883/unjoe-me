/**
 * Bible API Integration - ESV API
 * Fetches Bible verses at build time for tooltip display
 *
 * Future: Will integrate with Genesis API when available
 */

interface BibleVerse {
  reference: string;
  text: string;
  translation: string;
  copyright: string;
}

/**
 * Parse Bible reference string
 * Examples: "Matthew 2:13-15", "Romans 13:1-4", "Acts 5:29"
 */
export function parseReference(reference: string): {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
} | null {
  // Regex: Optional number, book name, chapter, verse(s)
  const regex = /^([1-3]?\s?[A-Za-z]+)\s+(\d+):(\d+)(?:-(\d+))?$/;
  const match = reference.trim().match(regex);

  if (!match) return null;

  return {
    book: match[1].trim(),
    chapter: parseInt(match[2]),
    verseStart: parseInt(match[3]),
    verseEnd: match[4] ? parseInt(match[4]) : undefined,
  };
}

/**
 * Fetch verse from ESV API
 * Free tier: 5000 requests/day (plenty for builds)
 */
export async function fetchESVVerse(reference: string): Promise<BibleVerse | null> {
  const apiKey = import.meta.env.ESV_API_KEY;

  // For development: return mock data if no API key
  if (!apiKey || apiKey === 'YOUR_KEY_HERE') {
    console.warn(`ESV API key not configured. Using mock data for: ${reference}`);
    return getMockVerse(reference);
  }

  try {
    const params = new URLSearchParams({
      q: reference,
      'include-headings': 'false',
      'include-footnotes': 'false',
      'include-verse-numbers': 'true',
      'include-short-copyright': 'true',
      'include-passage-references': 'false',
    });

    const response = await fetch(`https://api.esv.org/v3/passage/text/?${params}`, {
      headers: {
        'Authorization': `Token ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.error(`ESV API error: ${response.status} ${response.statusText}`);
      return getMockVerse(reference);
    }

    const data = await response.json();

    if (!data.passages || data.passages.length === 0) {
      console.error(`No passages found for: ${reference}`);
      return null;
    }

    return {
      reference: data.canonical || reference,
      text: data.passages[0].trim(),
      translation: 'ESV',
      copyright: 'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers.',
    };
  } catch (error) {
    console.error(`Failed to fetch verse ${reference}:`, error);
    return getMockVerse(reference);
  }
}

/**
 * Mock verse data for development/testing
 */
function getMockVerse(reference: string): BibleVerse {
  const mockVerses: Record<string, string> = {
    'Matthew 2:13-15': '[13] Now when they had departed, behold, an angel of the Lord appeared to Joseph in a dream and said, "Rise, take the child and his mother, and flee to Egypt, and remain there until I tell you, for Herod is about to search for the child, to destroy him." [14] And he rose and took the child and his mother by night and departed to Egypt [15] and remained there until the death of Herod. This was to fulfill what the Lord had spoken by the prophet, "Out of Egypt I called my son."',
    'Romans 13:1-4': '[1] Let every person be subject to the governing authorities. For there is no authority except from God, and those that exist have been instituted by God. [2] Therefore whoever resists the authorities resists what God has appointed, and those who resist will incur judgment. [3] For rulers are not a terror to good conduct, but to bad. Would you have no fear of the one who is in authority? Then do what is good, and you will receive his approval, [4] for he is God\'s servant for your good. But if you do wrong, be afraid, for he does not bear the sword in vain. For he is the servant of God, an avenger who carries out God\'s wrath on the wrongdoer.',
    'Acts 5:29': '[29] But Peter and the apostles answered, "We must obey God rather than men."',
    'Matthew 2:19-21': '[19] But when Herod died, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, [20] saying, "Rise, take the child and his mother and go to the land of Israel, for those who sought the child\'s life are dead." [21] And he rose and took the child and his mother and went to the land of Israel.',
    'Deuteronomy 16:19': '[19] You shall not pervert justice. You shall not show partiality, and you shall not accept a bribe, for a bribe blinds the eyes of the wise and subverts the cause of the righteous.',
    'Deuteronomy 1:16-17': '[16] And I charged your judges at that time, "Hear the cases between your brothers, and judge righteously between a man and his brother or the alien who is with him. [17] You shall not be partial in judgment. You shall hear the small and the great alike. You shall not be intimidated by anyone, for the judgment is God\'s. And the case that is too hard for you, you shall bring to me, and I will hear it."',
    'Exodus 21:23-25': '[23] But if there is harm, then you shall pay life for life, [24] eye for eye, tooth for tooth, hand for hand, foot for foot, [25] burn for burn, wound for wound, stripe for stripe.',
    'Romans 13:1-7': '[1] Let every person be subject to the governing authorities. For there is no authority except from God, and those that exist have been instituted by God. [2] Therefore whoever resists the authorities resists what God has appointed, and those who resist will incur judgment. [3] For rulers are not a terror to good conduct, but to bad. Would you have no fear of the one who is in authority? Then do what is good, and you will receive his approval, [4] for he is God\'s servant for your good. But if you do wrong, be afraid, for he does not bear the sword in vain. For he is the servant of God, an avenger who carries out God\'s wrath on the wrongdoer. [5] Therefore one must be in subjection, not only to avoid God\'s wrath but also for the sake of conscience. [6] For because of this you also pay taxes, for the authorities are ministers of God, attending to this very thing. [7] Pay to all what is owed to them: taxes to whom taxes are owed, revenue to whom revenue is owed, respect to whom respect is owed, honor to whom honor is owed.',
  };

  const text = mockVerses[reference] || `[Mock verse text for ${reference}]`;

  return {
    reference,
    text,
    translation: 'ESV (Mock)',
    copyright: 'Mock data for development',
  };
}

/**
 * Fetch verse - supports both ESV API and future Genesis API
 */
export async function fetchVerse(
  reference: string,
  translation: string = 'ESV'
): Promise<BibleVerse | null> {
  // Validate reference format
  const parsed = parseReference(reference);
  if (!parsed) {
    console.error(`Invalid Bible reference format: ${reference}`);
    return null;
  }

  // Future: Check for Genesis API
  const useGenesisAPI = import.meta.env.USE_GENESIS_API === 'true';

  if (useGenesisAPI) {
    // TODO: Implement Genesis API integration
    console.log('Genesis API integration coming soon...');
    return fetchESVVerse(reference);
  }

  // Default to ESV API
  return fetchESVVerse(reference);
}

/**
 * Format verse text for display
 * Removes verse numbers in brackets for cleaner tooltip display
 */
export function formatVerseText(text: string, includeNumbers: boolean = false): string {
  if (includeNumbers) {
    // Keep verse numbers but make them superscript-friendly
    return text.replace(/\[(\d+)\]/g, '$1 ');
  }

  // Remove verse numbers for cleaner reading
  return text.replace(/\[\d+\]\s*/g, '');
}

/**
 * Get short copyright notice for tooltips
 */
export function getShortCopyright(translation: string): string {
  if (translation === 'ESV') {
    return 'ESV®';
  }
  return translation;
}
