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

When the user provides a feature request, you MUST automatically:

1. **Extract user stories** — Convert request into "As a [role], I want [feature], so that [benefit]" format. Identify ALL user roles. Create ONE story per distinct capability.

2. **Generate EARS acceptance criteria** — For EACH user story, create acceptance criteria using [EARS format](./ears-format.md). Use appropriate template (WHEN/IF/WHILE/WHERE/THE SHALL).

3. **Identify edge cases** — Proactively ask about:
   - Boundaries: empty, zero, max values
   - Errors: network failures, invalid input
   - Concurrency: simultaneous operations
   - Performance: acceptable latency, throughput

4. **Define correctness properties** — Extract invariants that MUST always hold:
   - Data integrity rules (e.g., "balance never negative")
   - Business logic constraints (e.g., "order total = sum of items")
   - Security requirements (e.g., "only owner can delete")
   
   See [property-based testing](./ears-format.md#property-based-testing) for encoding as tests.

5. **Create `requirements.md`** — Generate structured document with:
   - Introduction and glossary
   - User stories (from step 1)
   - EARS acceptance criteria (from step 2)
   - Edge cases (from step 3)
   - Correctness properties (from step 4)
   - Non-functional requirements (if applicable)

6. **Iterate** — Present draft to user. Refine based on feedback. Get explicit approval before proceeding to design.

**Validation:** Before moving to design, verify:
- [ ] All user stories follow correct format
- [ ] All acceptance criteria use EARS templates
- [ ] Edge cases documented for each requirement
- [ ] At least one correctness property defined
- [ ] User has explicitly approved

## Decision-Making: Ask vs. Infer

**Decision Tree:**

```
Is the requirement clear and unambiguous?
├─ NO → Ask user (follow "How to ask" below)
└─ YES → Can you infer from industry standards?
    ├─ YES → Infer and document assumption
    └─ NO → Ask user (follow "How to ask" below)
```

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

**Output format:**
```
Question: [Clear question]

Context: [Why this matters]

Options (most → least recommended):
1. (Recommended) [Option] — [tradeoff explanation]
2. [Option] — [tradeoff explanation]
3. [Option] — [tradeoff explanation]
```

Use interactive prompts or structured choice mechanisms (numbered options, selection menus) when available.

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
