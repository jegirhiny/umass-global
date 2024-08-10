import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api"
import JobCardList from "../jobs/job-card-list.component";

function Company() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        const jobsData = await JoblyApi.getJobs();
        
        setCompany(companyData);
        setJobs(jobsData.filter((job) => job.companyHandle === handle));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [handle]);

  if (!company) {
    return <p>Loading.</p>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default Company;
