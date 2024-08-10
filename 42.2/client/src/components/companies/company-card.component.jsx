import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ name, description, handle }) => {
  return (
    <section>
      <Link to={`/companies/${handle}`}>
        <div>
          <h5>{name}</h5>
          <p>{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default CompanyCard;
