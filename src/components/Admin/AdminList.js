import React, { useState } from "react";
import PageTitle from "./../common/PageTitle";
import {
	Col,
	Statistic,
	Row,
	Card,
	Button,
	Table,
	Form,
	Input,
	Select,
	Popconfirm,
	Tooltip,
	Divider
} from "antd";
import {
	UserOutlined,
	MailOutlined,
	LockOutlined,
	CloseCircleOutlined,
	CheckCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Option } = Select;

const AdminList = () => {
	const [action] = useState(false);
	const columns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<>
					<Popconfirm
						title="Do you want to toggle user block?"
						// onConfirm={() => handleUserRevoke(action[1])}
						okText="Yes"
						cancelText="No"
					>
						{action ? (
							<Tooltip title="Unblock user">
								<CloseCircleOutlined
									style={{ color: "#DB4437" }}
								/>
							</Tooltip>
						) : (
							<Tooltip title="Block user">
								<CheckCircleOutlined
									style={{ color: "#0F9D58" }}
								/>
							</Tooltip>
						)}
					</Popconfirm>
					<Divider type="vertical" />
					<Tooltip title="Edit password">
						<Link to="#">
							<EditOutlined style={{ color: "#F4B400" }} />
						</Link>
					</Tooltip>

					<Divider type="vertical" />
					<Tooltip title="Delete admin">
						<Popconfirm
							title="Are you sure delete this user?"
							// onConfirm={() => handleUserDelete(action[1])}
							okText="Yes"
							cancelText="No"
						>
							<DeleteOutlined style={{ color: "#DB4437" }} />
						</Popconfirm>
					</Tooltip>
				</>
			)
		}
	];

	const data = [
		{
			key: "1",
			name: "Corona Pidit",
			email: "admin@admin.com",
			role: "Doctor",
			action: "Detail"
		},
		{
			key: "2",
			name: "Corona Pidit",
			email: "admin@admin.com",
			role: "Ambulance",
			action: "Detail"
		},
		{
			key: "3",
			name: "Corona Pidit",
			email: "admin@admin.com",
			role: "Doctor",
			action: "Detail"
		}
	];

	return (
		<>
			<PageTitle title="Admin" />
			<Col xl={6} lg={6} md={6} sm={6} xs={24}>
				<Statistic
					title="Total admins"
					value={13}
					valueStyle={{
						color: "#005ea5",
						fontWeight: 600
					}}
				/>
			</Col>
			<br />
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={24} md={4} lg={6}>
					<Card>
						<p
							style={{
								fontSize: "18px",
								color: "#008DB9",
								fontWeight: 700
							}}
						>
							Add Admin
						</p>
						<Form
							layout="vertical"
							name="update_patient"
							className="login-form"
							initialValues={{ remember: true }}
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
									prefix={<UserOutlined />}
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
									prefix={<MailOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="role"
								label="Role"
								rules={[
									{
										required: true,
										message: "Please select role!"
									}
								]}
							>
								<Select
									placeholder="Select role"
									// className="input-field"
									prefix={<MailOutlined />}
								>
									<Option value="Master">Master</Option>
									<Option value="Doctor">Doctor</Option>
									<Option value="Hospital">Hospital</Option>
									<Option value="Ambulance">Ambulance</Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										required: true,
										message: "Please input password!"
									}
								]}
							>
								<Input.Password
									className="input-field"
									placeholder="Enter password"
									prefix={<LockOutlined />}
								/>
							</Form.Item>
							<Form.Item
								name="password"
								label="Re-Password"
								rules={[
									{
										required: true,
										message: "Please input password!"
									}
								]}
							>
								<Input.Password
									className="input-field"
									placeholder="Enter Re-password"
									prefix={<LockOutlined />}
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
					</Card>
				</Col>
				<Col xs={24} sm={24} md={20} lg={18}>
					<Card>
						<p
							style={{
								fontSize: "18px",
								color: "#008DB9",
								fontWeight: 700
							}}
						>
							List of Admins
						</p>
						<div
							style={{
								padding: 0,
								width: "100%",
								overflowX: "auto"
							}}
						>
							<Table
								columns={columns}
								dataSource={data}
								pagination={{ position: ["bottomCenter"] }}
							/>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default AdminList;
