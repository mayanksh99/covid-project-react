import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import PatientExamine from "../components/Doctor/PatientExamine";
import AssignAmbulance from "../components/Ambulance/AssignAmbulance";
import AmbulanceStatus from "../components/Ambulance/AmbulanceStatus";
import AssignBed from "../components/Hospital/AssignBed";
import UpdateDailyReport from "../components/Hospital/UpdateDailyReport";
import DoctorProfile from "../components/Doctor/DoctorProfile";
import AmbAdminProfile from "../components/Ambulance/AmbAdminProfile";
import AssignHospital from "../components/Doctor/AssignHospital";

import {
	AppstoreOutlined,
	MedicineBoxOutlined,
	UserOutlined,
	CheckOutlined,
<<<<<<< HEAD
	SolutionOutlined
=======
	UsergroupAddOutlined,
	UserSwitchOutlined,
	BookOutlined
>>>>>>> upstream/master
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import AmbulanceAdmin from "../components/Admin/Ambulance/AmbulanceAdmin";
import HospitalAdmin from "./../components/Admin/Hospital/HospitalAdmin";
import DoctorAdmin from "./../components/Admin/Doctor/DoctorAdmin";
import AdminList from "./../components/Admin/AdminList";
import PatientList from "./../components/Admin/PatientList";

export const BedSvg = () => (
	<svg fill="currentColor" viewBox="0 0 640 512" height="1em" width="1em">
		<path
			d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"
			stroke="none"
		/>
	</svg>
);

const AmbulanceSvg = () => (
	<svg fill="currentColor" viewBox="0 0 640 512" height="1em" width="1em">
		<path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm144-248c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm176 248c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z" />
	</svg>
);

const AmbulanceIcon = props => <Icon component={AmbulanceSvg} {...props} />;
const BedIcon = props => <Icon component={BedSvg} {...props} />;

let routes = [
	{
		path: "/",
		exact: true,
		name: "Dashboard",
		component: Dashboard,
		key: "dashboard",
		icon: AppstoreOutlined
	},
	{
		path: "/patientexamine",
		exact: true,
		name: "Examine Patient",
		component: PatientExamine,
		key: "PatientExamine",
		icon: MedicineBoxOutlined
	},
	{
		path: "/hospitalassign",
		exact: true,
		name: "Assign Hospital",
		component: AssignHospital,
		key: "AssignHospital",
		icon: SolutionOutlined
	},
	{
		path: "/amb-admin-Profile",
		exact: true,
		name: "Amb-Admin Profile",
		component: AmbAdminProfile,
		key: "amb-admin-profile",
		icon: UserOutlined
	},
	{
		path: "/assignambulance",
		exact: true,
		component: AssignAmbulance,
		name: "Assign Ambulance",
		key: "AssignAmbulance",
		icon: AmbulanceIcon
	},
	{
		path: "/ambulancestatus",
		exact: true,
		component: AmbulanceStatus,
		name: "Ambulance Status",
		key: "AmbulanceStatus",
		icon: CheckOutlined
	},
	{
		path: "/assignbed",
		exact: true,
		component: AssignBed,
		name: "Assign Bed",
		key: "AssignBed",
		icon: BedIcon
	},
	{
		path: "/updatedailyreport",
		exact: true,
		component: UpdateDailyReport,
		name: "Update Daily Report",
		key: "UpdateDailyReport",
		icon: BookOutlined
	},
	{
		path: "/doctorprofile",
		exact: true,
		component: DoctorProfile,
		name: "Doctor Profile",
		key: "DoctorProfile",
		icon: UserOutlined
	},
	{
		path: "/ambulanceadmin",
		exact: true,
		component: AmbulanceAdmin,
		name: "Ambulance",
		key: "AmbulanceAdmin",
		icon: AmbulanceIcon
	},
	{
		path: "/hospitaladmin",
		exact: true,
		name: "Hospital",
		component: HospitalAdmin,
		key: "HospitalAdmin",
		icon: MedicineBoxOutlined
	},
	{
		path: "/doctoradmin",
		exact: true,
		name: "Doctor",
		component: DoctorAdmin,
		key: "DoctorAdmin",
		icon: MedicineBoxOutlined
	},
	{
		path: "/adminlist",
		exact: true,
		name: "Admin",
		component: AdminList,
		key: "AdminList",
		icon: UsergroupAddOutlined
	},
	{
		path: "/patientlist",
		exact: true,
		name: "Patient",
		component: PatientList,
		key: "PatientList",
		icon: UserSwitchOutlined
	}
];

export default routes;
