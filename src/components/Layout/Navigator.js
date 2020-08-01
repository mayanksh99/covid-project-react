import React, { useState } from "react";
import {
	Redirect,
	Switch,
	BrowserRouter as Router,
	Link
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getRole } from "./../../utils/_helper";
import routes from "../../utils/_routes";
import PrivateRoute from "./PrivateRoute";
import AmbulanceAdminDetails from "../Admin/Ambulance/AmbulanceAdminDetails";
import HospitalDetails from "./../Admin/Hospital/HospitalDetails";
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
import DoctorDetail from "../Admin/Doctor/DoctorAdminDetail";
import DoctorEditProfile from "../Doctor/DoctorEditProfile";
import UnassignedPatients from "../Doctor/UnassignedPatients";
import DeclinedPatient from "./../Doctor/DeclinedPatient";
const { Content, Sider } = Layout;

const Dashboard = props => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const userData = useState(getRole());

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
							{/* <Menu.Item key={"dashboard"}>
								<AppstoreOutlined />
								<span>Dashboard</span>
								<Link to="/" />
							</Menu.Item> */}

							{routes.map((route, idx) => {
								if (
									route.role === userData[0].role &&
									route.role === "admin"
								) {
									if (
										userData[0].permissions.some(
											r =>
												route.permission.indexOf(r) >= 0
										)
									) {
										return (
											<Menu.Item key={route.key}>
												<route.icon />
												<span>{route.name}</span>
												<Link to={route.path} />
											</Menu.Item>
										);
									}
								} else if (route.role === userData[0].role) {
									return (
										<Menu.Item key={route.key}>
											<route.icon />
											<span>{route.name}</span>
											<Link to={route.path} />
										</Menu.Item>
									);
								}
								return 0;
							})}

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
								{/* <Route exact path="/" component={Dashboard} /> */}
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
								<PrivateRoute
									exact
									path="/hospitaldetails/:id"
									component={HospitalDetails}
									role="admin"
									permission={["master", "hospital"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/doctordetails/:id"
									component={DoctorDetail}
									role="admin"
									permission={["master", "hospital"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/doctorprofile/edit"
									component={DoctorEditProfile}
									role="doctor"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/unassignedpatient"
									component={UnassignedPatients}
									role="doctor"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/declinedpatient"
									component={DeclinedPatient}
									role="doctor"
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

export default Dashboard;
