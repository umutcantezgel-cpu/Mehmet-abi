#!/usr/bin/env node
/**
 * SRI (Subresource Integrity) Generator
 *
 * Generates integrity hashes for all CSS, JS, and WOFF2 files
 * Creates integrity.manifest.json for verification
 *
 * Usage: node scripts/gen-sri.js
 */

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const DIST_DIR = 'dist';
const OUTPUT_FILE = join(DIST_DIR, 'integrity.manifest.json');
const ALGORITHMS = ['sha384', 'sha512'];

/**
 * Generate SRI hash for a file
 * @param {string} filePath - Path to file
 * @param {string} algorithm - Hash algorithm (sha384 or sha512)
 * @returns {string} - Base64-encoded hash
 */
function generateHash(filePath, algorithm = 'sha384') {
  const content = readFileSync(filePath);
  const hash = createHash(algorithm).update(content).digest('base64');
  return `${algorithm}-${hash}`;
}

/**
 * Recursively find all files with given extensions
 * @param {string} dir - Directory to search
 * @param {string[]} extensions - File extensions to include
 * @returns {string[]} - Array of file paths
 */
function findFiles(dir, extensions) {
  const files = [];

  function walk(currentDir) {
    const items = readdirSync(currentDir);

    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const ext = item.split('.').pop();
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Main execution
 */
function main() {
  console.log('🔒 Generating SRI hashes...\n');

  // Find all relevant files
  const files = findFiles(DIST_DIR, ['css', 'js', 'woff2']);

  if (files.length === 0) {
    console.error('❌ No files found in dist/');
    process.exit(1);
  }

  const manifest = {
    generated: new Date().toISOString(),
    algorithm: 'sha384',
    files: {}
  };

  let count = 0;

  for (const filePath of files) {
    const relativePath = relative(DIST_DIR, filePath);
    const integrity = generateHash(filePath, 'sha384');
    const size = statSync(filePath).size;

    manifest.files[`/${relativePath}`] = {
      integrity,
      size,
      algorithm: 'sha384'
    };

    console.log(`✅ ${relativePath}`);
    console.log(`   ${integrity}`);
    console.log(`   ${(size / 1024).toFixed(2)} KB\n`);

    count++;
  }

  // Write manifest
  writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log(`\n✅ Generated SRI hashes for ${count} files`);
  console.log(`📄 Manifest: ${OUTPUT_FILE}`);
  console.log('\n💡 Usage:');
  console.log('   <link rel="stylesheet" href="/styles/main.css"');
  console.log(`         integrity="${Object.values(manifest.files)[0]?.integrity}">`);
}

main();
