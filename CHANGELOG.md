# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-02-11

### Added
- **Form Integration**: Full compatibility with `react-hook-form` and other form libraries for `Select`, `Radio`, `Checkbox`, and `Switch`.
  - Seamless support for both controlled and uncontrolled modes (using `register` or `Controller`).
  - Correct ref forwarding to underlying form elements.
  - Standardized event handling (`onChange`, `onBlur`, `name`) for all form components.

### Fixed
- **Select**: Resolved `react-hooks/rules-of-hooks` violation, fixed `type="button"` attribute, and improved TypeScript strictness.
- **Ref Handling**: Replaced deprecated `React.MutableRefObject` usage with safe generic ref assignments across form components.
- **Switch**: Fixed state synchronization logic for uncontrolled usage.
- **Radio**: `RadioGroup` now properly forwards standard HTML div attributes.

### Changed
- Refactored `Select`, `Checkbox`, `Radio`, `Switch` to ensure consistent API behavior for form integration.

---

## [1.2.0] - 2026-02-11

### Changed - BREAKING CHANGE

#### Stepper Component
- **Removed Legacy Validation Props**: Removed `validate`, `isValid`, and `errorMessage` props from `Stepper.Content`.
  - **Migration**: Use the `onStepValidate` callback on the main `Stepper` component instead.
- **Cleanup**: Simplification of internal component logic by removing "Strategy 2" validation fallback.

### Updated
- **Stories**: Updated `TemplateValidation` story to use the modern `onStepValidate` pattern instead of removed props.

---

## [1.1.0] - 2026-02-11

### Added

#### Stepper Component
- **Custom Validation Callback (`onStepValidate`)**: New callback function that executes before advancing to the next step
  - Supports both synchronous and asynchronous validation
  - Returns `StepValidationResult` with `isValid` and optional `errorMessage`
  - Blocks step advancement when validation fails
  - Displays custom error messages with visual feedback (red X icon)
  - Automatically clears errors when validation succeeds
- **Comprehensive Documentation**: Added detailed README.md for Stepper component
  - Usage examples for basic implementation
  - Validation flow documentation
  - Async validation examples
  - Props table with detailed descriptions
  - Testing guidelines

### Changed

#### Stepper Component - BREAKING CHANGE
- **Refactored to Children Composition Pattern**: Removed redundant `steps` prop in favor of React-idiomatic children composition
  - **Migration Guide**:
    ```tsx
    // Before (v1.0.x)
    <Stepper steps={steps}>
      ...
    </Stepper>

    // After (v1.1.0)
    <Stepper orientation="horizontal" variant="bordered">
      <Stepper.Step title="Step 1" description="Description 1" index={0} />
      <Stepper.Step title="Step 2" description="Description 2" index={1} />
      
      <Stepper.Content>
        {/* Step 1 content */}
      </Stepper.Content>
      <Stepper.Content>
        {/* Step 2 content */}
      </Stepper.Content>
      
      <Stepper.CompletedContent>
        {/* Completion content */}
      </Stepper.CompletedContent>
    </Stepper>
    ```
- **Dynamic Step Calculation**: `totalSteps` is now calculated automatically from children instead of from `steps` array
- **Simplified API**: Removed `StepperStep[]` prop requirement, making the component more flexible and easier to use

### Fixed

#### Stepper Component
- **Styling Improvements**:
  - Adjusted step indicator size from `var(--size-xl)` to `calc(var(--size-lg) + 2px)` for better visual consistency
  - Added margin reset (`margin: var(--spacing-none)`) for step titles and descriptions to prevent layout issues
- **TypeScript Types**: Improved type safety with proper type assertions for step props

### Updated

#### Stories
- Refactored all Stepper stories to use new children composition pattern
- Added new `WithCustomValidation` story demonstrating async validation
- Updated examples: `Horizontal`, `Vertical`, `Validation`, `WithCustomIcons`

---

## [1.0.3] - 2026-02-06

### Added
- **DatePicker**: Improved modal stability and behavior

### Changed
- **Button**: New `darkened` variant
- **Avatar**: Dynamic border colors
- **Theme**: Dark mode color improvements

### Fixed
- **DatePicker**: Fixed modal closing prematurely in certain scenarios

---

## [1.0.2] - 2026-01-30

### Added
- Initial stable release
- Core components: Button, Input, Select, Checkbox, Radio, Switch, Dialog, Drawer, Notification, Table, Card, Tabs, Slider, Avatar, Progress, Skeleton
- Theme system with CSS variables
- Dark mode support
- TypeScript support
- Storybook documentation

---

## Legend

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes
