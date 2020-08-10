import React from "react";
import { Form, Input, Button, Modal, Spin } from "antd";
import {
	PushpinOutlined,
	PhoneOutlined,
	UserOutlined,
	NumberOutlined
} from "@ant-design/icons";

const AddAmbulanceModal = ({ isVisible, setIsVisible, isAmbAdding, add }) => {
	const [form2] = Form.useForm();

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Add Ambulance
					</h3>
				}
				visible={isVisible}
				onCancel={handleCancel}
				footer={null}
				width={400}
			>
				<Spin tip="Adding Ambulance..." spinning={isAmbAdding}>
					<Form
						layout="vertical"
						name="normal_login"
						form={form2}
						onFinish={add}
						className="login-form"
						initialValues={{ remember: true }}
					>
						<Form.Item
							name="vehiclenumber"
							label="Vehicle Number"
							rules={[
								{
									required: true,
									message: "Please input vehicle number!"
								}
							]}
						>
							<Input
								placeholder="Enter vehicle number"
								prefix={<NumberOutlined />}
							/>
						</Form.Item>
						<Form.Item
							name="drivername"
							label="Driver Name"
							rules={[
								{
									required: true,
									message: "Please input driver name!"
								}
							]}
						>
							<Input
								placeholder="Enter driver name"
								prefix={<UserOutlined />}
							/>
						</Form.Item>
						<Form.Item
							name="driverphone"
							label="Driver Phone No."
							rules={[
								{
									required: true,
									message: "Please input driver phone no.!"
								}
							]}
						>
							<Input
								placeholder="Enter driver phone no."
								prefix={<PhoneOutlined />}
							/>
						</Form.Item>
						<Form.Item
							name="areapin"
							label="Area Pin"
							rules={[
								{
									required: true,
									message: "Please input area pin!"
								}
							]}
						>
							<Input
								placeholder="Enter area pin"
								prefix={<PushpinOutlined />}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								block
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Modal>
		</>
	);
};

export default AddAmbulanceModal;
