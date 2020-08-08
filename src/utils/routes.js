export const LOGIN = "/users/login"; //POST
export const USER_PROFILE = "/users/profile"; //GET

/******************MASTER ADMIN ROUTES********************/

export const ADD_PATIENT = "/admins/patients"; //POST
export const GET_PATIENT = "/admins/patients"; //GET
export const GET_ADMINS = "/admins"; //GET
export const ADD_ADMIN = "/admins"; //POST
export const DEL_BY_ADMIN = "/users"; //DELETE

/******************DOCTOR ADMIN ROUTES********************/
export const GET_DOCTORS = "/doctors"; //GET
export const ADD_DOCTOR = "/doctors"; //POST
export const DOCTOR_PROFILE = "/doctors/profile"; //GET
export const PATIENT_UNDER_DOCTOR = "/doctors/patients"; //GET
export const UPDATE_DOCTOR = "/doctors"; //PUT

/******************HOSPITAL ADMIN ROUTES********************/
export const GET_HOSPITALS = "/hospitals"; //GET
export const ADD_HOSPITAL = "/hospitals"; //POST
export const GET_PATIENT_BY_HOSPITAL = "/hospitals/patients/admitted"; //GET
export const UPDATE_HOSPITAL = "/hospitals"; //PUT
export const ADD_PATIENT_REPORT = "/hospitals/report"; //POST

/******************AMBULANCE ADMIN ROUTES********************/
export const GET_AMBULANCES = "/ambulances"; //GET
export const GET_AMBULANCE_OPERATOR = "/ambulances/operator"; //GET
export const ADD_AMBULANCE_OPERATOR = "/ambulances/operator"; //POST
export const DEL_AMBULANCE = "/ambulances/delete"; //DEL
export const UPDATE_AMBULANCE = "/ambulances/update"; //PUT
export const UPDATE_OPERATOR = "/ambulances/operator"; //PUT
export const ADD_AMBULANCE = "/ambulances/add"; //POST

/******************DOCTOR ROUTES********************/
export const ATTEND_PATIENT = "/doctors/patients/attend"; //POST
export const ASSIGN_LEVEL = "/doctors/patients/level"; //POST
export const UNASSIGNED_PATIENT = "/doctors/patients/unassigned"; //GET
export const DECLINED_PATIENT = "/doctors/patients/declined"; //GET
export const UPDATE_PROFILE = "/doctors"; //POST

/******************HOSPITAL ROUTES***********************/
export const GET_ADMITTED_PATIENTS = "/hospitals/patients/admitted"; //GET
export const ADD_REPORT = "hospitals/report"; //POST
export const GET_PATIENT_DETAILS = "/hospitals/patients/alloted"; //GET
export const ASSIGN_BED = "/hospitals/admit"; //POST
export const DISCHARGE_PATIENT = "/hospitals/discharge/"; //POST

/******************AMBULANCE ROUTES********************/

export const AMBULANCEUNDER = "/ambulances"; //GET
export const UPDATESTATUS = "/ambulances/update"; //PUT
export const CHANGEPASSWORD = "/users/change-pwd"; //POST
export const ADDAMBULANCE = "/ambulances/add"; //POST
export const START_ATTEND_PATIENT_FOR_AMBULANCE =
	"/ambulances/patients/attend/"; //POST
export const ALLOT_AMBULANCE_FOR_PATIENT = "/ambulances/patients/assign/"; //POST
