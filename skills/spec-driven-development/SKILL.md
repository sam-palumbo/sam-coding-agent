---
name: spec-driven-development
description: Use when starting a new feature with clear business needs, when stakeholder alignment or formal documentation is required, or when a feature carries compliance or formal testing obligations
---

# Spec-Driven Development

## When to Use
- New features with clear business needs
- Projects requiring stakeholder alignment or documentation
- Features with compliance or formal testing requirements

**Skip when:** trivial bug fixes, exploratory prototypes, spec exceeds implementation effort

## Workflow
1. Create `specs/{feature-name}/`
2. Draft `requirements.md` (user stories + EARS acceptance criteria)
3. Detail requirements through Q&A (batch 3–5 questions)
4. Get stakeholder approval
5. Draft `design.md` (architecture, algorithms, test strategy, deployment)
6. Generate `tasks.md` (numbered, dependency graph, each task = impl + tests)
7. Execute tasks in dependency order

When requirements change mid-implementation → [change management](./change-management.md)

## Automation
When user provides a feature request, MUST:

1. **Extract user stories** — "As a [role], I want [feature], so that [benefit]". Identify ALL roles. One story per capability.

2. **Generate EARS acceptance criteria** — Per story using templates below.

3. **Identify edge cases** — Ask about boundaries (empty/zero/max), errors (network/invalid), concurrency, performance.

4. **Define correctness properties** — Invariants that MUST hold: data integrity, business logic, security.

5. **Create `requirements.md`** — Introduction/glossary, user stories, EARS criteria, edge cases, correctness properties, NFRs.

6. **Iterate** — Present draft, refine, get explicit approval before design.

**Validation before moving to design:**
- [ ] All user stories follow correct format
- [ ] All acceptance criteria use EARS templates
- [ ] Edge cases documented per requirement
- [ ] At least one correctness property defined
- [ ] User has explicitly approved

## EARS Format
| Type | Template | Example |
|------|----------|---------|
| Event-Driven | WHEN [trigger] THE [system] SHALL [action] | WHEN user clicks submit, THE system SHALL validate all fields |
| Conditional | IF [condition] THEN THE [system] SHALL [action] | IF password < 8 chars, THE system SHALL display error |
| State-Based | WHILE [state] THE [system] SHALL [action] | WHILE processing payment, THE system SHALL show loading |
| Feature-Specific | WHERE [feature] THE [system] SHALL [action] | WHERE user has admin role, THE system SHALL show admin panel |
| Unconditional | THE [system] SHALL [action] | THE system SHALL log all auth attempts |

### Detailing Loop
For each requirement: Parse → Analyze (edge cases, assumptions, errors, success/failure) → Question user → Refine → Verify (testable, complete). Repeat.

**Complete when:** EARS format used, all edge cases identified, error conditions specified, success/failure clear, testable.

### Property-Based Testing
- Identify invariants: `∀ input: condition(output) = true`
- Encode as executable PBT test
- Use for: data integrity, business rules, security properties, math properties

## Asking Questions

**Decision tree:**
```
Clear & unambiguous?
├─ NO → Ask user
└─ YES → Inferrable from standards?
    ├─ YES → Infer, document assumption
    └─ NO → Ask user
```

**Ask when:** ambiguous business logic, multiple valid approaches, security/compliance, UX decisions, unclear performance needs.

**Infer when:** industry standards, technical details (schema, API), common error patterns, obvious edge cases (empty, null, zero).

**How to ask:** State question → Context → Options (2–3, ordered most→least recommended, label top "(Recommended)") → Wait for choice.

**Batching:**
- Group related questions
- Present 3–5 per batch
- Prioritize critical ambiguities first
- NEVER ask one at a time

## Document Structure
```
specs/{feature-name}/
├── requirements.md   # User stories + EARS criteria + edge cases + properties + NFRs
├── design.md         # Architecture + algorithms + tech choices + test strategy + deployment
└── tasks.md          # Dependency graph + numbered tasks (impl + tests per task)
```

## Test Coverage
Every task ships with: unit tests, integration tests, property-based tests (invariants), edge-case tests.

## Review Checklists

### After Requirements
- [ ] All stories follow `As a [role], I want [feature], so that [benefit]`
- [ ] All acceptance criteria use EARS format
- [ ] Edge cases and error conditions documented
- [ ] Correctness properties defined
- [ ] NFRs specified (if applicable)
- [ ] Stakeholders approved

### After Design
- [ ] Architecture addresses all requirements
- [ ] Technology choices justified
- [ ] Testing strategy defined with coverage targets
- [ ] Migration/deployment plan documented
- [ ] Reviewed by technical lead

### After Tasks
- [ ] Task dependency graph clear and correct
- [ ] Each task includes implementation + tests
- [ ] Tasks sized 1–4 hours each
- [ ] Acceptance criteria defined per task

### Definition of Done (per task)
- [ ] Implementation complete
- [ ] All tests written and passing
- [ ] Edge cases covered
- [ ] Property tests passing (if applicable)
- [ ] Code reviewed
- [ ] Documentation updated

### Non-Functional Requirements (when applicable)
- **Performance** — response time, throughput, resource usage
- **Security** — auth, authorization, data protection, audit logging
- **Scalability** — concurrent users, data volume, growth
- **Reliability** — uptime, error rates, recovery time
- **Accessibility** — WCAG level, keyboard nav, screen reader support
- **Maintainability** — code quality standards, documentation
- **Compatibility** — browsers, devices, OS, API versions

### Best Practices
- **Requirements:** Use EARS format, detail through Q&A, define properties early, document all edge cases
- **Design:** High-level first then drill down, document decisions and tradeoffs, specify testing strategy
- **Execution:** Follow dependency order, write tests before/with implementation, run full suite after each task, commit impl + tests together, maintain ≥80% coverage, update tests first on changes, add regression tests for bugs

## Common Pitfalls
- Vague acceptance criteria → use EARS format
- Skipping requirements Q&A → enforce detailing loop
- Implementing before design approval → get sign-off first
- Code without tests → write tests alongside implementation
- Stale tests after requirement changes → update tests first
