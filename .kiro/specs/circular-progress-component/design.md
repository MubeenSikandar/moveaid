# Design Document

## Overview

The circular progress component will be integrated into the existing StartSessionCard component at line 39, replacing the placeholder comment. It will use SVG for crisp rendering and CSS transitions for smooth animations. The component will be self-contained and reusable.

## Architecture

The implementation will follow a component-based approach:

- Integrate directly into the existing StartSessionCard component
- Use inline SVG for the circular progress visualization
- Leverage Tailwind CSS classes for styling and animations
- Calculate progress percentage from completed/total sessions ratio

## Components and Interfaces

### StartSessionCard Enhancement

- **Location**: `components/Dashboard/Plan/StartSessionCard.tsx/index.tsx`
- **Integration Point**: Line 39 (replacing the circular progress bar comment)
- **Props**: Will use existing session data (completedSessions, totalSessions)

### Progress Calculation

```typescript
const progressPercentage = (completedSessions / totalSessions) * 100;
const circumference = 2 * Math.PI * 40; // radius = 40
const strokeDashoffset = circumference * (1 - progressPercentage / 100);
```

### SVG Structure

- **Container**: 192x192px (w-48 h-48) SVG element
- **Background Circle**: Full circle with gray stroke (#e5e7eb)
- **Progress Arc**: Partial circle with brand color (#AD85D1)
- **Transform**: -90 degree rotation to start progress from top

## Data Models

### Session Progress Data

```typescript
interface SessionProgress {
  completedSessions: number;
  totalSessions: number;
  progressPercentage: number; // calculated
}
```

### Visual Properties

```typescript
interface CircularProgressStyles {
  size: 192; // pixels
  strokeWidth: 8; // pixels
  radius: 40; // pixels
  backgroundColor: "#e5e7eb";
  progressColor: "#AD85D1";
  animationDuration: "500ms";
  animationEasing: "ease-out";
}
```

## Error Handling

### Division by Zero Protection

- If totalSessions is 0, display 0/0 and 0% progress
- Prevent NaN values in calculations

### Invalid Data Handling

- Ensure completedSessions doesn't exceed totalSessions
- Default to 0 for negative values
- Handle undefined/null session data gracefully

## Testing Strategy

### Visual Testing

- Verify circle renders correctly at different progress percentages (0%, 25%, 50%, 75%, 100%)
- Test animation smoothness when progress values change
- Confirm proper centering of text within circle

### Integration Testing

- Ensure component integrates properly with existing StartSessionCard
- Verify no layout disruption to surrounding elements
- Test responsive behavior if needed

### Edge Cases

- Test with 0 total sessions
- Test with completed sessions exceeding total
- Test with very large numbers
- Test animation performance with rapid value changes
