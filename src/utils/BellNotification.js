import React, { useState, useEffect, useContext } from "react";
import { Badge, Popover, Card, Spin, notification } from "antd";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import { EndPoint } from "./services";
import { AuthContext } from "../contexts/userContext";
import { BellOutlined, InfoCircleOutlined } from "@ant-design/icons";

const BellNotification = () => {
	const [bellColor, setBellColor] = useState("Black");
	const [content, setContent] = useState(null);
	const [unseen, setUnseen] = useState(0);
	const [count, setCount] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const Data = useContext(AuthContext);
	let history = useHistory();

	const handleVisibleChange = visible => {
		setIsVisible(visible);
	};

	useEffect(() => {
		let total;
		let socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("NOTIFICATIONS_LIST", res => {
			total = res.filter(notif => {
				return !notif.seen;
			}).length;
			setUnseen(total);

			if (total > 3) {
				notification.open({
					message: "Pending Notifications !",
					description: `You have ${total} unseen notifications !`,
					icon: <InfoCircleOutlined style={{ color: "#108ee9" }} />,
					duration: 5
				});
			} else if (total >= 1 && total <= 3) {
				notification.open({
					message: `${res[0].title}`,
					description: `${res[0].description}`,
					icon: <InfoCircleOutlined style={{ color: "#108ee9" }} />,
					duration: 0
				});
			}

			setCount(res.length);
			console.log(res);
			if (res.length) {
				setContent(
					res.map((notification, i) => (
						<Card
							onClick={() => {
								if (!notification.seen)
									socket.emit("markNotificationSeen", {
										token: Data.token,
										nid: notification._id
									});
								history.push(`${notification.path}`, {
									title: notification.title,
									seen: notification.seen,
									description: notification.description,
									declined: notification.description.search(
										"DECLINED"
									),
									completed: notification.description.search(
										"COMPLETED"
									)
								});
								setIsVisible(false);
							}}
							key={++i}
							title={
								<div>
									<Badge
										count={i}
										style={{
											backgroundColor: `${
												notification.seen
													? "#fafbfc"
													: "#fff"
											}`,
											color: " #1890ff",
											boxShadow:
												"0 0 0 1px #1890ff inset",
											marginTop: "-3px",
											marginRight: "10px"
										}}
									/>
									{notification.title}
									{notification.seen ? null : (
										<Badge
											status="processing"
											style={{ float: "right" }}
										/>
									)}
								</div>
							}
							size={"small"}
							style={{
								backgroundColor: `${
									notification.seen ? "#ededed" : "#fff"
								}`,
								marginBottom: `${i !== count ? "10px" : "0px"}`,
								cursor: "pointer",
								marginRight: "7px"
							}}
						>
							<div>
								{notification.description}
								<div
									style={{
										paddingTop: "20px",
										fontSize: "12px",
										float: "right"
									}}
								>
									{moment(notification.createdAt).format(
										"DD/MM/YY, h:mm:ss a"
									)}
								</div>
							</div>
						</Card>
					))
				);
			} else {
				setContent("No notifications yet!");
			}
		});
		socket.emit("listenForNotifications", { token: Data.token });
		return () => {
			socket.off();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Data.token]);

	return (
		<div
			style={{
				cursor: "pointer",
				position: "absolute",
				top: "32px",
				right: "35px"
			}}
			onMouseOver={() => setBellColor("#1890ff")}
			onMouseOut={() => setBellColor("black")}
		>
			<Badge count={unseen} overflowCount={99}>
				<Popover
					visible={isVisible}
					trigger="click"
					color="#fafbfc"
					onVisibleChange={handleVisibleChange}
					placement="leftTop"
					content={
						content !== null ? (
							content !== "No notifications yet!" ? (
								<div
									style={{
										height: "630px",
										overflowY: "auto",
										width: "500px",
										backgroundColor: "#fafbfc"
									}}
								>
									{content}
								</div>
							) : (
								content
							)
						) : (
							<Spin
								size="small"
								tip="Fetching Notifications ..."
							/>
						)
					}
				>
					<BellOutlined
						onClick={() => {
							setIsVisible(true);
						}}
						style={{
							fontSize: "26px",
							color: bellColor
						}}
					/>
				</Popover>
			</Badge>
		</div>
	);
};

export default BellNotification;
