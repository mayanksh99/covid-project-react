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
		let socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("NOTIFICATIONS_LIST", res => {
			let { notifications, method } = res;
			let totalUnseen = notifications.filter(notif => {
				return !notif.seen;
			}).length;
			setUnseen(totalUnseen);

			if (method !== "UPDATE_SEEN") {
				if (totalUnseen > 3) {
					notification.open({
						message: "Pending Notifications !",
						description: `You have ${totalUnseen} unseen notifications !`,
						icon: (
							<InfoCircleOutlined style={{ color: "#108ee9" }} />
						),
						duration: 5
					});
				} else if (totalUnseen >= 1 && totalUnseen <= 3) {
					notification.open({
						message: `${notifications[0].title}`,
						description: `${notifications[0].description}`,
						icon: (
							<InfoCircleOutlined style={{ color: "#108ee9" }} />
						),
						duration: 0,
						key: notifications[0]._id,
						onClick: () => {
							if (!notifications[0].seen)
								socket.emit("markNotificationSeen", {
									token: Data.token,
									nid: notifications[0]._id
								});
							history.push(`${notifications[0].path}`, {
								title: notifications[0].title,
								seen: notifications[0].seen,
								description: notifications[0].description,
								declined: notifications[0].description.search(
									"DECLINED"
								),
								completed: notifications[0].description.search(
									"COMPLETED"
								)
							});
							setIsVisible(false);
							notification.close(notifications[0]._id);
						}
					});
				}
			}

			setCount(notifications.length);
			console.log(notifications);
			if (notifications.length) {
				setContent(
					notifications.map((notification, i) => (
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
