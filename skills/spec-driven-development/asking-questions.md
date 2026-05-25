# Asking Questions

Guidelines for asking clarifying questions during spec creation.

## When to Ask vs. Infer

**Decision Tree:**

```
Is the requirement clear and unambiguous?
├─ NO → Ask user (follow process below)
└─ YES → Can you infer from industry standards?
    ├─ YES → Infer and document assumption
    └─ NO → Ask user (follow process below)
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

## How to Ask

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

## Batching Rules

When asking multiple questions:

- **Group related questions** — all validation together, all error handling together
- **Present 3–5 questions per batch** — avoid overwhelming the user
- **Prioritize critical ambiguities first** — ask blocking questions before nice-to-haves
- **NEVER ask questions one at a time** — batch them for efficiency

**Example batch:**
```
I have a few questions about the authentication flow:

1. Password requirements:
   Options: (Recommended) Min 8 chars + special char | Min 12 chars | Min 8 chars only

2. Failed login handling:
   Options: (Recommended) Lock after 5 attempts | Lock after 3 attempts | No lockout

3. Session timeout:
   Options: (Recommended) 30 minutes | 1 hour | 24 hours
```
