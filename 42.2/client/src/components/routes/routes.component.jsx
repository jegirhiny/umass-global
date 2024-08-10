import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/home.component";
import PrivateRoute from "./private-route.component";
import Companies from "../companies/companies.component";
import Company from "../companies/Company";
import Jobs from "../jobs/jobs.component";
import SignupForm from "../user/signup-form.component.jsx";
import LoginForm from "../user/login-form.component";
import Profile from "../user/profile.component.jsx";

const Routes = ({ signup, login }) => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <PrivateRoute exact path="/companies">
      <Companies />
    </PrivateRoute>
    <PrivateRoute exact path="/companies/:handle">
      <Company />
    </PrivateRoute>
    <PrivateRoute exact path="/jobs">
      <Jobs />
    </PrivateRoute>
    <Route exact path="/login">
      <LoginForm login={login} />
    </Route>
    <Route exact path="/signup">
      <SignupForm signup={signup} />
    </Route>
    <PrivateRoute path="/profile">
      <Profile />
    </PrivateRoute>
    <Redirect to="/" />
  </Switch>
);

export default Routes;
