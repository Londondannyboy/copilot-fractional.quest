import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agent import AppState, agent
from pydantic_ai.ag_ui import StateDeps

app = agent.to_ag_ui(deps=StateDeps(AppState()))

if __name__ == "__main__":
    # run the app
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
