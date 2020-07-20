import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import Login from "./components/Authentication/Login";
import PatientExamine from "./components/Doctor/PatientExamine";
import DoctorProfile from "./components/Doctor/DoctorProfile";
import AssignAmbulance from "./components/Ambulance/AssignAmbulance";
import AssignBed from "./components/Hospital/AssignBed";

const App = () => {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route exact path="/patientexamine" component={PatientExamine} />
			<Route exact path="/doctorprofile" component={DoctorProfile} />
			<Route exact path="/assignambulance" component={AssignAmbulance} />
			<Route exact path="/assignbed" component={AssignBed} />
			<Redirect from="/" to="/login" />
		</Switch>
	);
};

export default App;
