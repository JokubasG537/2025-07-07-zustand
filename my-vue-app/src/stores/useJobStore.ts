import {create} from 'zustand'

type Job = {
  id: number,
  title: string,
  company: string,
  description: string
}

type JobState = {
  jobs: Job[],
  selectedJob: Job | null,
  loading: boolean,
  error: string | null,
  fetchJobs: () => void,
  selectJob: (Job: Job) => void,
  clearSelectedJob: () => void
}



export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,

    fetchJobs: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('http://localhost:3001/jobs')
      if (!res.ok) {
        throw new Error('Failed to fetch jobs')
      }
      const data = await res.json()
      set({ jobs: data, loading: false })
    } catch (error ) {
      set({ error: error.message, loading: false })
    }
  },
  selectJob: (job) => set({ selectedJob: job }),
  clearSelectedJob: () => set({ selectedJob: null }),

}))