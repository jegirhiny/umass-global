import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../search/search-form.component";
import JobCardList from "./job-card-list.component";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const search = async (title) => {
    setLoading(true);
    
    try {
      const jobs = await JoblyApi.getJobs(title);
      setJobs(jobs);
    } catch (error) {
      console.error("Error searching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search for Jobs</h1>
      <SearchForm searchFor={search} />
      {loading ? (
        <p>Loading.</p>
      ) : jobs.length === 0 ? (
        <p>No results.</p>
      ) : (
        <JobCardList jobs={jobs} />
      )}
    </div>
  );
};

export default Jobs;
