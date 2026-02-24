## Why

Users may want to include the "OpenSpec" text label next to the icon in the badge for better brand recognition and clarity, especially when badges are displayed in contexts where the icon alone might not be immediately recognizable. Providing this as a configurable option allows users to choose based on their needs.

## What Changes

- Add a new boolean configuration input `show_label` (or similar name) to control whether "OpenSpec" text appears in the badge subject
- Update badge generation logic to conditionally include the "OpenSpec" label based on the configuration
- Default behavior: no text label (icon only) to maintain backward compatibility

## Capabilities

### New Capabilities
<!-- No entirely new capabilities -->

### Modified Capabilities
- `action-configuration`: Add new boolean input for controlling badge label visibility
- `badge-generation`: Update badge generation to conditionally show "OpenSpec" text based on configuration

## Impact

- Action inputs in action.yml (new input parameter)
- Badge generation code in action.yml (conditional subject text)
- Input validation logic
- No breaking changes - defaults to current behavior (icon only)
