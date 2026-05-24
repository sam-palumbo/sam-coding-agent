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

After drafting, analyze each requirement systematically:

1. **Parse** — extract the requirement statement
2. **Analyze** — identify gaps:
   - What are the edge cases and boundaries?
   - What assumptions are implicit?
   - What error conditions exist?
   - How is success/failure determined?
3. **Question** — ask about identified gaps, batched
4. **Refine** — update acceptance criteria with answers
5. **Verify** — confirm the requirement is complete and testable
6. **Repeat** — move to next requirement

**Batching:** group related questions (all validation together, all error handling together). Aim for 3–5 questions per batch. Prioritize critical ambiguities first.

## Property-Based Testing

Define formal correctness properties that must always hold:

```
Property: "User balance never goes negative"
∀ transaction: balance_after(transaction) ≥ 0
```

Use a property-based testing framework appropriate to your language (e.g., `fast-check`, `Hypothesis`) to encode each invariant as an executable test that runs against many generated inputs.
