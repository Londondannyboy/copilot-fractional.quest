// State of the agent, make sure this aligns with your agent's state.
export type Job = {
  title: string;
  company: string;
  location: string;
}

export type UserProfile = {
  id?: string;
  name?: string;
  firstName?: string;
  email?: string;
  liked_jobs?: string[];  // job IDs they've liked
  zep_thread_id?: string;  // cached Zep thread ID
}

export type AgentState = {
  jobs: Job[];
  search_query: string;
  user?: UserProfile;
}
