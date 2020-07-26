import React, { useState, useContext } from "react";
import {
	Redirect,
	Route,
	Switch,
	BrowserRouter as Router,
	Link
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import routes from "../../utils/_routes";
import AmbulanceAdminDetails from "../Admin/Ambulance/AmbulanceAdminDetails";
import HospitalDetails from "./../Admin/Hospital/HospitalDetails";
import { AuthContext } from "./../../contexts/userContext";
import { getRole } from "./../../utils/_helper";
import PatientExamine from "./../Doctor/PatientExamine";
import AmbAdminProfile from "./../Ambulance/AmbAdminProfile";
import AssignAmbulance from "./../Ambulance/AssignAmbulance";
import AmbulanceStatus from "./../Ambulance/AmbulanceStatus";
import AssignBed from "./../Hospital/AssignBed";
import UpdateDailyReport from "./../Hospital/UpdateDailyReport";
import DoctorProfile from "./../Doctor/DoctorProfile";
import AmbulanceAdmin from "./../Admin/Ambulance/AmbulanceAdmin";
import HospitalAdmin from "./../Admin/Hospital/HospitalAdmin";
import DoctorAdmin from "./../Admin/Doctor/DoctorAdmin";
import AdminList from "./../Admin/AdminList";
import PatientList from "./../Admin/PatientList";

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
								{/* {routes.map((route, idx) => {
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
								 */}
								<PrivateRoute
									exact
									path="/patientexamine"
									component={PatientExamine}
									data={userData[0]}
									role="doctor"
								/>
								<PrivateRoute
									exact
									path="/amb-admin-Profile"
									component={AmbAdminProfile}
									role="ambulanceoperator"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/assignambulance"
									component={AssignAmbulance}
									role="ambulanceoperator"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/ambulancestatus"
									component={AmbulanceStatus}
									data={userData[0]}
									role="ambulanceoperator"
								/>
								<PrivateRoute
									exact
									path="/assignbed"
									component={AssignBed}
									data={userData[0]}
									role="hospital"
								/>
								<PrivateRoute
									exact
									path="/updatedailyreport"
									component={UpdateDailyReport}
									data={userData[0]}
									role="hospital"
								/>
								<PrivateRoute
									exact
									path="/doctorprofile"
									component={DoctorProfile}
									data={userData[0]}
									role="doctor"
								/>
								<PrivateRoute
									exact
									path="/ambulanceadmin"
									component={AmbulanceAdmin}
									role="admin"
									permission={["master", "ambulance"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/hospitaladmin"
									component={HospitalAdmin}
									role="admin"
									permission={["master", "hospital"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/doctoradmin"
									component={DoctorAdmin}
									role="admin"
									permission={["master", "doctor"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/adminlist"
									component={AdminList}
									role="admin"
									permission={["master"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/patientlist"
									component={PatientList}
									role="admin"
									permission={["master"]}
									data={userData[0]}
								/>

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
