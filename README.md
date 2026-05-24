# sam-coding-agent

A structured knowledge base and playbook for an AI-augmented coding workflow. This repository centralizes agent instructions, reusable prompts, decision records, learnings, code snippets, skills, checklists, and templates — all organized for fast retrieval by both the developer and the AI coding agent.

## Structure

| Directory           | Purpose                                    |
|---------------------|--------------------------------------------|
| `AGENTS.md`         | Agent behavior and collaboration rules     |
| `aliases/`          | Shell and tool aliases                     |
| `anti-patterns/`    | Patterns to avoid                          |
| `bookmarks/`        | Useful links and references                |
| `checklists/`       | Reusable checklists (code review, etc.)    |
| `decisions/`        | Architecture Decision Records (ADRs)       |
| `dotfiles/`         | Configuration files (.zshrc, .gitconfig)   |
| `learnings/`        | Today I Learned (TIL) entries              |
| `memories/`         | Persistent agent context                   |
| `prompts/`          | Reusable prompts for the agent             |
| `scripts/`          | Automation scripts                         |
| `skills/`           | Step-by-step skill recipes                 |
| `snippets/`         | Reusable code snippets                     |
| `templates/`        | Project and file templates                 |
| `tooling/`          | Tooling configurations                     |
| `wiki/`             | Broader documentation                      |

## Usage

This repo is designed to be paired with an AI coding assistant. The `AGENTS.md` file defines how the agent should behave, communicate, and collaborate. The remaining directories act as an ever-growing external memory that both you and the agent can read and write.
