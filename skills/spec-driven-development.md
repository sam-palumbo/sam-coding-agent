# Skill: Spec-Driven Development (Requirements-First)

## Overview
Document requirements and design before implementation to reduce rework, ensure alignment, and create testable specifications.

## When to Use
- New features with clear business needs
- Projects requiring documentation or stakeholder alignment
- Features with compliance or formal testing requirements

## Workflow

**Requirements-First: What → How**

Business needs → Technical solution

1. Document requirements (user stories, acceptance criteria)
2. Detail requirements through Q&A (edge cases, boundaries, errors)
3. Create technical design
4. Define correctness properties and test strategy
5. Generate task list (implementation + tests)
6. Execute tasks

## Document Structure

### requirements.md
- Introduction and glossary
- User stories: "As a [role], I want [feature], so that [benefit]"
- Acceptance criteria (EARS format: WHEN, IF, THEN, THE, SHALL)
- Correctness properties for testing
- Edge cases and error conditions
- Non-functional requirements

### design.md
- Architecture and components
- Algorithms and pseudocode
- Technology choices
- Testing strategy (unit, integration, property-based)
- Test coverage requirements
- Migration/deployment plan

### tasks.md
- Task dependency graph
- Numbered tasks with acceptance criteria
- Each task includes implementation + tests
- Subtasks for implementation steps

## Requirements Detailing

After drafting requirements, analyze each one systematically:

**Questions to ask:**
- What are the edge cases and boundaries?
- What assumptions are implicit?
- What error conditions exist?
- How is success/failure determined?

**EARS Format (Easy Approach to Requirements Syntax):**

EARS provides structured templates for writing clear, testable requirements:

- **Event-Driven:** WHEN [trigger] **THE** [system] **SHALL** [action]
  - Example: WHEN user clicks submit, THE system SHALL validate all fields

- **Conditional:** IF [condition] **THEN THE** [system] **SHALL** [action]
  - Example: IF password is less than 8 characters, THEN THE system SHALL display error

- **State-Based:** WHILE [state] **THE** [system] **SHALL** [action]
  - Example: WHILE processing payment, THE system SHALL display loading indicator

- **Feature-Specific:** WHERE [feature exists] **THE** [system] **SHALL** [action]
  - Example: WHERE user has admin role, THE system SHALL display admin panel

- **Unconditional:** THE [system] **SHALL** [action]
  - Example: THE system SHALL log all authentication attempts

**Example:**

Before:
```
- Form validates input
- Form submits successfully
```

After (using EARS):
```
- WHEN user submits with valid data, THE system SHALL accept within 2 seconds
- IF required field is empty, THE system SHALL display field-specific error
- IF network fails, THE system SHALL retry up to 3 times with exponential backoff
- WHEN submission succeeds, THE system SHALL display confirmation and clear form
- THE system SHALL prevent duplicate submissions during processing
```

## Property-Based Testing

Define formal correctness properties that must always hold:

1. Specify invariants and behaviors
2. Encode as executable tests
3. Use PBT frameworks to generate edge cases
4. Verify implementation satisfies properties

**Example:**
```
Property: "User balance never goes negative"
∀ transaction: balance_after(transaction) ≥ 0
```

## Test Coverage Requirements

**Every task must include tests:**
- Unit tests for individual functions
- Integration tests for component interactions
- Property-based tests for correctness properties
- Edge case tests from requirements detailing

**Definition of Done for each task:**
1. Implementation complete
2. All tests written and passing
3. Edge cases covered
4. Property tests passing (if applicable)
5. Code reviewed
6. Documentation updated

**Test Maintenance:**
- When requirements change, update tests first
- When bugs are found, add regression tests
- Keep tests in sync with implementation
- Review test coverage regularly

## File Organization

```
specs/{feature-name}/
├── requirements.md
├── design.md
└── tasks.md
```

## Best Practices

**Requirements:**
- Use EARS format (WHEN, IF, THEN, THE, SHALL)
- Detail each requirement through Q&A
- Define correctness properties early
- Document all edge cases and error conditions

**Design:**
- Start with high-level architecture
- Document decisions and tradeoffs
- Specify testing strategy with coverage targets
- Define test cases for each component

**Execution:**
- Follow task dependency order
- Write tests before or alongside implementation
- All tests must pass before marking task complete
- Run full test suite after each task
- Commit implementation + tests together
- Maintain minimum test coverage threshold (e.g., 80%)

## Execution

1. Create `specs/{feature-name}/`
2. Draft requirements.md
3. Detail requirements through Q&A
4. Get stakeholder approval
5. Create design.md
6. Generate tasks.md
7. Execute tasks incrementally

**Updates:**
- Update dependent documents when requirements or design changes
- Maintain consistency across all documents

## Common Pitfalls

**Avoid:**
- Vague acceptance criteria
- Skipping requirements detailing
- Starting implementation before design approval
- Writing code without tests
- Skipping edge case tests
- Not maintaining tests when requirements change

**Do:**
- Make criteria testable and precise
- Define properties for critical behaviors
- Write tests for every task
- Test all edge cases from requirements
- Update tests when code changes
- Review test coverage regularly

