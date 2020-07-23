import { notification } from "antd";

const _notification = (type, title, description) => {
	return notification[type]({
		message: title,
		description,
		duration: 2
	});
};

export { _notification };
