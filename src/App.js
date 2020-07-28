import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Navigator from "./components/Layout/Navigator";
import { AuthContext } from "./contexts/userContext";
import "antd/dist/antd.css";
import "./App.css";

const App = () => {
	return (
		<Switch>
			<Switch>
				<Route exact path="/login" component={Login} />
				<PrivateRoute path="/" component={Navigator} />
			</Switch>
		</Switch>
	);
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	const Data = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={props =>
				Data.token !== "" ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default App;
