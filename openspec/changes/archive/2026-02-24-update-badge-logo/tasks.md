## 1. Download and prepare new icon

- [x] 1.1 Download the SVG icon from https://openspec.dev/_astro/openspec_icon_light.BXKVBxjB.svg
- [x] 1.2 Save the icon to an appropriate location in the repository (e.g., `assets/` or `icons/` directory)

## 2. Update badge generation code

- [x] 2.1 Read the downloaded SVG file content
- [x] 2.2 Replace the hardcoded pixel-art SVG icon in action.yml (line 116) with the new icon
- [x] 2.3 Ensure the SVG is properly converted to base64 data URI format

## 3. Testing and validation

- [x] 3.1 Test badge generation locally or in test workflow to verify new icon displays correctly
- [x] 3.2 Verify badge rendering with both classic and flat styles
- [x] 3.3 Verify all metric types still generate correctly with new icon
