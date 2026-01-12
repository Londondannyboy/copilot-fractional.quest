# Evolve Command

System evolution - improve rules/commands after encountering issues.

## Philosophy

> "Don't just fix the bug - fix the system that allowed the bug."
> - Cole Medin

Every bug is an opportunity to make the coding agent stronger.

## Instructions

When this command is invoked after encountering an issue:

1. **Analyze the Issue**
   - What went wrong?
   - What was expected vs actual?
   - Was this a one-time mistake or pattern?

2. **Identify Root Cause**
   - Missing rule?
   - Unclear instruction?
   - Missing reference document?
   - Command workflow gap?

3. **Propose Improvement**

Choose the appropriate fix:

### Option A: Add/Update Rule
```markdown
## Update to CLAUDE.md or modular reference

### Before
{existing text or "not present"}

### After
{new rule text}

### Rationale
{why this prevents the issue}
```

### Option B: Update Command
```markdown
## Update to /.claude/commands/{command}.md

### Change
{description of change}

### Rationale
{why this helps}
```

### Option C: New Reference Document
```markdown
## New Reference: /.claude/reference/{name}.md

{content}

### Rationale
{why this is needed}
```

4. **Apply the Change**
   - Make the edit
   - Verify it doesn't conflict with existing rules

5. **Report**

```
🔄 System Evolution

Issue: {brief description}
Root Cause: {what was missing}
Fix: {what was added/changed}

Files Updated:
- /.claude/reference/xyz.md (updated)

This prevents: {future similar issues}
```

## Examples

| Issue | Fix Type | Example |
|-------|----------|---------|
| Wrong import style | Rule | Add "Use named exports" to conventions |
| Forgot to run tests | Command | Add test step to execute command |
| Auth flow unclear | Reference | Create auth-patterns.md |
| TypeScript errors | Rule | Add "Always run build before PR" |

## When to Evolve

- After fixing a bug manually
- When LLM repeats same mistake
- When a pattern emerges across sessions
- After discovering better approach
