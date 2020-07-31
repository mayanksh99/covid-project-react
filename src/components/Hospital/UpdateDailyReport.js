import React, { useState ,useEffect} from "react";
import "antd/dist/antd.css";
import {
	Table,
	Statistic,
	Row,
	Col,
	Button,
	Input,
	Modal,
	Select,
	Rate,
	Form
} from "antd";
// import { AudioOutlined } from "@ant-design/icons";
import PageTitle from "../common/PageTitle";
import { addReportService,getadmittedPatientsService} from "../../utils/services";
import { _notification,getRole} from "../../utils/_helper";

const { Option } = Select;
const { TextArea ,Search} = Input;
const UpdateDailyReport = props => {
	const [isVisible, setIsVisible] = useState(false);
	const [setSelectedOption] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [patients, setpatients] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [form] = Form.useForm();
	const userData = useState(getRole());
	const showModal = () => {
		setIsVisible(!isVisible);
	};

	const handleChange = value => {
		setSelectedOption(value);
	};

	const handleOk = () => {
		setIsVisible(!isVisible);
	};

	const handleCancel = () => {
		setIsVisible(!isVisible);
	};

	// const suffix = (
	// 	<AudioOutlined
	// 		style={{
	// 			fontSize: 16,
	// 			color: "#1890ff"
	// 		}}
	// 	/>
	// );
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				if(userData){
					const res = await getadmittedPatientsService(userData[0].id);
					console.log(res);
					setIsLoading(false);
				}
				
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);
	console.log(userData);
	const onFinish = async values => {
		setIsLoading(true);
		try {
			const rawData = new rawData();
			rawData.append("patientstatus", values.patientstatus);
			rawData.append("reportresult", values.reportresult);
			rawData.append("testcheck", values.testcheck);
			rawData.append("rate", values.rate);
			rawData.append("comment", values.comment);
			const res = await addReportService(rawData);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Report added successfully"
				);
				props.setRefresh(!props.refresh);
				props.handleModal(false);
				form.setFieldsValue({
					patientstatus:"",
					testcheck:"",
					reportresult:"",
					rate:"",
					comment:""
				});
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id"
		},

		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},

		{
			title: "Gender",
			dataIndex: "gender",
			key: "gender"
		},

		{
			title: "Age",
			dataIndex: "age",
			key: "age"
		},

		{
			title: "Update Report",
			key: "update report",
			dataIndex:"age",
			render: () => (
				<Button type="primary" onClick={showModal()}>
					Update Report
				</Button>
			)
		}
	];
	const data = patients
	? patients.map((patients, id) => {
			const {
				_id,
				name,
				gender,
				age
			} = patients;
			return {
				index: ++id,
				key: _id,
				name,
				gender,
				age
			};
	  })
	: null;
	// const data = [];

	// for (let i = 0; i < 7; i++) {
	// 	data.push({
	// 		key: i,
	// 		id: `${i}`,
	// 		name: `Edward King ${i}`,
	// 		severity: "L2",
	// 		gender: `Male`,
	// 		age: "43 Years"
	// 	});
	// }

	return (
		<div style={{ padding: "10px 30px" }}>
			<PageTitle title="Update Report" />

			<Row>
				<Col span={8}>
					<Statistic
						title="Number of Patients Admitted"
						value={45}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>

				<Col span={8}>
					<Statistic
						title="Number of Unoccupied Beds"
						value={25}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>

				<Col span={8}>
					<Search
						placeholder="Search Patients"
						onSearch={value => console.log(value)}
						style={{ width: 200 }}
					/>
				</Col>
			</Row>

			<Table
				size="middle"
				title={() => "List of Patients"}
				columns={columns}
				bordered={true}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
				loading={isLoading}
			/>

			<Modal
				title={
					<h3
						style={{
							textAlign: "center",
							marginBottom: "-3px",
							color: "#fff"
						}}
					>
						Patient Details
					</h3>
				}
				visible={isVisible}
				centered
				onCancel={handleCancel}
				width={800}
				footer={null}
				// footer={[
				// 	<Button key="submit" type="primary" onClick={handleOk}>
				// 		Submit
				// 	</Button>
				// ]}
			>
				<Row>
					<Col span={4}>Name</Col>
					<Col span={6}>Edward King</Col>
					<Col span={6}>ID</Col>
					<Col span={8}>P1</Col>
				</Row>
				<Row>
					<Col span={4}>Gender</Col>
					<Col span={6}>Male</Col>
					<Col span={6}>Age</Col>
					<Col span={8}>43 years</Col>
				</Row>
				<Row>
					<Col span={4}>Relative Ph.</Col>
					<Col span={6}>+91-xxxxxxxxxx</Col>
					<Col span={6}>Severity</Col>
					<Col span={8}>L2</Col>
				</Row>
				<Row>
					<Col span={4}>District</Col>
					<Col span={6}>Ghaziabad</Col>
					<Col span={6}>Patient Address</Col>
					<Col span={8}>178/38 Modinagar Ghaziabad</Col>
				</Row>
				<Form
					form={form}
					name="update_patient_report"
					className="login-form"
					onFinish={onFinish}
					initialValues={{ remember: true }}
				>
					<Row>
						<Col xl={12} lg={12} md={12} sm={12}>
							<Form.Item
								name="patientstatus"
								label="Patient Status"
							>
								<Select placeholder="select status">
									<Option value="available">Hospitalized</Option>
									<Option value="on-duty">Discharged</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col xl={12} lg={12} md={12} sm={12}>
							<Form.Item
								name="testcheck"
								label="Test Performed Today:"
							>
								<Select defaultValue="No" onChange={handleChange}>
									<Option value="No">No</Option>
									<Option value="Yes">Yes</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xl={12} lg={12} md={12} sm={12}>
							<Form.Item
								name="reportresult"
								label="Report Result:"
							>
								<Select placeholder="select" onChange={handleChange}>
									<Option value="Negative">Negative</Option>
									<Option value="Positive">Positive</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name="rate" label="Rate the patient">
						<Rate />
					</Form.Item>
					<Form.Item name="comment" label="Doctor's Comment">
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							onClick={handleOk}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default UpdateDailyReport;
