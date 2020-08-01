export const LOGIN = "/users/login"; //POST

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

/******************HOSPITAL ADMIN ROUTES********************/
export const GET_AMBULANCE_OPERATOR = "/ambulances/operator"; //GET
export const ADD_AMBULANCE_OPERATOR = "/ambulances/operator"; //POST

/******************DOCTOR ROUTES********************/
export const ATTEND_PATIENT = "/doctors/patients/attend"; //POST
export const ASSIGN_LEVEL = "/doctors/patients/level"; //POST
export const UNASSIGNED_PATIENT = "/doctors/patients/unassigned"; //POST
