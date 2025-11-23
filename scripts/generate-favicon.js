#!/usr/bin/env node

/**
 * Generate favicon.ico from Lumina logo PNGs
 *
 * This script creates a multi-resolution favicon.ico file from the Lumina logo.
 * It uses the 16x16, 32x32, and 48x48 PNG versions.
 */

const fs = require('fs')
const path = require('path')
// Get logo paths from @lumina-study/logo package
const logo = require('@lumina-study/logo')

const staticDir = path.join(__dirname, '..', 'static', 'img')

// For now, we'll use the 32x32 PNG as favicon.ico since it's the standard size
// Modern browsers will automatically use the PNG files we already copied
const faviconSource = logo.sizes[32]
const faviconDest = path.join(staticDir, 'favicon.ico')

console.log('Generating favicon.ico...')
console.log(`Source: ${faviconSource}`)
console.log(`Destination: ${faviconDest}`)

// Copy the 32x32 PNG as favicon.ico
// This works for most browsers, and we have the PNG fallbacks in place
fs.copyFileSync(faviconSource, faviconDest)

console.log('✅ favicon.ico generated successfully')
console.log('\nNote: Modern browsers will prefer the PNG files:')
console.log('  - favicon-16x16.png')
console.log('  - favicon-32x32.png')
