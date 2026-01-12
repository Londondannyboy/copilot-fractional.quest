# [Project Name] - Development Guide

> **Stack**: CopilotKit + Pydantic AI + Hume + MDX + Neon
> **Methodology**: Cole Medin Agentic Engineering
> **Master Template**: /Users/dankeegan/copilotkit-demo/.claude/MASTER_TEMPLATE.md

## Quick Start

```bash
# 1. Read master template for full architecture
cat /Users/dankeegan/copilotkit-demo/.claude/MASTER_TEMPLATE.md

# 2. Start development
npm run dev

# 3. Start agent (separate terminal)
cd agent && uv run uvicorn src.agent:app --reload --port 8000
```

## Commands

| Command | Purpose |
|---------|---------|
| `/prime` | Load project context |
| `/plan {feature}` | Create implementation plan |
| `/execute {plan}` | Build from plan |
| `/evolve` | Improve system after bugs |

## Project-Specific Rules

### [Add your project-specific rules here]

Example:
- All prices in GBP
- Target audience: UK professionals
- Tone: Professional but friendly

## Key Files

| File | Purpose |
|------|---------|
| `/PRD.md` | Product requirements |
| `/agent/src/agent.py` | Pydantic AI agent |
| `/src/lib/mdx-components.tsx` | MDX component registry |
| `/src/app/` | Next.js pages |

## Environment Variables

```env
DATABASE_URL=          # Neon PostgreSQL (also provides auth)
HUME_API_KEY=
HUME_SECRET_KEY=
HUME_CONFIG_ID=
GOOGLE_API_KEY=        # For Gemini model
```

## Database Schema

[Add your tables here]

## Deployment

- **Frontend**: Vercel (auto-deploy from main)
- **Agent**: Railway
- **Database**: Neon

---

*For detailed architecture and patterns, see MASTER_TEMPLATE.md*
