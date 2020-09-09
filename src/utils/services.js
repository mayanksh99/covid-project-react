import axios from "axios";
import {
	LOGIN,
	AMBULANCEUNDER,
	CHANGEPASSWORD,
	ADDAMBULANCE,
	ADD_PATIENT,
	GET_ADMINS,
	ADD_ADMIN,
	DEL_BY_ADMIN,
	RESET_PWD_BY_ADMIN,
	GET_DOCTORS,
	ADD_DOCTOR,
	GET_HOSPITALS,
	ADD_HOSPITAL,
	GET_AMBULANCE_OPERATOR,
	ADD_AMBULANCE_OPERATOR,
	START_ATTEND_PATIENT_FOR_AMBULANCE,
	ALLOT_AMBULANCE_FOR_PATIENT,
	ATTEND_PATIENT,
	ASSIGN_LEVEL,
	ADD_REPORT,
	GET_ADMITTED_PATIENTS,
	UNASSIGNED_PATIENT,
	DECLINED_PATIENT,
	GET_PATIENT_DETAILS,
	ASSIGN_BED,
	USER_PROFILE,
	UPDATE_PROFILE,
	GET_AMBULANCES,
	DEL_AMBULANCE,
	UPDATE_AMBULANCE,
	GET_PATIENT_BY_HOSPITAL,
	UPDATE_HOSPITAL,
	HOSPITAL_UPDATE_PROFILE,
	ADD_PATIENT_REPORT,
	DOCTOR_PROFILE,
	PATIENT_UNDER_DOCTOR,
	UPDATE_DOCTOR,
	DISCHARGE_PATIENT,
	ADD_AMBULANCE,
	GET_PATIENT,
	UPDATE_OPERATOR,
	UPDATE_ADMIN,
	GET_AMBULANCE_DUTIES,
	PATIENT_DECLIED,
	GET_AMBULANCE_DUTY,
	END_TRIP
} from "./routes";
export const BASE_URL = "https://covid-project-gzb.herokuapp.com/api/v1";
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
/*************Get Ambulance Under Operator**********/
export async function getAllAmbulanceUnder(id) {
	setUserToken();
	try {
		const config = {
			params: {
				aoid: `${id}`
			}
		};
		const response = await axios.get(AMBULANCEUNDER, config);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function getAllAvailableAmbulanceUnder(id) {
	setUserToken();
	try {
		const config = {
			params: {
				aoid: `${id}`,
				status: "available"
			}
		};
		const response = await axios.get(AMBULANCEUNDER, config);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

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

export const getPatientsService = async params => {
	setUserToken();
	try {
		const response = await axios.get(GET_PATIENT, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getParticularPatientService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_PATIENT}/single?pid=${id}`);
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
		const response = await axios.delete(`${DEL_BY_ADMIN}/${role}?id=${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const resetPwdByAdminService = async (role, id) => {
	setUserToken();
	try {
		const response = await axios.post(
			`${RESET_PWD_BY_ADMIN}/${role}?id=${id}`
		);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const searchAdminsService = async params => {
	setUserToken();
	try {
		const response = await axios.get(GET_ADMINS, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export async function updateAdminService(id, data) {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_ADMIN}${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

// /*******************Update Ambulance *******************/

export const updateAmbulanceService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_AMBULANCE}${id}`, data);
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

export const getDoctorProfileService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${DOCTOR_PROFILE}${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getPatientUnderDoctorService = async (status, params) => {
	setUserToken();
	try {
		const response = await axios.get(`${PATIENT_UNDER_DOCTOR}/${status}`, {
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

export const updateDoctorService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_DOCTOR}${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
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
		} else return response.data;
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
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/*****************Add Ambulance******************************/

export async function addAmbulance(values, id) {
	try {
		setUserToken();
		const response = await axios.post(`${ADDAMBULANCE}${id}`, values);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data
			};
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

/**********ALLOT AMBULANCE SERVICE**************/

export const startAttentPatientForAmbulance = async id => {
	setUserToken();
	try {
		const response = await axios.post(
			`${START_ATTEND_PATIENT_FOR_AMBULANCE}?pid=${id}`
		);
		if (response.status === 200 && response.data.error === false)
			return response.data;
		else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const allotAmbulanceForPatient = async (patientId, data) => {
	setUserToken();
	try {
		const response = await axios.post(
			`${ALLOT_AMBULANCE_FOR_PATIENT}${patientId}`,
			data
		);
		if (response.status === 200 && response.data.error === false)
			return response.data;
		else return response.data;
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
		const response = await axios.get(`${GET_PATIENT_BY_HOSPITAL}${id}`);
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
		const response = await axios.get(`${GET_PATIENT_BY_HOSPITAL}${id}`, {
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

export const getAllotedPatientService = async (id, params) => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_PATIENT_DETAILS}${id}`, {
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
		const response = await axios.put(`${UPDATE_HOSPITAL}${id}`, data);
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

export const getAmbulanceDuties = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_AMBULANCE_DUTIES}${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getAmbulanceDuty = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_AMBULANCE_DUTY}${id}`);
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

export const updateOperatorService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_OPERATOR}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addAmbulanceService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ADD_AMBULANCE}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const declinedPatientService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${PATIENT_DECLIED}${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const endTripService = async id => {
	setUserToken();
	try {
		const response = await axios.post(`${END_TRIP}${id}`);
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
		const response = await axios.post(`${ATTEND_PATIENT}${id}`);
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
		const response = await axios.post(`${ASSIGN_LEVEL}${id}`, data);
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
/*******************HOSPITAL SERVICES ******************/
export const getadmittedPatientsService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_ADMITTED_PATIENTS}${id}`);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addReportService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ADD_REPORT}${id}`, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
export const searchAdmittedPatientsService = async (id, params) => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_ADMITTED_PATIENTS}${id}`, {
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
export const dischargePatientService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${DISCHARGE_PATIENT}${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
export const updateHospitalProfileService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(
			`${HOSPITAL_UPDATE_PROFILE}${id}`,
			data
		);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
/**************************HOSPITAL SERVICES**************/

export async function getPatientDetails(id) {
	try {
		setUserToken();
		const response = await axios.get(`${GET_PATIENT_DETAILS}${id}`);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export const assignPatientBed = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ASSIGN_BED}${id}`, data);
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const searchPatients = async (id, params) => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_PATIENT_DETAILS}${id}`, {
			params
		});
		if (response.status === 200 && response.data.error === false)
			return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getHospitalProfileService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_HOSPITALS}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
