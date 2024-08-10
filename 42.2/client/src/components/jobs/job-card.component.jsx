import React, { useState, useEffect, useContext } from "react";
import UserContext from "../user/UserContext";

const JobCard = ({ id, title, salary, equity, companyName }) => {
  const { jobApplied, jobApply } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(jobApplied(id));
  }, [id, jobApplied]);

  const handleApply = async () => {
    if (applied) {
      return;
    }

    jobApply(id);
    setApplied(true);
  };

  return (
    <section>
      <div>
        <h5>{title}</h5>
        <p>{companyName}</p>
        {salary && <p>Salary: {formatSalary(salary)}</p>}
        <p>Equity: {equity !== null ? equity : "0"}</p>
        <button onClick={handleApply} disabled={applied}>
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </section>
  );
};

const formatSalary = (salary) => {
  return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default JobCard;
