import React from "react";
import { Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

import Login from "./components/Authentication/Login";
import Navigator from "./components/Layout/Navigator";
const App = () => {
	return (
		<Switch>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route path="/" component={Navigator} />
			</Switch>
		</Switch>
	);
};

export default App;
