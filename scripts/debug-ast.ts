/**
 * Debug AST structure of MDX file
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function debugAST() {
  const postName = process.argv[2] || 'when-compassion-becomes-a-weapon';
  const inputPath = resolve(__dirname, `../src/content/blog/${postName}.mdx`);

  const fileContent = readFileSync(inputPath, 'utf-8');
  const { content } = matter(fileContent);

  // Parse to AST
  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .parse(content);

  console.log('\n🔍 AST Node Types Found:\n');
  const nodeTypes = new Set<string>();

  visit(tree, (node: any) => {
    nodeTypes.add(node.type);

    // Log details of JSX nodes
    if (node.type.includes('mdx') || node.type.includes('jsx')) {
      console.log(`Type: ${node.type}`);
      if (node.name) console.log(`  Name: ${node.name}`);
      if (node.attributes) console.log(`  Attributes:`, node.attributes.length);
      if (node.children) console.log(`  Children:`, node.children.length);
      console.log('');
    }
  });

  console.log('\n📋 All Node Types:');
  Array.from(nodeTypes).sort().forEach(type => console.log(`  - ${type}`));
}

debugAST();
