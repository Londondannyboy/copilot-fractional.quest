// State of the agent, make sure this aligns with your agent's state.
export type Job = {
  title: string;
  company: string;
  location: string;
}

export type AgentState = {
  jobs: Job[];
  search_query: string;
}
