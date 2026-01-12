# Execute Command

Build a feature from a structured plan.

## Usage

```
/execute {path-to-plan}
```

Example: `/execute /.claude/plans/mdx-migration.md`

## Instructions

When this command is invoked:

1. **Read the Plan**
   - Load the plan file specified
   - This is your ONLY context - no additional priming needed

2. **Execute Tasks**
   - Work through the task breakdown sequentially
   - Update todo list as you progress
   - Create/modify files as specified

3. **Validate**
   - Run build: `npm run build`
   - Run lint: `npm run lint`
   - Test the feature manually if applicable

4. **Report Completion**

```
✅ Feature Complete: {Feature Name}

📁 Files Changed:
- /path/to/file.tsx (created)
- /path/to/other.tsx (modified)

✓ Build: Passed
✓ Lint: Passed

🔍 To Test:
- Visit http://localhost:3001/{route}
- Check {specific behavior}

⚠️ Notes:
- Any issues or caveats
```

## Important

- Do NOT load additional context beyond the plan
- The plan should contain everything needed
- If missing info, note it and continue with best judgment
- Keep context light for better LLM reasoning

## After Execution

Consider running `/evolve` if you encountered any issues that should improve the system.
