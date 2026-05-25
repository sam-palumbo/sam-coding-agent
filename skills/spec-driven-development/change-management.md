# Change Management

Handling requirement changes mid-implementation without losing alignment between docs, code, and tests.

## Categories

| Category | Trigger | Action |
|----------|---------|--------|
| **Minor** | Clarifications, small refinements, bug fixes | Proceed immediately |
| **Moderate** | New edge cases, modified acceptance criteria, additional validation | Update docs and continue |
| **Major** | New features, changed architecture, different approach | Pause and replan |

## Process

When requirements change mid-implementation, you MUST:

1. **Assess impact**
   - Which tasks are affected (completed, in-progress, not-started)?
   - Does the design need updating?
   - Are there new edge cases or correctness properties?

2. **Categorize change** (use table above)
   - Minor → proceed immediately
   - Moderate → update docs and continue
   - Major → pause and replan

3. **Update documents** (in this order)
   - `requirements.md` — record changes (mark with version/date if helpful)
   - `design.md` — only if architecture or approach changes
   - `tasks.md` — regenerate affected sections

4. **Handle in-progress work**
   - **Completed tasks** — leave as-is unless the change invalidates them
   - **In-progress tasks** — pause, reassess, update acceptance criteria
   - **Not-started tasks** — update before starting

5. **Communicate**
   - Document what changed and why
   - Notify stakeholders of impact on timeline and scope
   - Get approval for major changes

6. **Update tests** (MUST be done)
   - Modify existing tests for new requirements
   - Add tests for new functionality
   - Remove tests for removed functionality

**Validation:** Change is complete when:
- [ ] All affected documents updated
- [ ] Tests updated and passing
- [ ] Stakeholders notified
- [ ] Major changes approved

## Example

> Change: "Users should be able to filter by date range, not just a single date."

| Document | Update |
|----------|--------|
| `requirements.md` | Acceptance criteria for date-range filtering |
| `design.md` | API accepts `start` and `end` dates |
| `tasks.md` | "Implement date filter" task scope updated |
| Tests | Add range scenarios to filter tests |

**Category:** Moderate → update documents and continue.
