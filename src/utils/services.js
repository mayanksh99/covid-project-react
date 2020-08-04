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
	UNASSIGNED_PATIENT,
	DECLINED_PATIENT,
	USER_PROFILE,
	UPDATE_PROFILE,
	GET_AMBULANCES,
	DEL_AMBULANCE,
	UPDATE_AMBULANCE,
	GET_PATIENT_BY_HOSPITAL,
	UPDATE_HOSPITAL,
	ADD_PATIENT_REPORT
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

export const getProfileService = async () => {
	setUserToken();
	try {
		const response = await axios.get(USER_PROFILE);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		console.log(err.response);
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
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getAdminsService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_ADMINS);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addAdminService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_ADMIN, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const delByAdminService = async (role, id) => {
	setUserToken();
	try {
		const response = await axios.delete(`${DEL_BY_ADMIN}/${role}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
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
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addDoctorService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_DOCTOR, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const searchDoctorService = async params => {
	setUserToken();
	try {
		const response = await axios.get(GET_DOCTORS, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
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
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addHospitalService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_HOSPITAL, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getHospitalByParamsServices = async params => {
	setUserToken();
	try {
		const response = await axios.get(GET_HOSPITALS, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getPatientByHospitalService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_PATIENT_BY_HOSPITAL}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getPatientByHospitalParamService = async (id, params) => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_PATIENT_BY_HOSPITAL}/${id}`, {
			params
		});
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const updateHospitalService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_HOSPITAL}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addPatientReportService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ADD_PATIENT_REPORT}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************AMBULANCE ADMIN SERVICES********************/

export const getAmbOperatorService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_AMBULANCE_OPERATOR);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addAmbOperatorService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_AMBULANCE_OPERATOR, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const searchAmbOperatorService = async params => {
	setUserToken();
	try {
		const response = await axios.get(GET_AMBULANCE_OPERATOR, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getAmbulanceService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_AMBULANCES);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getOperatorAmbService = async params => {
	setUserToken();
	try {
		const response = await axios.get(GET_AMBULANCES, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const delAmbulanceService = async id => {
	setUserToken();
	try {
		const response = await axios.del(`${DEL_AMBULANCE}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const updateAmbulanceService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_AMBULANCE}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
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
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const assignLevelService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ASSIGN_LEVEL}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getUnassignedPatientService = async () => {
	setUserToken();
	try {
		const response = await axios.get(UNASSIGNED_PATIENT);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getDeclinedPatientService = async () => {
	setUserToken();
	try {
		const response = await axios.get(DECLINED_PATIENT);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const updateProfileService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_PROFILE}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
