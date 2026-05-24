# Skill: Spec-Driven Development (Requirements-First)

## Overview
Document requirements and design before implementation to reduce rework, ensure alignment, and create testable specifications.

## When to Use
- New features with clear business needs
- Projects requiring documentation or stakeholder alignment
- Features with compliance or formal testing requirements

## Automation Instructions

When the user provides a feature request, automatically:

1. **Extract User Stories**: Convert the request into structured user stories using the format:
   - "As a [role], I want [feature], so that [benefit]"
   - Identify all user roles and their goals
   - Create separate stories for each distinct capability

2. **Generate EARS Acceptance Criteria**: For each user story, create acceptance criteria using EARS format:
   - **Event-Driven (WHEN)**: For user actions and triggers
   - **Conditional (IF)**: For validation and error handling
   - **State-Based (WHILE)**: For ongoing behaviors during a state
   - **Feature-Specific (WHERE)**: For role/permission-based features
   - **Unconditional (THE...SHALL)**: For always-active requirements

3. **Identify Edge Cases**: Proactively ask about:
   - Boundary conditions (empty, zero, max values)
   - Error scenarios (network failures, invalid input)
   - Concurrent operations
   - Performance constraints

4. **Define Correctness Properties**: Extract invariants that must always hold:
   - Data integrity rules
   - Business logic constraints
   - Security requirements

5. **Create requirements.md**: Generate the structured document with all extracted information

6. **Iterate**: Present the draft and refine based on user feedback before proceeding to design

## Decision-Making Guidelines

**When to Ask vs. When to Infer:**

**Ask when:**
- Business logic is ambiguous (e.g., "What happens if payment fails during checkout?")
- Multiple valid approaches exist (e.g., "Should we retry automatically or require user action?")
- Security or compliance implications (e.g., "What data retention policy applies?")
- User experience decisions (e.g., "Should this be a modal or a new page?")
- Performance requirements are unclear (e.g., "What's the acceptable response time?")

**Infer when:**
- Industry standard practices apply (e.g., password requirements, HTTP status codes)
- Technical implementation details (e.g., database schema, API structure)
- Common error handling patterns (e.g., validation messages, network retries)
- Obvious edge cases (e.g., empty lists, null values, zero amounts)

**How to Ask Questions:**

When asking questions (for ambiguity, clarification, or requirements detailing):

1. **State the question clearly**: What needs to be decided
2. **Provide context**: Why it matters for the implementation
3. **Offer options**: Present 2-3 concrete alternatives with tradeoffs, ordered from most recommended to least
4. **Label recommendation**: Mark the recommended option with "(Recommended)"
5. **Wait for decision**: Proceed only after user chooses

**Implementation Note:** Use interactive prompts or structured choice mechanisms when available (e.g., numbered options, selection menus) to make it easy for users to respond.

**Example:**
```
Question: "Should users be able to change their email address?"

Context: This affects:
- Authentication (email is login credential)
- Verification (need to re-verify new email)
- Security (potential account takeover vector)

Options (ordered from most to least recommended):
1. (Recommended) Allow with re-verification - Industry standard, balances flexibility and security
2. Allow via support ticket only - Balanced approach, slower for users
3. Disallow email changes - Simplest implementation, least flexible
```

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
- Non-functional requirements (optional, see template below)

**(Optional) Non-Functional Requirements Template:**
- **Performance:** Response time, throughput, resource usage
- **Security:** Authentication, authorization, data protection, audit logging
- **Scalability:** Concurrent users, data volume, growth projections
- **Reliability:** Uptime, error rates, recovery time
- **Accessibility:** WCAG compliance level, keyboard navigation, screen reader support
- **Maintainability:** Code quality standards, documentation requirements
- **Compatibility:** Browsers, devices, operating systems, API versions

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

After drafting requirements, analyze each one systematically through an iterative Q&A process:

**Detailing Loop (for each requirement):**

1. **Parse**: Extract the requirement statement
2. **Analyze**: Identify gaps using these questions:
   - What are the edge cases and boundaries?
   - What assumptions are implicit?
   - What error conditions exist?
   - How is success/failure determined?
3. **Question**: Ask user about identified gaps (batch related questions together)
4. **Refine**: Update acceptance criteria with answers
5. **Verify**: Confirm the refined requirement is complete and testable
6. **Repeat**: Move to next requirement

**Batching Strategy:**
- Group related questions together (e.g., all validation questions, all error handling)
- Avoid asking one question at a time (inefficient)
- Present 3-5 questions per batch
- Prioritize critical ambiguities first

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

**Common PBT Frameworks:**
- JavaScript/TypeScript: fast-check
- Python: Hypothesis
- Java: jqwik
- Rust: proptest
- Haskell: QuickCheck

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

## Change Management

**When Requirements Change Mid-Implementation:**

1. **Assess Impact:**
   - Which tasks are affected (completed, in-progress, not-started)?
   - Does the design need updates?
   - Are there new edge cases or correctness properties?

2. **Update Documents:**
   - Update requirements.md with changes (mark with version/date if needed)
   - Update design.md if architecture or approach changes
   - Regenerate tasks.md for affected areas

3. **Handle In-Progress Work:**
   - **Completed tasks**: Leave as-is unless change invalidates them
   - **In-progress tasks**: Pause, reassess, update acceptance criteria
   - **Not-started tasks**: Update before starting

4. **Communicate Changes:**
   - Document what changed and why
   - Notify stakeholders of impact (timeline, scope)
   - Get approval for significant changes

5. **Update Tests:**
   - Modify existing tests to reflect new requirements
   - Add new tests for new functionality
   - Remove tests for removed functionality

**Change Categories:**

- **Minor (proceed immediately)**: Clarifications, small refinements, bug fixes
- **Moderate (update and continue)**: New edge cases, modified acceptance criteria, additional validation
- **Major (pause and replan)**: New features, changed architecture, different approach

**Example:**
```
Change: "Users should be able to filter by date range, not just single date"

Impact:
- Requirements: Update acceptance criteria for filtering
- Design: Modify API to accept start/end dates
- Tasks: Update "Implement date filter" task
- Tests: Update filter tests with range scenarios

Action: Moderate change - update documents and continue
```

## Review Checkpoints

**After Requirements Phase:**
- [ ] All user stories follow "As a [role], I want [feature], so that [benefit]" format
- [ ] All acceptance criteria use EARS format
- [ ] Edge cases and error conditions documented
- [ ] Correctness properties defined
- [ ] Non-functional requirements specified (if applicable)
- [ ] Stakeholders have reviewed and approved

**After Design Phase:**
- [ ] Architecture addresses all requirements
- [ ] Technology choices justified
- [ ] Testing strategy defined with coverage targets
- [ ] Migration/deployment plan documented
- [ ] Design reviewed by technical lead

**After Tasks Phase:**
- [ ] Task dependency graph is clear and correct
- [ ] Each task includes implementation + tests
- [ ] Tasks are appropriately sized (1-4 hours each)
- [ ] Acceptance criteria defined for each task

**After Each Task:**
- [ ] Implementation complete
- [ ] All tests written and passing
- [ ] Edge cases covered
- [ ] Property tests passing (if applicable)
- [ ] Code reviewed
- [ ] Documentation updated

## Common Pitfalls

**Avoid:**
- Vague acceptance criteria
- Skipping requirements detailing
- Starting implementation before design approval
- Writing code without tests
- Not maintaining tests when requirements change

**Do:**
- Make criteria testable and precise
- Write tests for every task
- Test all edge cases from requirements
- Update tests when code changes

