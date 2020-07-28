import React from "react";
import { Modal, Form, Button, Input, InputNumber, Radio } from "antd";
// import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const AddHospitalAdmin = props => {
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
						Add Hospital
					</h3>
				}
				visible={props.visible}
				onCancel={() => props.handleModal(!props.visible)}
				footer={null}
				width={400}
				style={{ top: 10 }}
			>
				<Form
					layout="vertical"
					name="update_patient"
					className="login-form"
					initialValues={{ remember: true }}
				>
					<Form.Item
						name="name"
						label="Hospital Name"
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
							// prefix={<UserOutlined />}
						/>
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
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
							// prefix={<MailOutlined />}
						/>
					</Form.Item>

					<Form.Item
						name="category"
						label="Category"
						rules={[
							{
								required: true,
								message: "Please select category!"
							}
						]}
					>
						<Radio.Group>
							<Radio value="L1">L1</Radio>
							<Radio value="L2">L2</Radio>
							<Radio value="L3">L3</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						name="contact"
						label="Contact No."
						rules={[
							{
								required: true,
								message: "Please input conatct no.!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter contact no."
							// prefix={<MailOutlined />}
						/>
					</Form.Item>

					<Form.Item
						name="address"
						label="Address"
						rules={[
							{
								required: true,
								message: "Please input address!"
							}
						]}
					>
						<Input
							className="input-field"
							placeholder="Enter address"
							// prefix={<MailOutlined />}
						/>
					</Form.Item>

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
						<InputNumber
							min={1}
							style={{ width: "100%" }}
							className="input-field"
							placeholder="Enter total beds"
							// prefix={<UserOutlined />}
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

export default AddHospitalAdmin;
