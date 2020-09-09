import React, { useState, useEffect, useContext } from "react";
import { Badge, Popover, Card, Spin } from "antd";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { EndPoint } from "./services";
import { AuthContext } from "../contexts/userContext";
import { BellOutlined } from "@ant-design/icons";

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
			setUnseen(
				res.filter(notif => {
					return !notif.seen;
				}).length
			);
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
								history.push(
									`${notification.path}`,
									setIsVisible(false)
								);
							}}
							key={i}
							title={
								<div>
									<Badge
										count={++i}
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
									notification.seen ? "#fafbfc" : "#fff"
								}`,
								marginBottom: `${i !== count ? "10px" : "0px"}`,
								cursor: "pointer",
								marginRight: "7px"
							}}
						>
							{notification.description}
						</Card>
					))
				);
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
			<Badge count={unseen} overflowCount={9}>
				<Popover
					visible={isVisible}
					trigger="click"
					color="#fafbfc"
					onVisibleChange={handleVisibleChange}
					content={
						content !== null ? (
							<div
								style={{
									height: "535px",
									overflowY: "auto",
									width: "500px",
									backgroundColor: "#fafbfc"
								}}
							>
								{content}
							</div>
						) : count === null ? (
							<Spin
								size="small"
								tip="Fetching Notifications ..."
							/>
						) : (
							"No Notifications ..."
						)
					}
					placement="leftTop"
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
