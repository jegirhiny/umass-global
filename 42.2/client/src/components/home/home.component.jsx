import React, { useContext } from "react";
import UserContext from "../user/UserContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <div>
        {currentUser ? (
          <h2>{currentUser.firstName || currentUser.username}!</h2>
        ) : (
          <div>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
