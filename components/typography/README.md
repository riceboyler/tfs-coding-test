# Typography Components Test Suite

## Overview

This directory contains typography components (H1, H2) with comprehensive test coverage and shared test utilities.

## Test Files

### Component Tests

- **[H1.spec.ts](./H1.spec.ts)** - 40 tests for H1 component (100% passing)
- **[H2.spec.ts](./H2.spec.ts)** - 40 tests for H2 component (100% passing)

### Shared Utilities

- **[test-utils.ts](./test-utils.ts)** - Common mocks, types, and test constants

## Shared Test Utilities

The `test-utils.ts` file provides:

### Type Definitions

```typescript
interface TypographyProps {
  color?: string;
}

interface TypographyComponentVM {
  $props: TypographyProps;
}
```

### Mock Function

```typescript
mockStyledSystemBox(); // Mocks the Box component from styled-system/jsx
```

### Test Constants

**TEST_COLORS** - Common color values:

- `default`: 'var(--black)'
- `red`, `blue`, `green`: Named colors
- `hex`: '#FF5733'
- `rgb`: 'rgb(255, 87, 51)'
- `rgba`: 'rgba(255, 87, 51, 0.5)'
- `hsl`: 'hsl(120, 100%, 50%)'
- `variable`: 'var(--primary-color)'
- `currentColor`: 'currentColor'
- `transparent`: 'transparent'

**TEST_CONTENT** - Common test strings:

- `simple`: 'Test Heading'
- `multiWord`: 'Hello World Test'
- `withSpaces`: ' Heading with spaces '
- `special`: '<>&"\'!@#$%^&\*()'
- `unicode`: '你好世界 🌍'
- `multiline`: 'Line 1\nLine 2\nLine 3'
- `numeric`: '123456'
- `long`: 'A'.repeat(10000)
- `nested`: '<span>Nested Content</span>'

## Test Coverage

Both H1 and H2 components have identical test coverage across 10 test categories:

### 1. Element Rendering (3 tests)

- Renders as correct heading element (h1/h2)
- Correct tag name
- Valid HTMLHeadingElement instance

### 2. Slot Content (5 tests)

- Renders slot content
- Empty when no content
- Multiple text nodes
- HTML elements in slots
- Whitespace handling

### 3. Color Prop - Default Value (3 tests)

- Uses `var(--black)` by default
- Applies default color
- Handles undefined prop

### 4. Color Prop - Custom Values (9 tests)

- Custom colors
- CSS variables
- Hex, RGB, RGBA, HSL values
- Named colors
- Special keywords (currentColor, transparent)

### 5. Color Prop - Updates (3 tests)

- Updates on prop change
- Reverts to default
- Multiple changes

### 6. Props Validation (3 tests)

- String type
- Optional (not required)
- Empty string handling

### 7. Box Component Integration (3 tests)

- Passes correct `as` prop
- Passes color prop
- Renders slot content

### 8. Edge Cases (5 tests)

- Very long text (10,000 chars)
- Special characters
- Unicode & emojis
- Line breaks
- Numeric content

### 9. Component Structure (3 tests)

- Single root element
- No extra wrappers
- Renders without errors

### 10. Accessibility (3 tests)

- Semantically correct
- Maintains heading structure
- Screen reader compatible

## Running Tests

```bash
# Run all typography tests
bun test:run typography/

# Run specific component test
bun test:run H1.spec.ts
bun test:run H2.spec.ts

# Watch mode
bun test typography/

# With UI
bun test:ui
```

## Test Results

```
✓ H1.spec.ts (40 tests) - 100% passing
✓ H2.spec.ts (40 tests) - 100% passing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 80 tests, 0 failures
```

## Benefits of Shared Utilities

1. **DRY Principle**: Common test setup is defined once
2. **Consistency**: Both components use identical test patterns
3. **Maintainability**: Changes to mocks/constants only need one update
4. **Type Safety**: No `any` types, fully typed interfaces
5. **Readability**: Named constants make tests self-documenting
6. **Scalability**: Easy to add H3, H4, H5, H6 with same utilities

## Adding New Typography Components

To add a new heading component (e.g., H3):

1. Create the component: `H3.vue`
2. Create test file: `H3.spec.ts`
3. Import shared utilities:
   ```typescript
   import {
     mockStyledSystemBox,
     TypographyComponentVM,
     TEST_COLORS,
     TEST_CONTENT,
   } from "./test-utils";
   ```
4. Use the same test structure as H1/H2
5. Replace h1/h2 references with h3

The shared utilities ensure consistent testing patterns across all typography components.
