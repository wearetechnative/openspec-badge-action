const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const SCRIPT_PATH = path.join(__dirname, '..', 'scripts', 'badge-generator.js');
const TEST_OUTPUT_DIR = path.join(__dirname, 'output');

// Helper to execute badge-generator.js
function generateBadge(args) {
  const argString = Object.entries(args)
    .map(([key, value]) => `--${key} ${value}`)
    .join(' ');

  try {
    const output = execSync(`node ${SCRIPT_PATH} ${argString}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message, stderr: error.stderr?.toString() };
  }
}

// Helper to read generated SVG
function readSVG(filename) {
  const filepath = path.join(TEST_OUTPUT_DIR, filename);
  return fs.readFileSync(filepath, 'utf-8');
}

// Setup and teardown
before(() => {
  if (!fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
  }
});

after(() => {
  // Clean up test outputs
  if (fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
  }
});

describe('Badge Generator - Argument Validation', () => {
  it('should error on missing required argument', () => {
    const result = generateBadge({
      'spec-count': '5',
      'req-count': '20',
      // missing metric
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, 'test.svg')
    });

    assert.strictEqual(result.success, false, 'Should fail with missing argument');
  });

  it('should error on invalid metric type', () => {
    const result = generateBadge({
      'metric': 'invalid_metric',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, 'test.svg')
    });

    assert.strictEqual(result.success, false, 'Should fail with invalid metric');
    assert.match(result.stderr || '', /Invalid metric type/, 'Error message should mention invalid metric');
  });

  it('should error on invalid style', () => {
    const result = generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'invalid_style',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, 'test.svg')
    });

    assert.strictEqual(result.success, false, 'Should fail with invalid style');
  });
});

describe('Badge Generator - SVG Validity', () => {
  it('should generate valid SVG XML', () => {
    const filename = 'valid-svg-test.svg';
    const result = generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    assert.strictEqual(result.success, true, 'Should generate badge successfully');

    const svg = readSVG(filename);
    assert.match(svg, /<svg/, 'Should contain SVG tag');
    assert.match(svg, /xmlns/, 'Should have xmlns attribute');
  });

  it('should have required SVG attributes', () => {
    const filename = 'svg-attributes-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /xmlns=/, 'Should have xmlns attribute');
  });
});

describe('Badge Generator - Metric Types', () => {
  it('should generate number_of_specs badge correctly', () => {
    const filename = 'specs-metric-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '7',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /7 specs/, 'Should contain spec count');
  });

  it('should generate number_of_requirements badge correctly', () => {
    const filename = 'reqs-metric-test.svg';
    generateBadge({
      'metric': 'number_of_requirements',
      'spec-count': '5',
      'req-count': '25',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /25 reqs/, 'Should contain requirements count');
  });

  it('should generate tasks_status badge correctly', () => {
    const filename = 'tasks-metric-test.svg';
    generateBadge({
      'metric': 'tasks_status',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /3\/10 tasks/, 'Should contain task ratio');
  });

  it('should generate open_changes badge correctly', () => {
    const filename = 'changes-metric-test.svg';
    generateBadge({
      'metric': 'open_changes',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '2',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /2 changes/, 'Should contain changes count');
  });
});

describe('Badge Generator - Style Variants', () => {
  it('should generate classic style badge', () => {
    const filename = 'classic-style-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    // Classic style typically includes gradients
    assert.match(svg, /<svg/, 'Should be valid SVG');
  });

  it('should generate flat style badge', () => {
    const filename = 'flat-style-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'flat',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /<svg/, 'Should be valid SVG');
  });

  it('should produce different output for classic vs flat', () => {
    const classicFile = 'style-compare-classic.svg';
    const flatFile = 'style-compare-flat.svg';

    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, classicFile)
    });

    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'flat',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, flatFile)
    });

    const classicSVG = readSVG(classicFile);
    const flatSVG = readSVG(flatFile);

    assert.notStrictEqual(classicSVG, flatSVG, 'Classic and flat styles should produce different SVG');
  });
});

describe('Badge Generator - Label Variants', () => {
  it('should include OpenSpec label when show-label is true', () => {
    const filename = 'label-true-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'true',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /OpenSpec/, 'Should contain OpenSpec label');
  });

  it('should omit OpenSpec label when show-label is false', () => {
    const filename = 'label-false-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    // Badge should not have "OpenSpec" as subject text (but may have it in comments/metadata)
    // We check that the text is not in the visible badge content
    const hasLabel = svg.includes('>OpenSpec<');
    assert.strictEqual(hasLabel, false, 'Should not have OpenSpec as visible text');
  });
});

describe('Badge Generator - Color Coding', () => {
  it('should use green for positive spec count', () => {
    const filename = 'color-green-specs-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    // Badgen uses color names or hex codes
    assert.match(svg, /#(4c1|3C1|5CB85C|2ea44f|2cbe4e)/i, 'Should use green color');
  });

  it('should use orange for zero spec count', () => {
    const filename = 'color-orange-specs-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '0',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    // Orange color in badgen (F73 is #FF7733)
    assert.match(svg, /#(F60|FE7D37|f90|fe7d37|F73|f73)/i, 'Should use orange color');
  });

  it('should use green for all tasks complete', () => {
    const filename = 'color-green-tasks-test.svg';
    generateBadge({
      'metric': 'tasks_status',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '10',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /#(4c1|3C1|5CB85C|2ea44f|2cbe4e)/i, 'Should use green color for completed tasks');
  });

  it('should use orange for partial tasks complete', () => {
    const filename = 'color-orange-tasks-test.svg';
    generateBadge({
      'metric': 'tasks_status',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /#(F60|FE7D37|f90|fe7d37|F73|f73)/i, 'Should use orange color for partial completion');
  });

  it('should use red for no tasks complete', () => {
    const filename = 'color-red-tasks-test.svg';
    generateBadge({
      'metric': 'tasks_status',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '0',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /#(E05D44|e05d44|d73a4a|cb2431|E43|e43)/i, 'Should use red color for no completion');
  });

  it('should use blue for zero total tasks', () => {
    const filename = 'color-blue-tasks-test.svg';
    generateBadge({
      'metric': 'tasks_status',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '0',
      'total-tasks': '0',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /#(007EC6|007ec6|0969da|1f6feb|08C|08c)/i, 'Should use blue color for zero tasks');
  });

  it('should use blue for open changes', () => {
    const filename = 'color-blue-changes-test.svg';
    generateBadge({
      'metric': 'open_changes',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '2',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /#(007EC6|007ec6|0969da|1f6feb|08C|08c)/i, 'Should use blue color');
  });
});

describe('Badge Generator - Icon Embedding', () => {
  it('should embed icon data URI', () => {
    const filename = 'icon-embed-test.svg';
    generateBadge({
      'metric': 'number_of_specs',
      'spec-count': '5',
      'req-count': '20',
      'open-changes': '1',
      'completed-tasks': '3',
      'total-tasks': '10',
      'style': 'classic',
      'show-label': 'false',
      'output': path.join(TEST_OUTPUT_DIR, filename)
    });

    const svg = readSVG(filename);
    assert.match(svg, /data:image\/svg\+xml;base64,/, 'Should contain base64 icon data URI');
  });
});
