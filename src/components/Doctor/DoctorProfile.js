import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Skeleton } from "antd";
import PageTitle from "../common/PageTitle";
import "./style.css";
import { _notification } from "../../utils/_helper";
import { getProfileService } from "./../../utils/services";
import { Link } from "react-router-dom";

const DoctorProfile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await getProfileService();
				setData(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	return (
		<>
			<PageTitle title="Profile" />
			<Skeleton loading={isLoading} active>
				{data ? (
					<Card>
						<div className="DoctorProfile-content">
							<Row className="image-section">
								<div className="DoctorProfile-img">
									<img src={data.image} alt="profilepic" />
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
												{data.name}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Gender
											</Col>
											<Col md={12} xs={24}>
												{data.gender}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Age
											</Col>
											<Col md={12} xs={24}>
												{data.age}
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
												{data.email}
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
												{data.empId}
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
												+91-{data.contact}
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
												{data.address}
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
												{data.hospital}
											</Col>
										</Row>

										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												About
											</Col>
											<Col md={12} xs={24}>
												{data.about}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col md={12} xs={24}>
												<Link
													to={`/editprofile/${data._id}`}
												>
													<Button
														type="primary"
														htmlType="submit"
														className="login-form-button DoctorProfile-btn"
													>
														Edit Profile
													</Button>
												</Link>
											</Col>
										</Row>
									</div>
								</Row>
							</div>
						</div>
					</Card>
				) : null}
			</Skeleton>
		</>
	);
};

export default DoctorProfile;
