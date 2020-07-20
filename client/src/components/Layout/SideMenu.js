import React from "react";
import { Menu } from "antd";
import {
	UserOutlined,
	ProfileOutlined,
	LogoutOutlined
} from "@ant-design/icons";
import "./style.css";
const { SubMenu } = Menu;

const SideMenu = () => {
	return (
		<div>
			<div className="menu-wrapper">
				<Menu
					mode="inline"
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					className="menu-edit"
				>
					<SubMenu
						key="sub1"
						icon={<UserOutlined className="menu-icon" />}
						title={<span className="menu-link">Dashboard</span>}
					>
						<Menu.Item key="1">
							<span className="menu-link sublink">
								Examine Patient
							</span>
						</Menu.Item>
						<Menu.Item key="2">
							<span className="menu-link sublink">
								Assign Hospital
							</span>
						</Menu.Item>
					</SubMenu>
					<Menu.Item icon={<ProfileOutlined className="menu-icon" />}>
						<span className="menu-link">Profile</span>
					</Menu.Item>
					<Menu.Item
						icon={
							<LogoutOutlined className="menu-icon logout-icon" />
						}
					>
						<span className="menu-link">Logout</span>
					</Menu.Item>
				</Menu>
				<div style={{ float: "bottom", textAlign: "center" }}>
					<p className="menu-link">Designed and Developed by</p>
					<img
						src="/assets/images/logo-white.svg"
						alt="logo"
						width="200"
						style={{ paddingBottom: "8px" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
