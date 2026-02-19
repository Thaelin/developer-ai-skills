/**
 * Generate a Mermaid Live Editor URL from a diagram string.
 *
 * Requires: npm i pako -g
 *
 * CLI:
 *   node pako_compress_and_open_in_mermaid_live_editor.js "sequenceDiagram\nA->>B: hi"
 *
 * Module:
 *   const { createMermaidLiveUrl } = require('./pako_compress_and_open_in_mermaid_live_editor');
 *   console.log(createMermaidLiveUrl(diagramString));
 */

'use strict';

const pako = require('pako');

function createMermaidLiveUrl(code) {
  const state = JSON.stringify({ code, mermaid: { theme: 'default' } });
  const compressed = pako.deflate(state, { level: 9 });
  const payload = Buffer.from(compressed)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return 'https://mermaid.live/edit#pako:' + payload;
}

if (require.main === module) {
  const code = process.argv[2];
  if (!code) {
    console.error('Usage: node pako_compress_and_open_in_mermaid_live_editor.js "<diagram>"');
    process.exitCode = 1;
  } else {
    console.log(createMermaidLiveUrl(code));
  }
}

module.exports = { createMermaidLiveUrl };