# Requirements Document

## Introduction

This feature adds a circular progress visualization component to the Plan/StartSessionCard to display user session completion progress in an engaging, visual format. The component will show completed sessions out of total sessions with animated progress indication.

## Glossary

- **StartSessionCard**: The UI component in the Plan dashboard that displays session-related information
- **Circular Progress Component**: A circular SVG-based progress indicator showing completion percentage
- **Session Progress**: The ratio of completed sessions to total planned sessions
- **Progress Animation**: Smooth visual transition when progress values change

## Requirements

### Requirement 1

**User Story:** As a user viewing my Plan dashboard, I want to see my session progress in a circular progress indicator, so that I can quickly understand my completion status visually.

#### Acceptance Criteria

1. WHEN the StartSessionCard loads, THE Circular Progress Component SHALL display the current session completion ratio
2. THE Circular Progress Component SHALL show completed sessions over total sessions as a fraction (e.g., "4/10")
3. THE Circular Progress Component SHALL use a circular SVG with a progress arc that fills based on completion percentage
4. THE Circular Progress Component SHALL use the brand color #AD85D1 for the progress arc
5. THE Circular Progress Component SHALL display "Complete sessions" as descriptive text below the fraction

### Requirement 2

**User Story:** As a user, I want the progress circle to be visually appealing and consistent with the app design, so that it feels integrated with the overall interface.

#### Acceptance Criteria

1. THE Circular Progress Component SHALL have a 192px (w-48 h-48) diameter
2. THE Circular Progress Component SHALL use a gray background circle (#e5e7eb) with 8px stroke width
3. THE Circular Progress Component SHALL use rounded line caps for the progress arc
4. THE Circular Progress Component SHALL center the progress text within the circle
5. THE Circular Progress Component SHALL use a 3xl font size for the fraction and sm font size for the label

### Requirement 3

**User Story:** As a user, I want smooth animations when my progress updates, so that changes feel responsive and engaging.

#### Acceptance Criteria

1. WHEN progress values change, THE Circular Progress Component SHALL animate the arc transition over 500ms
2. THE Circular Progress Component SHALL use ease-out timing for smooth animation
3. THE Circular Progress Component SHALL maintain visual consistency during animation transitions
