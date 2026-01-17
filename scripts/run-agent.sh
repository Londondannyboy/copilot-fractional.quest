#!/bin/bash

# Load environment variables from .env.local
ENV_FILE="$(dirname "$0")/../.env.local"
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Navigate to the agent directory
cd "$(dirname "$0")/../agent" || exit 1

# Run the agent using uv
uv run src/main.py
