#!/usr/bin/env node
/**
 * SRI (Subresource Integrity) Verifier
 *
 * Verifies that all CSS, JS files have correct integrity hashes
 * Checks against integrity.manifest.json
 *
 * Usage: node scripts/verify-sri.js
 */

import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';
const MANIFEST_FILE = join(DIST_DIR, 'integrity.manifest.json');

/**
 * Generate hash for comparison
 */
function generateHash(filePath, algorithm = 'sha384') {
  const content = readFileSync(filePath);
  const hash = createHash(algorithm).update(content).digest('base64');
  return `${algorithm}-${hash}`;
}

/**
 * Main verification
 */
function main() {
  console.log('🔍 Verifying SRI hashes...\n');

  // Check manifest exists
  if (!existsSync(MANIFEST_FILE)) {
    console.error('❌ integrity.manifest.json not found');
    console.error('   Run: node scripts/gen-sri.js');
    process.exit(1);
  }

  // Load manifest
  const manifest = JSON.parse(readFileSync(MANIFEST_FILE, 'utf-8'));
  const files = Object.keys(manifest.files);

  let errors = 0;
  let verified = 0;

  for (const relativePath of files) {
    const filePath = join(DIST_DIR, relativePath.replace(/^\//, ''));
    const expected = manifest.files[relativePath];

    // Check file exists
    if (!existsSync(filePath)) {
      console.error(`❌ ${relativePath} - FILE NOT FOUND`);
      errors++;
      continue;
    }

    // Generate current hash
    const currentHash = generateHash(filePath, expected.algorithm);

    // Compare
    if (currentHash === expected.integrity) {
      console.log(`✅ ${relativePath}`);
      verified++;
    } else {
      console.error(`❌ ${relativePath} - HASH MISMATCH`);
      console.error(`   Expected: ${expected.integrity}`);
      console.error(`   Current:  ${currentHash}`);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Verified: ${verified}`);
  console.log(`   ❌ Errors:   ${errors}`);

  if (errors > 0) {
    console.error('\n❌ SRI verification failed');
    console.error('   Files have been modified since hash generation');
    console.error('   Run: node scripts/gen-sri.js');
    process.exit(1);
  }

  console.log('\n✅ All SRI hashes verified');
}

main();
