---
name: spec-driven-development
description: Use when starting a new feature with clear business needs, when stakeholder alignment or formal documentation is required, or when a feature carries compliance or formal testing obligations
---

# Spec-Driven Development

## Overview

Document requirements and design before implementation. Business needs → technical solution. Reduces rework, ensures alignment, and creates testable specifications.

## When to Use

- New features with clear business needs
- Projects requiring stakeholder alignment or documentation
- Features with compliance or formal testing requirements

**When NOT to use:**
- Trivial bug fixes or one-line changes
- Exploratory prototypes meant to be discarded
- Tasks where the spec would exceed the implementation

## Workflow

1. Create `specs/{feature-name}/`
2. Draft `requirements.md` (user stories + [EARS acceptance criteria](./ears-format.md))
3. Detail requirements through Q&A (batch 3–5 related questions, see [detailing loop](./ears-format.md#requirements-detailing-loop))
4. Get stakeholder approval
5. Draft `design.md` (architecture, algorithms, test strategy, deployment)
6. Generate `tasks.md` (numbered, dependency graph, each task = impl + tests)
7. Execute tasks in dependency order

When requirements change mid-implementation, follow the [change management process](./change-management.md).

## Automation

When the user provides a feature request, automatically:

1. **Extract user stories** — "As a [role], I want [feature], so that [benefit]". Identify all roles; one story per distinct capability.
2. **Generate EARS acceptance criteria** — see [EARS format guide](./ears-format.md) for templates and the requirements detailing loop.
3. **Identify edge cases** — boundaries (empty, zero, max), errors (network, invalid input), concurrency, performance.
4. **Define correctness properties** — invariants that must always hold (data integrity, business rules, security). See [property-based testing](./ears-format.md#property-based-testing).
5. **Create `requirements.md`** and iterate with user feedback before moving to design.

## Decision-Making: Ask vs. Infer

**Ask when:**
- Business logic is ambiguous (e.g., "What happens if payment fails mid-checkout?")
- Multiple valid approaches exist (e.g., auto-retry vs. user action)
- Security or compliance implications (e.g., data retention policy)
- UX decisions (e.g., modal vs. new page)
- Performance requirements unclear (e.g., acceptable latency)

**Infer when:**
- Industry standard practices apply (e.g., HTTP status codes, password rules)
- Technical implementation details (e.g., schema, API structure)
- Common error handling patterns (e.g., validation messages, retries)
- Obvious edge cases (e.g., empty lists, nulls, zeros)

**How to ask:**

1. **State** the question clearly — what needs to be decided
2. **Context** — why it matters for implementation
3. **Options** — present 2–3 alternatives with tradeoffs, ordered most-recommended first
4. **Label** the top choice with "(Recommended)"
5. **Wait** — proceed only after the user chooses

Use interactive prompts or structured choice mechanisms (numbered options, selection menus) when available.

**Example:**

> Question: "Should users be able to change their email address?"
>
> Context: Email is the login credential — affects authentication, verification flow, and creates a potential account-takeover vector.
>
> Options (most → least recommended):
> 1. **(Recommended)** Allow with re-verification — industry standard, balances flexibility and security
> 2. Allow via support ticket only — slower for users, harder to abuse
> 3. Disallow — simplest, least flexible

## Document Structure

```
specs/{feature-name}/
├── requirements.md   # User stories + EARS criteria + edge cases + properties + NFRs
├── design.md         # Architecture + algorithms + tech choices + test strategy + deployment
└── tasks.md          # Dependency graph + numbered tasks (impl + tests per task)
```

## Test Coverage

Every task ships with tests: unit, integration, property-based (for invariants), and edge-case tests from the Q&A.

**Definition of Done:** implementation complete · all tests passing · edge cases covered · property tests passing (if applicable) · reviewed · docs updated.

See [review checklists](./review-checklists.md) for phase-by-phase criteria and best practices.

## Common Pitfalls

- Vague acceptance criteria → use [EARS format](./ears-format.md)
- Skipping requirements Q&A → enforce the [detailing loop](./ears-format.md#requirements-detailing-loop)
- Implementing before design approval → get sign-off first
- Code without tests → write tests alongside implementation
- Stale tests after requirement changes → follow [change management](./change-management.md) to update tests first
