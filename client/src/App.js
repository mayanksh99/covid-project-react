import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import Login from "./components/Authentication/Login";
import PatientExamine from "./components/Doctor/PatientExamine";

const App = () => {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route exact path="/patientexamine" component={PatientExamine} />
			<Redirect from="/" to="/login" />
		</Switch>
	);
};

export default App;
