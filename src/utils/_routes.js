import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import PatientExamine from "../components/Doctor/PatientExamine";
import AssignAmbulance from "../components/Ambulance/AssignAmbulance";
import AmbulanceStatus from "../components/Ambulance/AmbulanceStatus";
import AssignBed from "../components/Hospital/AssignBed";
import UpdateDailyReport from "../components/Hospital/UpdateDailyReport";
import HospitalProfile from "../components/Hospital/HospitalProfile";
import DoctorProfile from "../components/Doctor/DoctorProfile";
import AmbOperatorProfile from "../components/Ambulance/AmbOperatorProfile";
import {
	AppstoreOutlined,
	MedicineBoxOutlined,
	CheckOutlined,
	UsergroupAddOutlined,
	UserSwitchOutlined,
	BookOutlined,
	UserOutlined
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import AmbulanceAdmin from "../components/Admin/Ambulance/AmbulanceAdmin";
import HospitalAdmin from "./../components/Admin/Hospital/HospitalAdmin";
import DoctorAdmin from "./../components/Admin/Doctor/DoctorAdmin";
import AdminList from "./../components/Admin/AdminList";
import PatientList from "./../components/Admin/PatientList";
import UnassignedPatients from "./../components/Doctor/UnassignedPatients";
import DeclinedPatient from "./../components/Doctor/DeclinedPatient";

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

const HospitalSvg = () => (
	<svg fill="currentColor" viewBox="0 0 640 512" height="1em" width="1em">
		<path
			d="M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 006 6h20a6 6 0 006-6V96h26a6 6 0 006-6V70a6 6 0 00-6-6h-26V38a6 6 0 00-6-6h-20a6 6 0 00-6 6v26h-26a6 6 0 00-6 6v20a6 6 0 006 6z"
			stroke="none"
		/>
	</svg>
);

const AmbulanceIcon = props => <Icon component={AmbulanceSvg} {...props} />;
const BedIcon = props => <Icon component={BedSvg} {...props} />;
const HospitalIcon = props => <Icon component={HospitalSvg} {...props} />;

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
		path: "/assignambulance",
		exact: true,
		component: AssignAmbulance,
		name: "Assign Ambulance",
		key: "AssignAmbulance",
		icon: AmbulanceIcon,
		role: "ambulanceoperator"
	},
	{
		path: "/ambulancestatus",
		exact: true,
		component: AmbulanceStatus,
		name: "Ambulance Status",
		key: "AmbulanceStatus",
		icon: CheckOutlined,
		role: "ambulanceoperator"
	},
	{
		path: "/amb-admin-Profile",
		exact: true,
		name: "Profile",
		component: AmbOperatorProfile,
		key: "profile",
		icon: UserOutlined,
		role: "ambulanceoperator"
	},
	{
		path: "/assignbed",
		exact: true,
		component: AssignBed,
		name: "Assign Bed",
		key: "AssignBed",
		icon: BedIcon,
		role: "hospital"
	},
	{
		path: "/updatedailyreport",
		exact: true,
		component: UpdateDailyReport,
		name: "Update Daily Report",
		key: "UpdateDailyReport",
		icon: BookOutlined,
		role: "hospital"
	},
	{
		path: "/hospitalprofile",
		exact: true,
		component:HospitalProfile,
		name: "Profile",
		key: "HospitalProfile",
		icon: UserOutlined,
		role: "hospital"
	},
	{
		path: "/patientexamine",
		exact: true,
		name: "Examine Patient",
		component: PatientExamine,
		key: "PatientExamine",
		icon: MedicineBoxOutlined,
		role: "doctor"
	},
	{
		path: "/unassignedpatient",
		exact: true,
		name: "Unassigned Patient",
		component: UnassignedPatients,
		key: "UnassignedPatients",
		icon: MedicineBoxOutlined,
		role: "doctor"
	},
	{
		path: "/declinedpatient",
		exact: true,
		name: "Declined Patient",
		component: DeclinedPatient,
		key: "DeclinedPatient",
		icon: MedicineBoxOutlined,
		role: "doctor"
	},
	{
		path: "/doctorprofile",
		exact: true,
		component: DoctorProfile,
		name: "Doctor Profile",
		key: "DoctorProfile",
		icon: UserOutlined,
		role: "doctor"
	},
	{
		path: "/ambulanceadmin",
		exact: true,
		component: AmbulanceAdmin,
		name: "Ambulance",
		key: "AmbulanceAdmin",
		icon: AmbulanceIcon,
		role: "admin",
		permission: ["master", "ambulance"]
	},
	{
		path: "/hospitaladmin",
		exact: true,
		name: "Hospital",
		component: HospitalAdmin,
		key: "HospitalAdmin",
		icon: HospitalIcon,
		role: "admin",
		permission: ["master", "hospital"]
	},
	{
		path: "/doctoradmin",
		exact: true,
		name: "Doctor",
		component: DoctorAdmin,
		key: "DoctorAdmin",
		icon: MedicineBoxOutlined,
		role: "admin",
		permission: ["master", "doctor"]
	},
	{
		path: "/adminlist",
		exact: true,
		name: "Admin",
		component: AdminList,
		key: "AdminList",
		icon: UsergroupAddOutlined,
		role: "admin",
		permission: ["master"]
	},
	{
		path: "/patientlist",
		exact: true,
		name: "Patient",
		component: PatientList,
		key: "PatientList",
		icon: UserSwitchOutlined,
		role: "admin",
		permission: ["master"]
	}
];

export default routes;
