import axios from "axios";
import {
	LOGIN,
	AMBULANCEUNDER,
	UPDATESTATUS,
	CHANGEPASSWORD,
	ADDAMBULANCE,
	ADD_PATIENT,
	GET_ADMINS,
	ADD_ADMIN,
	DEL_BY_ADMIN,
	GET_DOCTORS,
	ADD_DOCTOR,
	GET_HOSPITALS,
	ADD_HOSPITAL,
	GET_AMBULANCE_OPERATOR,
	ADD_AMBULANCE_OPERATOR
} from "./routes";

const BASE_URL = "https://covid-project-gzb.herokuapp.com/api/v1";

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
/*************Get Ambulance Under Operator**********/
export async function getAllAmbulanceUnder(id) {
	try {
		setUserToken();
		const response = await axios.get(`${AMBULANCEUNDER}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data
			};
		}
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

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

/*******************Update Ambulance status*******************/

export async function updateStatus(newStatus, id) {
	// let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	// if (AUTH_TOKEN.token !== "") {
	// 	if (AUTH_TOKEN.token.includes("Logout")) {
	// 		localStorage.clear();
	// 		window.location.push("/login");
	// 	}
	// 	axios.defaults.headers.common["x-auth-token"] =
	// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTMzZTJiMTgxOTM2MWUxMDE2Y2U5MiIsIm5hbWUiOiJSb290IEFtYnVsYW5jZSBBZG1pbiIsImVtYWlsIjoid2FkaW5pMjgzM0BleHBsb3JheGIuY29tIiwicm9sZSI6ImFkbWluIiwicGVybWlzc2lvbnMiOlsiYW1idWxhbmNlIl0sImlhdCI6MTU5NTA5NzAyMH0.D_ipFqsNflrZLwc2_GrS8fQ_-8M6zsgc8vMSxuezvD4";
	// }
	try {
		setUserToken();
		const response = await axios.put(`${UPDATESTATUS}/${id}`, {
			status: `${newStatus}`
		});
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data
			};
		}
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

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

/*********************Change user password********************/

export async function changePassword(values) {
	try {
		setUserToken();
		const response = await axios.post(`${CHANGEPASSWORD}`, values);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data
			};
		}
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

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

/*****************Add Ambulance******************************/

export async function addAmbulance(values, id) {
	try {
		setUserToken();
		const response = await axios.post(`${ADDAMBULANCE}/${id}`, values);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data
			};
		}
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

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
