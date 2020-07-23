import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import routes from "../../utils/_routes";
import AmbulanceAdminDetails from "./../Admin/AmbulanceAdminDetails";
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

	// useEffect(() => {
	// 	if (
	// 		!localStorage.getItem("token") ||
	// 		localStorage.getItem("token") === "undefined"
	// 	) {
	// 		props.history.push("/login");
	// 	}
	// });

	return (
		<>
			<Router>
				<Layout>
					<Sider
						theme="light"
						trigger={null}
						collapsible
						collapsed={isCollapsed}
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
										<Route
											key={idx}
											path={route.path}
											exact={route.exact}
											render={props => (
												<route.component {...props} />
											)}
										/>
									) : null;
								})}
								<Redirect from="/dashboard" to="/" />
								<Route
									exact
									path="/ambulancedetails/:id"
									component={AmbulanceAdminDetails}
								/>
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Router>
		</>
	);
};

export default Dashboard;
