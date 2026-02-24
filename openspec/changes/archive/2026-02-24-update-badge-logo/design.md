## Context

The badge generation currently uses a hardcoded pixel-art OpenSpec logo embedded as inline SVG in the action.yml file (line 116). We need to update this to use the official OpenSpec icon from https://openspec.dev/_astro/openspec_icon_light.BXKVBxjB.svg.

## Goals / Non-Goals

**Goals:**
- Download and save the official OpenSpec icon from openspec.dev to the repository
- Replace the inline SVG icon in action.yml with the new official icon
- Maintain the existing badge generation workflow and API
- Ensure badges render correctly with the new icon

**Non-Goals:**
- Changing the badge generation logic or badgen library integration
- Modifying the badge styles, colors, or metrics
- Adding dynamic icon fetching or any runtime scripting logic

## Decisions

### Decision: Download icon and save to repository

**Rationale**: Download the SVG from https://openspec.dev/_astro/openspec_icon_light.BXKVBxjB.svg and save it as a file in the repository. This makes the icon source explicit and easier to update in the future.

**Alternatives considered**:
1. Fetch the icon dynamically at runtime - Adds network dependency and latency to every badge generation
2. Keep it only hardcoded inline in action.yml - Makes it harder to track icon source and update
3. Save to repository and reference in code - Chosen approach, provides clear provenance and easier maintenance

### Decision: Hardcode the SVG inline in action.yml

**Rationale**: The badge generation code uses a hardcoded inline SVG converted to a base64 data URI. We'll replace the existing pixel-art SVG with the content from the downloaded file. This maintains the current pattern of no runtime dependencies while using the official icon.

**Alternatives considered**:
1. Read the SVG file at runtime - Not practical in composite GitHub Actions
2. Use the existing inline pattern - Chosen approach, maintains zero runtime dependencies

## Risks / Trade-offs

**[Trade-off]** Icon won't auto-update if changed on openspec.dev → Acceptable, as this maintains the current hardcoded pattern and avoids runtime dependencies. Can be manually updated if icon changes in the future.
