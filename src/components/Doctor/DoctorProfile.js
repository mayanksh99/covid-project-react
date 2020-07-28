import React from "react";
import { Row, Col, Form, Input, Button, Card } from "antd";
import PageTitle from "../common/PageTitle";
import "./style.css";
const DoctorProfile = () => {
	const onFinish = values => {
		console.log("form O/P ", values);
	};
	return (
		<div>
			<div className="DoctorProfile-header">
				<PageTitle title="Profile" />
			</div>
			<Card>
				<div className="DoctorProfile-content">
					<Row className="image-section">
						<div className="DoctorProfile-img">
							<img src="https://www.naspp.com/App_Themes/NASPP/images/default_user.png" />
						</div>
					</Row>
					<div className="Doctor-details">
						<Row className="DoctorProfile-details-one">
							<div className="DoctorProfile-list">
								<Row className="DoctorProfile-row">
									<Col
										md={12}
										xs={24}
										className="DoctorProfile-heading"
									>
										Name
									</Col>
									<Col md={12} xs={24}>
										Dayanand tiwari
									</Col>
								</Row>
								<Row className="DoctorProfile-row">
									<Col
										md={12}
										xs={24}
										className="DoctorProfile-heading"
									>
										Email
									</Col>
									<Col md={12} xs={24}>
										abc@example.com
									</Col>
								</Row>
								<Row className="DoctorProfile-row">
									<Col
										md={12}
										xs={24}
										className="DoctorProfile-heading"
									>
										ID
									</Col>
									<Col md={12} xs={24}>
										P1
									</Col>
								</Row>
								<Row className="DoctorProfile-row">
									<Col
										md={12}
										xs={24}
										className="DoctorProfile-heading"
									>
										Phone Number
									</Col>
									<Col md={12} xs={24}>
										+91XXXXXXX87
									</Col>
								</Row>
								<Row className="DoctorProfile-row">
									<Col
										md={12}
										xs={24}
										className="DoctorProfile-heading"
									>
										Address
									</Col>
									<Col md={12} xs={24}>
										KIET group of institutions Ghaziabad
									</Col>
								</Row>
								<Row className="DoctorProfile-row">
									<Col
										md={12}
										xs={24}
										className="DoctorProfile-heading"
									>
										Hospital
									</Col>
									<Col md={12} xs={24}>
										IMS BHU
									</Col>
								</Row>
								<Row className="DoctorProfile-row">
									<Col
										md={12}
										xs={24}
										className="DoctorProfile-heading"
									>
										Hospital Category
									</Col>
									<Col md={12} xs={24}>
										L2
									</Col>
								</Row>
								<Row className="DoctorProfile-row">
									<Col md={12} xs={24}>
										<a href="/doctorprofile/edit">
											<Button
												type="primary"
												htmlType="submit"
												className="login-form-button DoctorProfile-btn"
											>
												Edit Profile
											</Button>
										</a>
									</Col>
									<Col md={12} xs={24}>
										<a href="/doctorprofile/view">
											<Button
												type="primary"
												htmlType="submit"
												className="login-form-button DoctorProfile-btn"
											>
												Unassigned and Declined Patients
											</Button>
										</a>
									</Col>
								</Row>
							</div>
						</Row>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DoctorProfile;
