import { useEffect } from "react"
import { useJobStore } from "../stores/useJobStore"
import JobDetail from "../components/JobDetail"


export default function JobBoard() {
  const {jobs, fetchJobs, selectJob, loading, error} = useJobStore()

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  return (
    <div className="job-board">
      <h1>job Board</h1>
      <div className="jobs"
      style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>

        <div>
        {jobs.length > 0 ? (

          jobs.map((job) => (
            <div key={job.id} onClick={() => selectJob(job)} className="job" style={{cursor: 'pointer', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'}}>
              <h2>{job.title}</h2>
              <p>{job.company}</p>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <JobDetail />
      </div>
    </div>
  )
}