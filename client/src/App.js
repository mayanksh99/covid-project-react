import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Authentication/Login";
import "antd/dist/antd.css";
import DoctorNavigator from "./components/Layout/DoctorNavigator";

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/doctor" component={DoctorNavigator} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default App;
