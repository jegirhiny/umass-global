import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../user/UserContext";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => (
    <nav>
      <NavLink exact to="/">
        Jobly
      </NavLink>
      <NavLink exact to="/companies">
        Companies
      </NavLink>
      <NavLink exact to="/jobs">
        Jobs
      </NavLink>
      <NavLink exact to="/profile">
        Profile
      </NavLink>
      <Link to="/" onClick={logout}>
        Log out
      </Link>
    </nav>
  );

  const loggedOutNav = () => (
    <nav>
      <NavLink exact to="/">
        Jobly
      </NavLink>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/signup">
        Sign up
      </NavLink>
    </nav>
  );

  return <div>{currentUser ? loggedInNav() : loggedOutNav()}</div>;
};

export default NavBar;
