/**
 * MDX to Markdown Converter
 *
 * Converts Astro MDX blog posts to clean Markdown for syndication platforms.
 * Handles custom Astro components (<Ref>, <Callout>) using AST transformation.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Text } from 'mdast';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';

export interface ConversionOptions {
  /** Target platform: affects component conversion strategy */
  platform: 'medium' | 'substack' | 'dev.to' | 'hashnode';

  /** Base URL for converting relative links to absolute */
  baseUrl: string;

  /** Canonical URL to add as footer/frontmatter */
  canonicalUrl: string;

  /** How to handle term definitions */
  definitionStyle?: 'inline' | 'footnote';
}

export interface ConversionResult {
  /** Converted Markdown content */
  markdown: string;

  /** Original frontmatter (title, description, etc.) */
  frontmatter: Record<string, any>;

  /** Warnings or issues during conversion */
  warnings: string[];
}

/**
 * Main conversion function
 */
export async function convertMdxToMarkdown(
  mdxPath: string,
  options: ConversionOptions
): Promise<ConversionResult> {
  const warnings: string[] = [];

  // Read and parse frontmatter
  const fileContent = readFileSync(resolve(mdxPath), 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  // Process MDX with remark
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(() => transformComponents(options, warnings))
    .use(remarkStringify, {
      bullet: '-',
      emphasis: '_',
      strong: '*',
      rule: '-',
      fences: true,
      listItemIndent: 'one'
    });

  const result = await processor.process(content);
  let markdown = String(result);

  // Convert relative URLs to absolute
  markdown = convertRelativeUrls(markdown, options.baseUrl);

  // Add canonical footer based on platform
  markdown = addCanonicalFooter(markdown, options);

  return {
    markdown,
    frontmatter,
    warnings
  };
}

/**
 * Transform Astro components to Markdown
 */
function transformComponents(options: ConversionOptions, warnings: string[]) {
  return (tree: Root) => {
    // Remove import statements
    visit(tree, 'mdxjsEsm', (node, index, parent: any) => {
      if (parent && typeof index === 'number') {
        parent.children.splice(index, 1);
        return [visit.SKIP, index];
      }
    });

    // Transform <Ref> and <Callout> components
    visit(tree, (node: any, index, parent: any) => {
      if (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') {
        let replacement = null;

        if (node.name === 'Ref') {
          replacement = transformRef(node, options, warnings);
        } else if (node.name === 'Callout') {
          replacement = transformCallout(node, options, warnings);
        }

        // Replace node in parent's children
        if (replacement && parent && typeof index === 'number') {
          parent.children[index] = replacement;
          return [visit.SKIP, index];
        }
      }
    });
  };
}

/**
 * Transform <Ref> component based on type
 */
function transformRef(
  node: MdxJsxTextElement | MdxJsxFlowElement,
  options: ConversionOptions,
  warnings: string[]
): any {
  const attributes = getAttributes(node);
  const children = getTextContent(node);

  // Type 1: Bible reference
  if (attributes.bible) {
    const verse = attributes.bible;
    const url = `https://www.esv.org/${encodeURIComponent(verse)}`;
    return createLink(children, url);
  }

  // Type 2: Term definition
  if (attributes.term && attributes.definition) {
    const term = children;
    const definition = attributes.definition;

    if (options.definitionStyle === 'footnote') {
      // TODO: Implement footnote support
      warnings.push(`Footnote style not yet implemented for term: ${term}`);
      return createInlineDefinition(term, definition);
    }

    return createInlineDefinition(term, definition);
  }

  // Type 3: Link (internal or external)
  if (attributes.href) {
    let url = attributes.href;

    // Convert internal links to absolute
    if (url.startsWith('/')) {
      url = `${options.baseUrl}${url}`;
    }

    return createLink(children, url);
  }

  // Type 4: Custom tooltip (just return text)
  if (attributes.tooltip) {
    warnings.push(`Tooltip content discarded for: "${children}"`);
    return createText(children);
  }

  // Fallback: return as text
  warnings.push(`Unknown Ref type for: "${children}"`);
  return createText(children);
}

/**
 * Transform <Callout> component to blockquote
 */
function transformCallout(
  node: MdxJsxTextElement | MdxJsxFlowElement,
  options: ConversionOptions,
  warnings: string[]
): any {
  const attributes = getAttributes(node);
  const children = node.children;

  const type = attributes.type || 'note';
  const title = attributes.title || '';

  // Icon mapping
  const icons: Record<string, string> = {
    'info': 'ℹ️',
    'warning': '⚠️',
    'success': '✅',
    'note': '📝',
    'historical': '📜'
  };

  const icon = icons[type] || '📝';

  // Create blockquote with icon and title
  return {
    type: 'blockquote',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'strong',
            children: [{ type: 'text', value: `${icon} ${title}` }]
          }
        ]
      },
      {
        type: 'paragraph',
        children: children
      }
    ]
  };
}

/**
 * Helper: Extract attributes from MDX JSX element
 */
function getAttributes(node: MdxJsxTextElement | MdxJsxFlowElement): Record<string, string> {
  const attrs: Record<string, string> = {};

  if (node.attributes) {
    for (const attr of node.attributes) {
      if (attr.type === 'mdxJsxAttribute' && attr.name) {
        attrs[attr.name] = attr.value as string;
      }
    }
  }

  return attrs;
}

/**
 * Helper: Get text content from node children
 */
function getTextContent(node: any): string {
  if (!node.children || node.children.length === 0) {
    return '';
  }

  return node.children
    .map((child: any) => {
      if (child.type === 'text') {
        return child.value;
      }
      if (child.children) {
        return getTextContent(child);
      }
      return '';
    })
    .join('');
}

/**
 * Helper: Create link node
 */
function createLink(text: string, url: string): any {
  return {
    type: 'link',
    url,
    children: [{ type: 'text', value: text }]
  };
}

/**
 * Helper: Create inline definition (italicized term with definition)
 */
function createInlineDefinition(term: string, definition: string): any {
  return {
    type: 'emphasis',
    children: [
      { type: 'text', value: `${term}` },
      { type: 'text', value: ` (${definition})` }
    ]
  };
}

/**
 * Helper: Create text node
 */
function createText(text: string): Text {
  return {
    type: 'text',
    value: text
  };
}

/**
 * Convert relative URLs to absolute
 */
function convertRelativeUrls(markdown: string, baseUrl: string): string {
  // Convert image URLs
  markdown = markdown.replace(
    /!\[([^\]]*)\]\(\/([^)]+)\)/g,
    `![$1](${baseUrl}/$2)`
  );

  // Convert link URLs
  markdown = markdown.replace(
    /\[([^\]]+)\]\(\/([^)]+)\)/g,
    `[$1](${baseUrl}/$2)`
  );

  return markdown;
}

/**
 * Add canonical URL footer based on platform
 */
function addCanonicalFooter(markdown: string, options: ConversionOptions): string {
  const { platform, canonicalUrl } = options;

  if (platform === 'medium') {
    // Medium supports canonical URL in API, no footer needed
    return markdown;
  }

  if (platform === 'substack') {
    // Substack: add HTML footer
    return `${markdown}\n\n---\n\n*Originally published at [${canonicalUrl}](${canonicalUrl})*`;
  }

  // Default: add Markdown footer
  return `${markdown}\n\n---\n\n*Read the original at [${canonicalUrl}](${canonicalUrl})*`;
}
