import React from "react";
import { Modal, Form, Input } from "antd";
import {
	UserOutlined,
	PhoneOutlined,
	PushpinOutlined
} from "@ant-design/icons";
import { Button } from "antd";

const AddAmbulance = props => {
	return (
		<div>
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
				visible={props.visible}
				onCancel={() => props.handleModal(!props.visible)}
				footer={null}
				width={400}
				style={{ top: 50 }}
			>
				<Form
					layout="vertical"
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
				>
					<Form.Item
						name="vehiclename"
						label="Vehicle Name"
						rules={[
							{
								required: true,
								message: "Please input vehicle name!"
							}
						]}
					>
						<Input
							placeholder="Enter vehicle name"
							prefix={<UserOutlined />}
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
			</Modal>
		</div>
	);
};

export default AddAmbulance;
