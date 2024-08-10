import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./components/api/api";
import NavBar from "./components/nav/nav-bar.component";
import Routes from "./components/routes/routes.component";
import UserContext from "./components/user/UserContext";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./components/hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [jobApplyIds, setJobApplyIds] = useState(new Set());

  useEffect(() => {
    const loadUserInfo = async () => {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          JoblyApi.token = token;
          const currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
    };
    loadUserInfo();
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const signup = async (signupData) => {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const login = async (loginData) => {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const jobApplied = (id) => jobApplyIds.has(id);

  const jobApply = (id) => {
    if (!jobApplied(id)) {
      JoblyApi.jobApply(currentUser.username, id);
      setJobApplyIds(new Set([...jobApplyIds, id]));
    }
  };

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, jobApplied, jobApply }}
      >
        <NavBar logout={logout} />
        <Routes signup={signup} login={login} />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
