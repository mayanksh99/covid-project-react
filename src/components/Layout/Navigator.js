import React, { useState, useContext } from "react";
import { Layout, Menu } from "antd";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import routes from "../../utils/_routes";
import AmbulanceAdminDetails from "../Admin/Ambulance/AmbulanceAdminDetails";
import HospitalDetails from "./../Admin/Hospital/HospitalDetails";
import { AuthContext } from "./../../contexts/userContext";
import { getRole } from "./../../utils/_helper";
import {
	Redirect,
	Route,
	Switch,
	BrowserRouter as Router,
	Link
} from "react-router-dom";

const { Content, Sider } = Layout;

const Dashboard = props => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const userData = useState(getRole());

	console.log(userData);

	return (
		<>
			<Router>
				<Layout>
					<Sider
						theme="light"
						trigger={null}
						collapsible
						collapsed={isCollapsed}
						width={280}
					>
						<Menu
							theme="light"
							mode="inline"
							// defaultSelectedKeys={"dashboard"}
						>
							{routes.map((route, idx) => (
								<Menu.Item key={route.key}>
									<route.icon />
									<span>{route.name}</span>
									<Link to={route.path} />
								</Menu.Item>
							))}
							<Menu.Item
								key={"signout"}
								onClick={() => {
									localStorage.clear();
									props.history.push("/login");
								}}
							>
								<LockOutlined />
								<span>Sign Out</span>
							</Menu.Item>

							<Menu.Divider />

							<Menu.Item
								key={"menu-extend"}
								onClick={() => {
									setIsCollapsed(!isCollapsed);
								}}
							>
								{isCollapsed ? (
									<RightOutlined />
								) : (
									<>
										<LeftOutlined />
										<span>Hide</span>
									</>
								)}

								<span></span>
							</Menu.Item>
						</Menu>
					</Sider>

					<Layout>
						<Content
							style={{
								padding: 24,
								background: "#f9f9f9",
								minHeight: "100vh"
							}}
						>
							<Switch>
								{routes.map((route, idx) => {
									return route.component ? (
										<PrivateRoute
											key={idx}
											path={route.path}
											exact={route.exact}
											data={userData[0]}
											role={route.role}
											permission={route.permission}
											render={props => (
												<route.component {...props} />
											)}
										/>
									) : null;
								})}
								<Redirect from="/dashboard" to="/" />
								<PrivateRoute
									exact
									path="/ambulancedetails/:id"
									component={AmbulanceAdminDetails}
									role="admin"
									permission={["master", "ambulance"]}
									data={userData[0]}
								/>
								<Route
									exact
									path="/hospitaldetails/:id"
									component={HospitalDetails}
									role="admin"
									permission={["master", "hospital"]}
									data={userData[0]}
								/>
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Router>
		</>
	);
};

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
					) : data.permissions.some(
							r => permission.indexOf(r) >= 0
					  ) ? (
						<Component {...props} />
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

export default Dashboard;
