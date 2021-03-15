import React, { useState } from "react";
import {
	Redirect,
	Switch,
	BrowserRouter as Router,
	Link
} from "react-router-dom";
import "./style.css";
import { Layout, Menu, Row, Col, Modal, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { getRole } from "./../../utils/_helper";
import BellNotification from "./../../utils/BellNotification";
import routes from "../../utils/_routes";
import PrivateRoute from "./PrivateRoute";
import AmbulanceOperatorDetails from "../Admin/Ambulance/AmbulanceOperatorDetails";
import HospitalDetails from "./../Admin/Hospital/HospitalDetails";
import PatientExamine from "./../Doctor/PatientExamine";
import AmbOperatorProfile from "./../Ambulance/AmbOperatorProfile";
import AssignAmbulance from "./../Ambulance/AssignAmbulance";
import AmbulanceStatus from "./../Ambulance/AmbulanceStatus";
import AssignBed from "./../Hospital/AssignBed";
import UpdateDailyReport from "./../Hospital/UpdateDailyReport";
import HospitalProfile from "./../Hospital/HospitalProfile";
import DoctorProfile from "./../Doctor/DoctorProfile";
import AmbulanceAdmin from "./../Admin/Ambulance/AmbulanceAdmin";
import HospitalAdmin from "./../Admin/Hospital/HospitalAdmin";
import DoctorAdmin from "./../Admin/Doctor/DoctorAdmin";
import AdminList from "./../Admin/AdminList";
import PatientList from "./../Admin/PatientList";
import DoctorDetail from "../Admin/Doctor/DoctorDetail";
import DoctorEditProfile from "../Doctor/DoctorEditProfile";
import UnassignedPatients from "../Doctor/UnassignedPatients";
import DeclinedPatient from "./../Doctor/DeclinedPatient";
import AmbulanceDuties from "../Ambulance/AmbulanceDuties";
const { Content, Sider, Footer } = Layout;

const Dashboard = props => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const userData = useState(getRole());
	const [isVisible, setIsVisible] = useState(false);

	// const handleOk = () =>
	// 						{
	// 							setIsVisible(!isVisible);
	// 						};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	const showModal = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<Router>
				<Layout>
					<Sider
						// theme="light"
						// trigger={null}
						collapsible
						collapsed={isCollapsed}
						// width={240}
						breakpoint="xl"
						collapsedWidth="0"
						// onBreakpoint={broken => {
						// 	console.log(broken);
						// }}
						onCollapse={collapsed => {
							setIsCollapsed(collapsed);
						}}
					>
						<Menu
							theme="light"
							mode="inline"
							// defaultSelectedKeys={"dashboard"}
						>
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
											<Menu.Item
												onClick={() =>
													setIsCollapsed(true)
												}
												key={route.key}
											>
												<route.icon />
												<span>{route.name}</span>
												<Link to={route.path} />
											</Menu.Item>
										);
									}
								} else if (route.role === userData[0].role) {
									return (
										<Menu.Item
											onClick={() => setIsCollapsed(true)}
											key={route.key}
										>
											<route.icon />
											<span>{route.name}</span>
											<Link to={route.path} />
										</Menu.Item>
									);
								}
								return 0;
							})}

							<Menu.Item key={"signout"} onClick={showModal}>
								<LockOutlined />
								<span>Sign Out</span>
							</Menu.Item>

							<Menu.Divider />

							{/* <Menu.Item
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
							</Menu.Item> */}
						</Menu>
					</Sider>

					<Layout>
						<Content
							style={{
								paddingTop: 24,
								paddingRight: 24,
								paddingBottom: 24,
								paddingLeft: 50,
								background: "#f9f9f9",
								minHeight: "100vh"
								// zIndex: -1
							}}
						>
							<Switch>
								{/* <Route exact path="/" component={Dashboard} /> */}
								<PrivateRoute
									exact
									path="/doctors/patients/examine"
									component={PatientExamine}
									data={userData[0]}
									role="doctor"
								/>
								<PrivateRoute
									exact
									path="/ambulance-operators/profile"
									component={AmbOperatorProfile}
									role="ambulanceoperator"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/ambulance-operators/ambulances/assign"
									component={AssignAmbulance}
									role="ambulanceoperator"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/ambulance-operators/ambulances/duties/:did"
									component={AmbulanceDuties}
									role="ambulanceoperator"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/ambulance-operators/ambulances/status"
									component={AmbulanceStatus}
									data={userData[0]}
									role="ambulanceoperator"
								/>
								<PrivateRoute
									exact
									path="/hospitals/patients/assign-bed"
									component={AssignBed}
									data={userData[0]}
									role="hospital"
								/>
								<PrivateRoute
									exact
									path="/hospitals/patients/update-daily-report"
									component={UpdateDailyReport}
									data={userData[0]}
									role="hospital"
								/>
								<PrivateRoute
									exact
									path="/hospital/profile"
									component={HospitalProfile}
									data={userData[0]}
									role="hospital"
								/>
								<PrivateRoute
									exact
									path="/doctors/profile"
									component={DoctorProfile}
									data={userData[0]}
									role="doctor"
								/>
								<PrivateRoute
									exact
									path="/admins/ambulance-operators"
									component={AmbulanceAdmin}
									role="admin"
									permission={["master", "ambulance"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/admins/hospitals"
									component={HospitalAdmin}
									role="admin"
									permission={["master", "hospital"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/admins/doctors"
									component={DoctorAdmin}
									role="admin"
									permission={["master", "doctor"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/admins"
									component={AdminList}
									role="admin"
									permission={["master"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/admins/patients"
									component={PatientList}
									role="admin"
									permission={["master"]}
									data={userData[0]}
								/>

								<Redirect from="/dashboard" to="/" />
								<PrivateRoute
									exact
									path="/admins/ambulance-operators/:id"
									component={AmbulanceOperatorDetails}
									role="admin"
									permission={["master", "ambulance"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/admins/hospitals/:id"
									component={HospitalDetails}
									role="admin"
									permission={["master", "hospital"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/admins/doctors/:id"
									component={DoctorDetail}
									role="admin"
									permission={["master", "hospital"]}
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/doctors/profile/:id"
									component={DoctorEditProfile}
									role="doctor"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/doctors/patients/unassigned"
									component={UnassignedPatients}
									role="doctor"
									data={userData[0]}
								/>
								<PrivateRoute
									exact
									path="/doctors/patients/declined"
									component={DeclinedPatient}
									role="doctor"
									data={userData[0]}
								/>
							</Switch>
						</Content>
					</Layout>
					<BellNotification userData={userData} />
				</Layout>
				<Footer>
					<Row>
						<Col span={12}>
							<img
								src="/assets/images/covid.png"
								alt="logo"
								width="180px"
							/>
						</Col>
						{/* <Col span={12}>
							<p className="paragraph">
								&copy; copyright 2020 DSC KIET - Developed by{" "}
								<a href="https://dsckiet.com">
									<b>DSC KIET</b>
								</a>
							</p>
						</Col> */}
					</Row>
				</Footer>
			</Router>

			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Warning!
					</h3>
				}
				visible={isVisible}
				centered
				onCancel={handleCancel}
				width={400}
				footer={[
					<Button
						key="submit"
						type="primary"
						onClick={() => {
							localStorage.clear();
							props.history.push("/login");
						}}
					>
						Sign Out
					</Button>
				]}
			>
				<p>Do You want to SignOut</p>
			</Modal>
		</>
	);
};

export default Dashboard;
