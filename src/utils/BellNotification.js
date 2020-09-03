import React, { useState, useEffect, useContext } from "react";
import { Badge, Popover, Card } from "antd";
import io from "socket.io-client";
import { EndPoint } from "./services";
import { AuthContext } from "../contexts/userContext";
import { BellOutlined } from "@ant-design/icons";

const BellNotification = () => {
	const [bellColor, setBellColor] = useState("Black");
	const [content, setContent] = useState(null);
	const [count, setCount] = useState(0);
	const Data = useContext(AuthContext);
	let total = 0;

	const notificationCount = n => {
		if (n.seen === false) {
			total++;
		}
	};

	useEffect(() => {
		let socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("NOTIFICATIONS_LIST", res => {
			res.forEach(notificationCount);
			setCount(total);
			console.log(res);
			setContent(
				res.map((notification, i) => (
					<Card
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
										boxShadow: "0 0 0 1px #1890ff inset",
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
							marginBottom: "7px",
							marginTop: "7px",
							cursor: "pointer"
						}}
					>
						{notification.description}
					</Card>
				))
			);
		});
		socket.emit("listenForNotifications", { token: Data.token });
		return () => {
			socket.off();
		};
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
			<Badge count={count} overflowCount={9}>
				<Popover
					trigger="click"
					color="#fafbfc"
					content={
						<div
							style={{
								width: "500px",
								backgroundColor: "#fafbfc"
							}}
						>
							{content}
						</div>
					}
					placement="leftTop"
				>
					<BellOutlined
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
