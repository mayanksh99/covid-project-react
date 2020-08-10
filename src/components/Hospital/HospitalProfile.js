import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Skeleton, Avatar,Modal, Form, Input,InputNumber,Select} from "antd";
import PageTitle from "../common/PageTitle";
import { _notification , getRole } from "../../utils/_helper";
import { getProfileService, updateHospitalProfileService } from "./../../utils/services";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 }
	}
};
const HospitalProfile = () => {
    const [userData] = useState(getRole());
    const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const showModal = () => {
		setIsVisible(true);
    };
    const handleCancel = () => {
        setIsVisible(false);
    };
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
                const res = await getProfileService();
                console.log(res);
				setData(res.data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
    }, []);
    useEffect(() => {
		if (data) {
			let { name, totalBeds,category,address,contact} = data;
			form.setFieldsValue({
				name,
				totalBeds,
				category,
                address,
                contact
                // email
			});
		}
    }, [data, form]);
    // console.log(userData.id);
    const onFinish = async values => {
        console.log(values);
		setIsBtnLoading(true);
		try {
            const rawData={
                name:values.name,
                category:values.category,
                address:values.address,
                contact:values.contact,
                totalBeds:values.totalBeds
                // email:values.email
            };
			const res = await  updateHospitalProfileService(
                userData.id,
                rawData
			);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Profile update successfully"
                );
                // console.log(res);
                setData(res.data);
			}
			setIsBtnLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

    return (
        <>
            <PageTitle title="Profile" />
            <Skeleton loading={isLoading} active>
				{data ? (
					<Card>
						<div className="DoctorProfile-content">
							<Row className="image-section">
								<div className="DoctorProfile-img">
									{data.image ? (
										<img
											src={data.image}
											alt="profilepic"
										/>
									) : (
										<Avatar
											size={72}
											icon={<UserOutlined />}
										/>
									)}
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
												Category
											</Col>
											<Col md={12} xs={24}>
												{data.category}
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
												Total Beds
											</Col>
											<Col md={12} xs={24}>
												{data.totalBeds}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Available Beds
											</Col>
											<Col md={12} xs={24}>
												{data.availableBeds}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Occupied Beds
											</Col>
											<Col md={12} xs={24}>
												{data.occupiedBeds}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col
												md={12}
												xs={24}
												className="DoctorProfile-heading"
											>
												Reserved Beds 
											</Col>
											<Col md={12} xs={24}>
												{data.reservedBeds}
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
												Email 
											</Col>
											<Col md={12} xs={24}>
												{data.email}
											</Col>
										</Row>
										<Row className="DoctorProfile-row">
											<Col md={12} xs={24}>
													<Button
														type="primary"
														// htmlType="submit"
                                                        className="login-form-button DoctorProfile-btn"
                                                        onClick={showModal}
													>
														Edit Profile
													</Button>
											</Col>
										</Row>
									</div>
								</Row>
							</div>
						</div>
                    </Card>
                   
                    
                ): null }
            </Skeleton>
            <Modal
                        title={
                            <h3
                                style={{
                                    textAlign: "center",
                                    marginBottom: "-3px",
                                    color: "#fff"
                                }}
                            >
                                Edit Profile
                            </h3>
                        }
                        visible={isVisible}
                        destroyOnClose={true}
                        onCancel={handleCancel}
                        width={400}
                        footer={null}
			        >
                <div className="DoctorEditProfile-container">
				<Skeleton loading={isLoading} active>
					<Form
						{...formItemLayout}
						form={form}
						name="Edit profile"
						onFinish={onFinish}
					>
						<Form.Item
							name="name"
							label="Name"
							rules={[
								{
									required: true,
									message: "Please input name!"
								}
							]}
						>
							<Input
								className="input-field"
								placeholder="Enter name"
							/>
						</Form.Item>
                        <Form.Item
							name="category"
							label="Category"
							rules={[
								{
									required: true,
									message: "Please input total beds!"
								}
							]}
						>
                            <Input
								className="input-field"
								placeholder="Enter category"
							/>
						</Form.Item>
                        <Form.Item
							name="address"
							label="Address"
							rules={[
								{
									required: true,
									message: "Please input the address!"
								}
							]}
						>
                            <Input
								className="input-field"
								placeholder="Enter address"
							/>
						</Form.Item>
                        <Form.Item
							name="contact"
							label="Contact"
							rules={[
								{
									required: true,
									message: "Please input contact details!"
								}
							]}
						>
                            <Input
								className="input-field"
								placeholder="Enter contact"
							/>
						</Form.Item>
                        {/* <Form.Item
							name="email"
							label="email"
							rules={[
								{
									required: true,
									message: "Please input email!"
								}
							]}
						>
                            <Input
								className="input-field"
								placeholder="Enter email"
							/>
						</Form.Item> */}
                        <Form.Item
							name="totalBeds"
							label="Total Beds"
							rules={[
								{
									required: true,
									message: "Please input total beds!"
								}
							]}
						>
                            <Input
								className="input-field"
								placeholder="Enter total beds"
							/>
						</Form.Item>
                        <Form.Item >
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button "
								block
								loading={isBtnLoading}
							>
								Save
							</Button>
						</Form.Item>
                    </Form>
                </Skeleton>
                </div>
                </Modal>
        </>        
    );
};
    
export default HospitalProfile;
    