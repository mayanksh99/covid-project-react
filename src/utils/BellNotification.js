import React, { useState, useEffect, useContext } from "react";
import { Badge, Popover, Card, Spin } from "antd";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import { EndPoint } from "./services";
import { AuthContext } from "../contexts/userContext";
import { BellOutlined } from "@ant-design/icons";

const BellNotification = () => {
	const [bellColor, setBellColor] = useState("Black");
	const [content, setContent] = useState(null);
	const [count, setCount] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const Data = useContext(AuthContext);
	let history = useHistory();

	// const notificationCount = n => {
	// 	if (n.seen === false) {
	// 		total++;
	// 	}
	// };

	const handleVisibleChange = visible => {
		setIsVisible(visible);
	};

	useEffect(() => {
		let total = 0;
		let socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("NOTIFICATIONS_LIST", res => {
			console.log(res);
			res.forEach(n => {
				if (n.seen === false) {
					total++;
				}
			});
			setCount(total);
			total = 0;

			setContent(
				res.length !== 0
					? res.map((notification, i) => (
							<Card
								onClick={() =>
									history.push(
										`${notification.path}`,
										{
											title: notification.title,
											seen: notification.seen,
											description:
												notification.description,
											declined: notification.description.search(
												"DECLINED"
											),
											completed: notification.description.search(
												"COMPLETED"
											)
										},
										setIsVisible(false)
									)
								}
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
									marginBottom: `${
										i !== total ? "10px" : "0px"
									}`,
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
					: "No notifications yet!"
			);
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
			<Badge count={count} /*overflowCount={9}*/>
				<Popover
					visible={isVisible}
					trigger="click"
					color="#fafbfc"
					onVisibleChange={handleVisibleChange}
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
