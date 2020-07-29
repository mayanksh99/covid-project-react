import React, { useState } from "react";
import { Row, Col, Statistic, Button } from "antd";
import AddDoctorAdmin from "./AddDoctorAdmin";

const DoctorAdminOption = ({ count }) => {
	const [showModal, setshowModal] = useState(false);

	const handelModal = value => {
		setshowModal(value);
	};
	return (
		<div style={{ marginTop: "16px", marginBottom: "14px" }}>
			<Row>
				<Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Statistic
						title="Total Doctors"
						value={count}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				{/* <Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Statistic
						title="Available Doctors"
						value={13}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col>
				<Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Statistic
						title="On Leave Doctors"
						value={13}
						valueStyle={{ color: "#005ea5", fontWeight: 600 }}
					/>
				</Col> */}
				<Col xl={6} lg={6} md={8} sm={24} xs={24}>
					<Button
						type="primary"
						className="login-form-button"
						onClick={() => handelModal(true)}
					>
						Add Doctor
					</Button>
				</Col>
			</Row>
			<AddDoctorAdmin visible={showModal} handleModal={handelModal} />
		</div>
	);
};

export default DoctorAdminOption;
