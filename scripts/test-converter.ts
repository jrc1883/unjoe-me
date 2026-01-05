/**
 * Test script for MDX → Markdown converter
 *
 * Usage: npx tsx scripts/test-converter.ts [blog-post-name]
 */

import { convertMdxToMarkdown } from './converters/mdx-to-markdown';
import { resolve, dirname } from 'path';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testConverter() {
  // Get blog post name from args or use default
  const postName = process.argv[2] || 'elshaddai-philosophy';
  const inputPath = resolve(__dirname, `../src/content/blog/${postName}.mdx`);

  console.log(`\n📝 Testing MDX → Markdown Converter\n`);
  console.log(`Input: ${inputPath}`);

  try {
    const result = await convertMdxToMarkdown(inputPath, {
      platform: 'medium',
      baseUrl: 'https://unjoe.me',
      canonicalUrl: `https://unjoe.me/blog/${postName}`,
      definitionStyle: 'inline'
    });

    console.log(`\n✅ Conversion successful!\n`);

    // Display frontmatter
    console.log(`📋 Frontmatter:`);
    console.log(JSON.stringify(result.frontmatter, null, 2));

    // Display warnings
    if (result.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${result.warnings.length}):`);
      result.warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
    }

    // Display markdown preview
    console.log(`\n📄 Markdown Preview (first 500 chars):`);
    console.log(result.markdown.slice(0, 500));
    console.log(`\n... (${result.markdown.length} total characters)\n`);

    // Write to output file
    const outputPath = resolve(__dirname, `../dist/test-output-${postName}.md`);
    writeFileSync(outputPath, result.markdown, 'utf-8');
    console.log(`💾 Full output written to: ${outputPath}\n`);

  } catch (error) {
    console.error(`\n❌ Conversion failed:`, error);
    process.exit(1);
  }
}

testConverter();
