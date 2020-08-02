import axios from "axios";
import {
	LOGIN,
	ADD_PATIENT,
	GET_ADMINS,
	ADD_ADMIN,
	DEL_BY_ADMIN,
	GET_DOCTORS,
	ADD_DOCTOR,
	GET_HOSPITALS,
	ADD_HOSPITAL,
	GET_AMBULANCE_OPERATOR,
	ADD_AMBULANCE_OPERATOR,
	ATTEND_PATIENT,
	ASSIGN_LEVEL,
	ADD_REPORT,
	GET_ADMITTED_PATIENTS,
	GET_ALLOTED_PATIENTS
} from "./routes";

const BASE_URL = "https://covid-project-gzb.herokuapp.com/api/v1";
export const EndPoint = "https://covid-project-gzb.herokuapp.com";
axios.defaults.baseURL = BASE_URL;

function setUserToken() {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	if (AUTH_TOKEN.token !== "") {
		if (AUTH_TOKEN.token.includes("Logout")) {
			localStorage.clear();
			window.location.push("/login");
		}
		axios.defaults.headers.common["x-auth-token"] = AUTH_TOKEN.token;
	}
}

/******************AUTH SERVICES********************/

export const loginService = async (role, data) => {
	try {
		const response = await axios.post(`${LOGIN}/${role}`, data);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data,
				token: response.headers["x-auth-token"]
			};
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************MASTER ADMIN SERVICES********************/

export const addPatientService = async data => {
	setUserToken();
	try {
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		};
		const response = await axios.post(ADD_PATIENT, data, config);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getAdminsService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_ADMINS);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addAdminService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_ADMIN, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const delByAdminService = async (role, id) => {
	setUserToken();
	try {
		const response = await axios.delete(`${DEL_BY_ADMIN}/${role}/${id}`);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************DOCTOR ADMIN SERVICES********************/

export const getDoctorsService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_DOCTORS);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addDoctorService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_DOCTOR, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************HOSPITAL ADMIN SERVICES********************/

export const getHospitalsService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_HOSPITALS);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addHospitalService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_HOSPITAL, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************HOSPITAL ADMIN SERVICES********************/

export const getAmbOperatorService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_AMBULANCE_OPERATOR);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addAmbOperatorService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_AMBULANCE_OPERATOR, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
/******************DOCTOR SERVICES********************/

export const attendPatientService = async id => {
	setUserToken();
	try {
		const response = await axios.post(`${ATTEND_PATIENT}/${id}`);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const assignLevelService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ASSIGN_LEVEL}/${id}`, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
/*******************HOSPITAL SERVICES ******************/
export const getadmittedPatientsService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_ADMITTED_PATIENTS}/${id}`);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addReportService = async (id,data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ADD_REPORT}/${id}`, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

