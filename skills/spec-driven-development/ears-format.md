# EARS Format & Requirements Detailing

**EARS** (Easy Approach to Requirements Syntax) gives structured templates for clear, testable requirements.

## Templates

| Type | Template | Example |
|------|----------|---------|
| **Event-Driven** | `WHEN [trigger] THE [system] SHALL [action]` | WHEN user clicks submit, THE system SHALL validate all fields |
| **Conditional** | `IF [condition] THEN THE [system] SHALL [action]` | IF password is less than 8 characters, THEN THE system SHALL display error |
| **State-Based** | `WHILE [state] THE [system] SHALL [action]` | WHILE processing payment, THE system SHALL display loading indicator |
| **Feature-Specific** | `WHERE [feature exists] THE [system] SHALL [action]` | WHERE user has admin role, THE system SHALL display admin panel |
| **Unconditional** | `THE [system] SHALL [action]` | THE system SHALL log all authentication attempts |

## Before / After

**Before (vague, untestable):**
```
- Form validates input
- Form submits successfully
```

**After (EARS, testable):**
```
- WHEN user submits with valid data, THE system SHALL accept within 2 seconds
- IF required field is empty, THE system SHALL display field-specific error
- IF network fails, THE system SHALL retry up to 3 times with exponential backoff
- WHEN submission succeeds, THE system SHALL display confirmation and clear form
- THE system SHALL prevent duplicate submissions during processing
```

## Requirements Detailing Loop

After drafting requirements, you MUST analyze each requirement systematically:

1. **Parse** — Extract the requirement statement
2. **Analyze** — Identify gaps by asking:
   - What are the edge cases and boundaries?
   - What assumptions are implicit?
   - What error conditions exist?
   - How is success/failure determined?
3. **Question** — Ask user about identified gaps (see [asking-questions.md](./asking-questions.md) for guidelines)
4. **Refine** — Update acceptance criteria with user's answers
5. **Verify** — Confirm the requirement is complete and testable
6. **Repeat** — Move to next requirement

**Validation:** A requirement is complete when:
- [ ] Uses EARS format
- [ ] All edge cases identified
- [ ] Error conditions specified
- [ ] Success/failure criteria clear
- [ ] Testable and measurable

## Property-Based Testing

You MUST define formal correctness properties for critical business logic.

**Process:**
1. Identify invariants that MUST always hold
2. Express as formal property: `∀ input: condition(output) = true`
3. Encode as executable test using PBT framework
4. Run against many generated inputs

**Example:**
```
Property: "User balance never goes negative"
∀ transaction: balance_after(transaction) ≥ 0
```

**When to use:**
- Data integrity constraints
- Business rule invariants
- Security properties
- Mathematical properties
