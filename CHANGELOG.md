# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
      {steps.map((step, idx) => (
        <Stepper.Step title={step.title} description={step.description} index={idx} />
      ))}
      {steps.map((step, idx) => (
        <Stepper.Content>{step.content}</Stepper.Content>
      ))}
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
