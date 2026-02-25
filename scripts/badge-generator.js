#!/usr/bin/env node

/**
 * OpenSpec Badge Generator
 *
 * Generates SVG badges for OpenSpec metrics using the badgen library.
 * This script is used by both the GitHub Action (action.yml) and the
 * maintainer script (RUNME.sh) to ensure consistency.
 *
 * Usage:
 *   node scripts/badge-generator.js \
 *     --metric <metric-name> \
 *     --spec-count <number> \
 *     --req-count <number> \
 *     --open-changes <number> \
 *     --completed-tasks <number> \
 *     --total-tasks <number> \
 *     --style <classic|flat> \
 *     --show-label <true|false> \
 *     --output <path>
 *
 * Metrics:
 *   - number_of_specs: Total number of spec files
 *   - number_of_requirements: Total number of requirements
 *   - tasks_status: Ratio of completed vs open tasks
 *   - open_changes: Number of active changes
 */

const { badgen } = require('badgen');
const fs = require('fs');
const path = require('path');

// OpenSpec icon SVG
const iconSvg = `<svg width="20" height="20" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 0C53.2 0 66.4 0 80 0C80 6.6 80 13.2 80 20C66.8 20 53.6 20 40 20C40 13.4 40 6.8 40 0Z" fill="#fff"/><path d="M20 20C26.6 20 33.2 20 40 20C40 26.6 40 33.2 40 40C33.4 40 26.8 40 20 40C20 33.4 20 26.8 20 20Z" fill="#fff"/><path d="M80 20C86.6 20 93.2 20 100 20C100 26.6 100 33.2 100 40C93.4 40 86.8 40 80 40C80 33.4 80 26.8 80 20Z" fill="#fff"/><path d="M0 40C6.6 40 13.2 40 20 40C20 59.8 20 79.6 20 100C13.4 100 6.8 100 0 100C0 80.2 0 60.4 0 40Z" fill="#fff"/><path d="M40 40C53.2 40 66.4 40 80 40C80 59.8 80 79.6 80 100C66.8 100 53.6 100 40 100C40 80.2 40 60.4 40 40Z" fill="#fff"/><path d="M100 40C106.6 40 113.2 40 120 40C120 59.8 120 79.6 120 100C113.4 100 106.8 100 100 100C100 80.2 100 60.4 100 40Z" fill="#fff"/><path d="M20 100C26.6 100 33.2 100 40 100C40 106.6 40 113.2 40 120C33.4 120 26.8 120 20 120C20 113.4 20 106.8 20 100Z" fill="#fff"/><path d="M80 100C86.6 100 93.2 100 100 100C100 106.6 100 113.2 100 120C93.4 120 86.8 120 80 120C80 113.4 80 106.8 80 100Z" fill="#fff"/><path d="M40 120C53.2 120 66.4 120 80 120C80 126.6 80 133.2 80 140C66.8 140 53.6 140 40 140C40 133.4 40 126.8 40 120Z" fill="#fff"/></svg>`;
const iconUri = 'data:image/svg+xml;base64,' + Buffer.from(iconSvg).toString('base64');

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    parsed[key] = value;
  }

  return parsed;
}

// Validate required arguments
function validateArgs(args) {
  const required = ['metric', 'spec-count', 'req-count', 'open-changes', 'completed-tasks', 'total-tasks', 'style', 'show-label', 'output'];
  const missing = required.filter(key => !(key in args));

  if (missing.length > 0) {
    console.error(`Error: Missing required arguments: ${missing.join(', ')}`);
    console.error('\nUsage: node scripts/badge-generator.js \\');
    console.error('  --metric <metric-name> \\');
    console.error('  --spec-count <number> \\');
    console.error('  --req-count <number> \\');
    console.error('  --open-changes <number> \\');
    console.error('  --completed-tasks <number> \\');
    console.error('  --total-tasks <number> \\');
    console.error('  --style <classic|flat> \\');
    console.error('  --show-label <true|false> \\');
    console.error('  --output <path>');
    process.exit(1);
  }

  // Validate metric type
  const validMetrics = ['number_of_specs', 'number_of_requirements', 'tasks_status', 'open_changes'];
  if (!validMetrics.includes(args.metric)) {
    console.error(`Error: Invalid metric type: '${args.metric}'`);
    console.error(`Valid metric types: ${validMetrics.join(', ')}`);
    process.exit(1);
  }

  // Validate style
  if (!['classic', 'flat'].includes(args.style)) {
    console.error(`Error: Invalid style: '${args.style}'`);
    console.error('Valid styles: classic, flat');
    process.exit(1);
  }

  // Validate show-label
  if (!['true', 'false'].includes(args['show-label'])) {
    console.error(`Error: Invalid show-label value: '${args['show-label']}'`);
    console.error('Valid values: true, false');
    process.exit(1);
  }
}

// Generate badge
function generateBadge(args) {
  const specCount = parseInt(args['spec-count']) || 0;
  const reqCount = parseInt(args['req-count']) || 0;
  const openChanges = parseInt(args['open-changes']) || 0;
  const completedTasks = parseInt(args['completed-tasks']) || 0;
  const totalTasks = parseInt(args['total-tasks']) || 0;
  const isFlat = args.style === 'flat';
  const showLabel = args['show-label'] === 'true';
  const metricName = args.metric;

  // Metric definitions
  const metricDefs = {
    number_of_specs: {
      status: specCount + ' specs',
      color: specCount > 0 ? 'green' : 'orange'
    },
    number_of_requirements: {
      status: reqCount + ' reqs',
      color: reqCount > 0 ? 'green' : 'orange'
    },
    tasks_status: {
      status: completedTasks + '/' + totalTasks + ' tasks',
      color: totalTasks === 0 ? 'blue' : completedTasks === totalTasks ? 'green' : completedTasks > 0 ? 'orange' : 'red'
    },
    open_changes: {
      status: openChanges + ' changes',
      color: 'blue'
    }
  };

  const def = metricDefs[metricName];

  const svg = badgen({
    subject: showLabel ? 'OpenSpec' : '',
    status: def.status,
    color: def.color,
    style: isFlat ? 'flat' : 'classic',
    icon: iconUri,
    iconWidth: 18
  });

  return svg;
}

// Write badge to file
function writeBadge(svg, outputPath) {
  try {
    // Create directory if needed
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, svg);
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error writing badge to ${outputPath}: ${error.message}`);
    process.exit(1);
  }
}

// Main
function main() {
  const args = parseArgs();
  validateArgs(args);
  const svg = generateBadge(args);
  writeBadge(svg, args.output);
}

main();
