import React from "react";
import { Row, Col } from "antd";
import SideMenu from "./SideMenu";

const Layout = props => {
	return (
		<div>
			<Row>
				<Col span={4}>
					<SideMenu />
				</Col>
				<Col span={20}>{props.children}</Col>
			</Row>
		</div>
	);
};

export default Layout;
