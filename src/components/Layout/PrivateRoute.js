import React, { useContext } from "react";
import { AuthContext } from "./../../contexts/userContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
	component: Component,
	role,
	data,
	permission,
	...rest
}) => {
	const Data = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props =>
				Data.token !== "" ? (
					role !== "admin" ? (
						role === data.role ? (
							<Component {...props} />
						) : (
							<div>403</div>
						)
					) : data.permissions ? (
						data.permissions.some(
							r => permission.indexOf(r) >= 0
						) ? (
							<Component {...props} />
						) : (
							<div>403</div>
						)
					) : (
						<div>403</div>
					)
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
