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

    fetchJobs: () => void,
    selectJob: (job: Job) => void,
    clearSelectedJob: () => void
}

export const useJobStore1 = create<jobState>((set) => {

})