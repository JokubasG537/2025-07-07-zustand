import { useJobStore } from "../stores/useJobStore"

export default function JobDetail() {
  const job = useJobStore((s) => s.selectedJob)
  const clear = useJobStore((s) => s.clearSelectedJob)

  if (!job) {
     return (
      <div style={{ width: '50%', padding: '1rem' }}>
        <p>Select a job from the list to view details.</p>

      </div>
    );
  }


  return(
    <div className="detail">
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.description}</p>
      <button onClick={clear}>Close</button>
    </div>
  )
}
