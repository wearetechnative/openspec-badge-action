## 1. Add configuration input

- [x] 1.1 Add `show_label` boolean input to action.yml inputs section with default value false
- [x] 1.2 Add input validation in the "Validate inputs" step to handle show_label parameter
- [x] 1.3 Pass show_label value to the badge generation step via environment variable or step output

## 2. Update badge generation logic

- [x] 2.1 Read the show_label configuration in the Node.js badge generation code
- [x] 2.2 Update the badgen call to conditionally set subject to "OpenSpec" when show_label is true, or "" when false
- [x] 2.3 Verify the subject parameter correctly affects badge rendering

## 3. Testing and validation

- [x] 3.1 Test badge generation with show_label: true to verify "OpenSpec" text appears
- [x] 3.2 Test badge generation with show_label: false to verify icon-only behavior
- [x] 3.3 Test badge generation without show_label input to verify default (icon-only) behavior
- [x] 3.4 Verify behavior works with both classic and flat badge styles
