import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../search/search-form.component";
import CompanyCard from "./company-card.component"

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const search = async (name) => {
    setLoading(true);
    
    try {
      const companies = await JoblyApi.getCompanies(name);
      setCompanies(companies);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Companies</h1>
      <SearchForm searchFor={search} />
      {loading ? (
        <p>Loading.</p>
      ) : companies.length === 0 ? (
        <p>No results.</p>
      ) : (
        <div>
          {companies.map((c) => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;
