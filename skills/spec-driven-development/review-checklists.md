# Review Checklists & Best Practices

Phase-by-phase criteria for verifying spec quality and execution.

## After Requirements Phase

- [ ] All user stories follow `As a [role], I want [feature], so that [benefit]`
- [ ] All acceptance criteria use EARS format
- [ ] Edge cases and error conditions documented
- [ ] Correctness properties defined
- [ ] Non-functional requirements specified (if applicable)
- [ ] Stakeholders have reviewed and approved

## After Design Phase

- [ ] Architecture addresses all requirements
- [ ] Technology choices justified
- [ ] Testing strategy defined with coverage targets
- [ ] Migration/deployment plan documented
- [ ] Reviewed by technical lead

## After Tasks Phase

- [ ] Task dependency graph is clear and correct
- [ ] Each task includes implementation + tests
- [ ] Tasks sized appropriately (1–4 hours each)
- [ ] Acceptance criteria defined per task

## After Each Task (Definition of Done)

- [ ] Implementation complete
- [ ] All tests written and passing
- [ ] Edge cases covered
- [ ] Property tests passing (if applicable)
- [ ] Code reviewed
- [ ] Documentation updated

## Non-Functional Requirements (Optional)

When applicable, document:

- **Performance** — response time, throughput, resource usage
- **Security** — authentication, authorization, data protection, audit logging
- **Scalability** — concurrent users, data volume, growth projections
- **Reliability** — uptime, error rates, recovery time
- **Accessibility** — WCAG level, keyboard navigation, screen reader support
- **Maintainability** — code quality standards, documentation requirements
- **Compatibility** — browsers, devices, OS, API versions

## Best Practices

**Requirements**
- Use EARS format; detail each requirement through Q&A
- Define correctness properties early
- Document all edge cases and error conditions

**Design**
- Start high-level, then drill down
- Document decisions and tradeoffs
- Specify testing strategy with coverage targets and per-component test cases

**Execution**
- Follow task dependency order
- Write tests before or alongside implementation
- All tests must pass before marking a task complete
- Run the full test suite after each task
- Commit implementation + tests together
- Maintain a minimum coverage threshold (e.g., 80%)
- When requirements change, update tests first
- When bugs are found, add regression tests
