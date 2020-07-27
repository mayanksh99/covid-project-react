import { notification } from "antd";
import jwt from "jwt-decode";

const _notification = (type, title, description) => {
	return notification[type]({
		message: title,
		description,
		duration: 2
	});
};

export { _notification };

export const getRole = () => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	let decode = jwt(AUTH_TOKEN.token);
	return decode;
};
