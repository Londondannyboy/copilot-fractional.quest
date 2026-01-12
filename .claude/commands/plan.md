# Plan Command

Create a structured plan for a feature before execution.

## Instructions

When this command is invoked with a feature description:

1. **Understand the Feature**
   - What is being built?
   - What files will be affected?
   - What are the dependencies?

2. **Research the Codebase**
   - Find similar implementations
   - Understand existing patterns
   - Identify potential conflicts

3. **Create Structured Plan**

Output a markdown document to `/.claude/plans/{feature-name}.md` with:

```markdown
# Feature: {Feature Name}

## Overview
Brief description of what we're building.

## User Story
As a [user type], I want [feature] so that [benefit].

## Technical Approach
How we'll implement this.

## Files to Create/Modify
- `/path/to/file.tsx` - Description of changes
- ...

## Task Breakdown
1. [ ] Task 1
2. [ ] Task 2
3. [ ] Task 3
...

## Testing Strategy
How to verify this works.

## Rollback Plan
How to undo if needed.

## Reference Documents
- /.claude/reference/relevant-doc.md
```

## Important

- Be specific about file paths
- Include code snippets where helpful
- Reference modular rules if applicable
- This plan will be used for execution in a fresh context
