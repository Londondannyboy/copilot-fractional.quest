# Prime Command

Load project context at the start of any conversation.

## Instructions

When this command is invoked, read the following files to understand the project:

1. **PRD** - `/PRD.md` - The north star document
2. **CLAUDE.md** - Project conventions and architecture
3. **Package.json** - Dependencies and scripts

Then provide a brief summary:
- Current project state
- Recent changes (check git status)
- What's next based on PRD

## Example Output

```
✅ Project Primed: Fractional Quest V2

📊 Current State:
- 347 total pages (243 database + 104 static)
- MDX infrastructure complete
- Demo page at /fractional-jobs-london-mdx

🔄 Recent Changes:
- Added MDX components (PersonalizedHero, CareerTimeline, etc.)
- Created component registry
- Updated next.config.ts for MDX

📋 Next from PRD:
- Add mdx_content column to pages table
- Migrate high-traffic pages to MDX format

What would you like to work on?
```

## After Priming

Ask: "Based on the PRD, what should we build next?"
