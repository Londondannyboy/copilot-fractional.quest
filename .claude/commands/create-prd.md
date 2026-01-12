# Create PRD Command

Generate or update the Product Requirements Document.

## Instructions

When this command is invoked after discussing project scope:

1. **Gather Context**
   - What has been discussed in this conversation?
   - What is the project about?
   - What are the goals?

2. **Generate PRD**

Create/update `/PRD.md` with this structure:

```markdown
# {Project Name} - Product Requirements Document

> **North Star Document** - This PRD is the single source of truth.

## Mission
{1-2 sentence mission statement}

## Target Users
### Primary
{description}
### Secondary
{description}

## Current State
{what exists now}

## In Scope - MVP
### Phase 1: {name}
- [ ] Feature 1
- [ ] Feature 2
### Phase 2: {name}
...

## Out of Scope
- {thing not included}
- {thing for later}

## Architecture
### Tech Stack
| Layer | Technology |
|-------|------------|
| ... | ... |

### Key Files
{file tree of important files}

### Database Schema
{relevant tables}

## Success Metrics
- {metric 1}
- {metric 2}

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| ... | ... | ... |

## Timeline (No Dates)
1. {phase 1}
2. {phase 2}
...

---
*Last Updated: {date}*
```

3. **Confirm**

Ask: "I've created/updated the PRD. Would you like me to read it back or make any changes?"

## Usage

After discussion:
```
/create-prd
```

Or with specific output:
```
/create-prd /docs/PRD.md
```
