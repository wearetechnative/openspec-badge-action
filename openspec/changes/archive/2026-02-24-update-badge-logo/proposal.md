## Why

The badge currently uses an outdated or different OpenSpec logo. We need to update it to use the official OpenSpec icon from the main website at https://openspec.dev/_astro/openspec_icon_light.BXKVBxjB.svg to maintain brand consistency.

## What Changes

- Download the official OpenSpec icon from `https://openspec.dev/_astro/openspec_icon_light.BXKVBxjB.svg` and save it to the repository
- Replace the hardcoded pixel-art icon in action.yml with the new official icon
- Verify the badge renders correctly with the new icon

## Capabilities

### New Capabilities
<!-- No new capabilities being introduced -->

### Modified Capabilities
- `badge-generation`: Update the icon/logo source used in SVG badge generation to use the official OpenSpec icon from openspec.dev

## Impact

- Badge generation code in action.yml (inline SVG icon definition)
- New icon file added to the repository
- All generated badges will display with the updated logo
- No breaking changes to the API or configuration
