export const LOGIN = "/users/login"; //POST
export const USER_PROFILE = "/users/profile"; //GET

/******************MASTER ADMIN ROUTES********************/

export const ADD_PATIENT = "/admins/patients"; //POST
export const GET_PATIENT = "/admins/patients"; //GET
export const GET_ADMINS = "/admins"; //GET
export const ADD_ADMIN = "/admins"; //POST
export const DEL_BY_ADMIN = "/users"; //DELETE
export const RESET_PWD_BY_ADMIN = "/users/reset-pwd"; // POST
export const UPDATE_ADMIN = "/admins?aid="; //PUT
export const ADD_BULK_PATIENTS = "/admins/patients/bulk"; //POST

/******************DOCTOR ADMIN ROUTES********************/
export const GET_DOCTORS = "/doctors"; //GET
export const ADD_DOCTOR = "/doctors"; //POST
export const DOCTOR_PROFILE = "/doctors/profile?did="; //GET
export const PATIENT_UNDER_DOCTOR = "/doctors/patients"; //GET
export const UPDATE_DOCTOR = "/doctors?did="; //PUT

/******************HOSPITAL ADMIN ROUTES********************/
export const GET_HOSPITALS = "/hospitals"; //GET
export const GET_AVAILABLE_HOSPITALS = "/hospitals/available"; //GET
export const ADD_HOSPITAL = "/hospitals"; //POST
export const GET_PATIENT_BY_HOSPITAL = "/hospitals/patients/admitted?hid="; //GET
export const UPDATE_HOSPITAL = "/hospitals/?hid="; //PUT
export const ADD_PATIENT_REPORT = "/hospitals/report"; //POST

/******************AMBULANCE ADMIN ROUTES********************/
export const GET_AMBULANCES = "/ambulances"; //GET
export const GET_AMBULANCE_OPERATOR = "/ambulances/operator"; //GET
export const ADD_AMBULANCE_OPERATOR = "/ambulances/operator"; //POST
export const DEL_AMBULANCE = "/ambulances/delete"; //DEL
export const UPDATE_AMBULANCE = "/ambulances/update?aid="; //PUT
export const UPDATE_OPERATOR = "/ambulances/operator"; //PUT
export const ADD_AMBULANCE = "/ambulances/add"; //POST
export const GET_AMBULANCE_DUTIES = "/ambulances/duties?aid="; //GET
export const GET_AMBULANCE_DUTY = "/ambulances/duties/single?did="; //GET

/******************DOCTOR ROUTES********************/
export const ATTEND_PATIENT = "/doctors/patients/attend?pid="; //POST
export const ASSIGN_LEVEL = "/doctors/patients/level?pid="; //POST
export const UNASSIGNED_PATIENT = "/doctors/patients/unassigned"; //GET
export const DECLINED_PATIENT = "/doctors/patients/declined"; //GET
export const UPDATE_PROFILE = "/doctors"; //POST
export const ADD_BULK_DOCTORS = "/doctors/bulk"; //POST

/******************HOSPITAL ROUTES***********************/
export const GET_ADMITTED_PATIENTS = "/hospitals/patients/admitted?hid="; //GET
export const ADD_REPORT = "hospitals/report?hid="; //POST
export const GET_PATIENT_DETAILS = "/hospitals/patients/alloted?hid="; //GET
export const ASSIGN_BED = "/hospitals/admit?hid="; //POST
export const DISCHARGE_PATIENT = "/hospitals/discharge?hid="; //POST
export const HOSPITAL_UPDATE_PROFILE = "/hospitals/?hid="; //PUT
export const ADD_BULK_HOSPITALS = "/hospitals/bulk"; //POST

/******************AMBULANCE ROUTES********************/

export const AMBULANCEUNDER = "/ambulances"; //GET
export const CHANGEPASSWORD = "/users/change-pwd"; //POST
export const ADDAMBULANCE = "/ambulances/add?aoid="; //POST
export const START_ATTEND_PATIENT_FOR_AMBULANCE = "/ambulances/patients/attend"; //POST
export const ALLOT_AMBULANCE_FOR_PATIENT = "/ambulances/patients/assign?pid="; //POST
export const ADD_BULK_AMBULANCES = "/ambulances/bulk?aoid="; //POST
export const PATIENT_DECLIED = "/ambulances/patients/declined?aid="; //POST
export const END_TRIP = "/ambulances/patients/end-trip?aid="; //POST
