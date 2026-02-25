## 1. Setup

- [x] 1.1 Create examples/badges/ directory for storing generated showcase badges
- [x] 1.2 Install badgen dependency locally if not present (npm install badgen)

## 2. Implement gen_all_badges in RUNME.sh

- [x] 2.1 Add dependency check for OpenSpec CLI and display error if missing
- [x] 2.2 Add dependency check for Node.js and badgen, display error if missing
- [x] 2.3 Collect OpenSpec metrics (specs, requirements, tasks, changes) using openspec CLI
- [x] 2.4 Implement badge generation loop for all 16 combinations (4 metrics × 2 styles × 2 label states)
- [x] 2.5 Use Node.js with badgen library to generate SVG files (reusing logic from action.yml:125-176)
- [x] 2.6 Save generated badges to examples/badges/ with descriptive filenames (e.g., specs_classic_labeled.svg, specs_flat_unlabeled.svg)

## 3. Add badge showcase table to README

- [x] 3.1 Add "Badge Showcase" or "Available Badge Variants" section header in README.md
- [x] 3.2 Create markdown table with columns: Metric Type, Classic Style (unlabeled), Classic Style (labeled), Flat Style (unlabeled), Flat Style (labeled)
- [x] 3.3 Add table rows for each metric type (specs, requirements, tasks, changes) with embedded badge images
- [x] 3.4 Use relative paths to examples/badges/ directory for badge image URLs

## 4. Verification

- [x] 4.1 Run ./RUNME.sh gen_all_badges and verify all 16 badge files are generated
- [x] 4.2 Verify README badge showcase table displays correctly in local markdown viewer
- [x] 4.3 Verify badge images show visual differences between styles and label options
