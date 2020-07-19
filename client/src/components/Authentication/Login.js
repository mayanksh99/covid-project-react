import React from "react";
import { Row, Col } from "antd";
import "./style.css";

const Login = props => {
	return (
		<div>
			<Row>
				<Col span={10}>
					<div className="login-poster">
						<div className="login-grad">
							<h2 className="login-poster-text">
								Welcome <br /> Corona Warriors
							</h2>
						</div>
					</div>
				</Col>
				<Col span={14}>
					<div>login card</div>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
