export const AMBULANCEUNDER = "/ambulances"; //GET
export const UPDATESTATUS = "/ambulances/update"; //PUT
export const CHANGEPASSWORD = "/users/change-pwd"; //POST
export const ADDAMBULANCE = "/ambulances/add"; //POST
export const LOGIN = "/users/login"; //POST
export const START_ATTEND_PATIENT_FOR_AMBULANCE =
	"/ambulances/patients/attend/"; //POST
export const ALLOT_AMBULANCE_FOR_PATIENT = "/ambulances/patients/assign/"; //POST
export const USER_PROFILE = "/users/profile"; //GET

/******************MASTER ADMIN ROUTES********************/

export const ADD_PATIENT = "/admins/patients"; //POST
export const GET_ADMINS = "/admins"; //GET
export const ADD_ADMIN = "/admins"; //POST
export const DEL_BY_ADMIN = "/users"; //DELETE

/******************DOCTOR ADMIN ROUTES********************/
export const GET_DOCTORS = "/doctors"; //GET
export const ADD_DOCTOR = "/doctors"; //POST

/******************HOSPITAL ADMIN ROUTES********************/
export const GET_HOSPITALS = "/hospitals"; //GET
export const ADD_HOSPITAL = "/hospitals"; //POST

/******************AMBULANCE ADMIN ROUTES********************/
export const GET_AMBULANCES = "/ambulances"; //GET
export const GET_AMBULANCE_OPERATOR = "/ambulances/operator"; //GET
export const ADD_AMBULANCE_OPERATOR = "/ambulances/operator"; //POST

/******************DOCTOR ROUTES********************/
export const ATTEND_PATIENT = "/doctors/patients/attend"; //POST
export const ASSIGN_LEVEL = "/doctors/patients/level"; //POST
export const UNASSIGNED_PATIENT = "/doctors/patients/unassigned"; //GET
export const DECLINED_PATIENT = "/doctors/patients/declined"; //GET
export const UPDATE_PROFILE = "/doctors"; //POST
