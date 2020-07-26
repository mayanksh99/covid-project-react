import React from "react";
import { Row, Col, Form, Input, Button,Card} from "antd";
import PageTitle from "../common/PageTitle";
import {
	ProfileOutlined
} from '@ant-design/icons';
import "./style.css";
const DoctorProfile = () => {
	const onFinish = values => {
		console.log("form O/P ", values);
	};
	return(
		<div className="DoctorProfile-container">
			<div className="DoctorProfile-header">
				<span className="DoctorProfile-title-one"><ProfileOutlined className="DoctorProfile-icon"/><PageTitle title="Profile" /></span>
			</div>
			<Card>
				<div className="DoctorProfile-content">
					<Row className="image-section">
						<div className="DoctorProfile-img">
							<img src="https://www.naspp.com/App_Themes/NASPP/images/default_user.png"/>
						</div>
					</Row>
					<div className="Doctor-details">
					<Row className="DoctorProfile-details-one">
						<div className="DoctorProfile-list">
						<Row>
								<Col md={12} xs={24}className="DoctorProfile-heading">Name</Col>
								<Col md={12} xs={24}>Dayanand tiwari</Col>
							</Row>
							<Row>
								<Col md={12} xs={24}className="DoctorProfile-heading">Email</Col>
								<Col md={12} xs={24}>abc@example.com</Col>
							</Row>
							<Row>
								<Col md={12} xs={24} className="DoctorProfile-heading">ID</Col>
								<Col md={12} xs={24}>P1</Col>
							</Row>
						</div>		
					</Row>
					<br/>
					<br/>
					<Row className="DoctorProfile-details-two">
						<div className="DoctorProfile-list">
							<Row>
							<h3 className="DoctorPass-heading">Change Password</h3>
							</Row>
							<Row>
								<Form name="register" className="DoctorProfile-form"onFinish={onFinish}>
									<Row >
										<Col md={12} xs={24} className="DoctorProfile-heading">Current Password</Col>
										<Col md={12} xs={24}>
											<Form.Item 
											    className="DoctorProfile-formitem"
												name="currPassword"
												rules={[
													{
														required: true,
														message:
														"Please input your current password!"
													}
												]}
											>
												<Input className="DoctorProfile-input" />
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col md={12} xs={24} className="DoctorProfile-heading">New Password</Col>
										<Col md={12} xs={24} >
											<Form.Item 
												className="DoctorProfile-formitem"
												name="newPassword"
												dependencies={["currPassword"]}
												rules={[
													{
														required: true,
														message: "Please enter your new password!"
													},
													({ getFieldValue }) => ({
													validator(rule, value) {
													if (
														!value ||
														getFieldValue("currPassword") !==
															value
													) {
														return Promise.resolve();
													}
													return Promise.reject(
														"New and Old password cannot be same"
													);
													}
													})
												]}
											>
												<Input.Password className="DoctorProfile-input" />
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col md={12} xs={24}  className="DoctorProfile-heading">Confirm Password</Col>
										<Col md={12} xs={24} >
											<Form.Item 
												className="DoctorProfile-formitem"
												name="conPassword"
												dependencies={["newPassword"]}
												rules={[
													{
														required: true,
														message: "Please confirm your password!"
													},
													({ getFieldValue }) => ({
														validator(rule, value) {
															if (
																!value ||
																getFieldValue("newPassword") ===
																	value
															) {
																return Promise.resolve();
															}
															return Promise.reject(
																"password that you entered do not match!"
															);
														}
													})
												]}	
											>
												<Input.Password className="DoctorProfile-input" />
											</Form.Item>
										</Col>
									</Row>
									<Button type="primary" htmlType="submit" className="DoctorProfile-btn">
										Change Password
									</Button>	
								</Form>
							</Row>
						</div>
					</Row>
					<div class="DoctorProfile-changePass">
						{/* <div className="DoctorProfile-title-two">
							 <PageTitle 
								title="Change Password"
								className="ChangePass-title"
							/> 
							
						</div>  */}
						
					</div>
					</div>
				</div>
			</Card>
			
		</div>
	)
};

export default DoctorProfile;
