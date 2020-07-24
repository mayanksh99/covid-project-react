import React, { useState } from "react";
import { Row, Statistic, Col, Button } from "antd";
import AddAmbulanceAdmin from "./AddAmbulanceAdmin";

const AmbulanceAdminOption = props => {
	const [showModal, setshowModal] = useState(false);

	const handelModal = value => {
		setshowModal(value);
	};
	return (
		<div style={{ marginTop: "16px", marginBottom: "14px" }}>
			<Row>
				<Col xl={8} lg={8} md={12} sm={24} xs={24}>
					<Statistic title="Total" value={113} />
				</Col>
				<Col xl={8} lg={8} md={12} sm={24} xs={24}>
					<Statistic title="Available" value={13} />
				</Col>
				<Col xl={8} lg={8} md={12} sm={24} xs={24}>
					<Button
						type="primary"
						className="login-form-button"
						onClick={() => handelModal(true)}
					>
						Add Administrator
					</Button>
				</Col>
			</Row>
			<AddAmbulanceAdmin visible={showModal} handleModal={handelModal} />
		</div>
	);
};

export default AmbulanceAdminOption;
