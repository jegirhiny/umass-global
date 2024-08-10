import React from "react";
import JobCard from "./job-card.component";

const JobCardList = ({ jobs }) => {
  return (
    <div>
      {jobs.length ? (
        <div>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
            />
          ))}
        </div>
      ) : (
        <p>Loading.</p>
      )}
    </div>
  );
};

export default JobCardList;
