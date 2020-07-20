import React from "react";
import styled from "styled-components";
import { Menu } from "antd";
import { UserOutlined, DesktopOutlined } from "@ant-design/icons";
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
						icon={<UserOutlined />}
						title="Dashboard"
						className="submenu-edit"
					>
						<Menu.Item key="1">Examine Hospital</Menu.Item>
						<Menu.Item key="2">Assign Hospital</Menu.Item>
					</SubMenu>
					<Menu.Item icon={<DesktopOutlined />}>Profile</Menu.Item>
				</Menu>
			</div>
		</div>
	);
};

export default SideMenu;
