import React, { useState, useEffect } from "react";
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
import { _notification, getRole } from "../../utils/_helper";
import PageTitle from "../common/PageTitle";
import {
	addReportService,
	getadmittedPatientsService,
	searchAdmittedPatientsService
} from "../../utils/services";

const { Option } = Select;
const { TextArea } = Input;

const UpdateDailyReport = props => {
	const userData = useState(getRole());
	const [isVisible, setIsVisible] = useState(false);
	const [rowData, setrowData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [patients, setpatients] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [testcheck, settestcheck] = useState("");
	const [number, setNumber] = useState("");
	const [form] = Form.useForm();
	const showModal = () => {
		setIsVisible(!isVisible);
	};
	const handleOk = () => {
		setIsVisible(!isVisible);
	};
	const handleCancel = () => {
		setIsVisible(!isVisible);
	};
	const handleChange = val => {
		settestcheck(val);
	};
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				if (userData) {
					const res = await getadmittedPatientsService(
						userData[0].id
					);
					setNumber(res.data.totalResults);
					setpatients(res.data.patients);
					setIsLoading(false);
					console.log(res);
				}
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh, userData]);

	const handleQuery = async val => {
		setIsLoading(true);
		try {
			let params = { search: val };
			const res = await searchAdmittedPatientsService(
				userData[0].id,
				params
			);
			setpatients(res.data.patients);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setIsLoading(false);
		}
	};

	const onFinish = async values => {
		setIsLoading(true);
		try {
			const rawdata = {
				pid: rowData.key,
				testPerformed: testcheck,
				testReport: values.reportresult,
				rating: values.rate,
				comment: values.comment
				// patientstatus: values.patientstatus,
			};
			// console.log(rawdata);
			const res = await addReportService(userData[0].id, rawdata);
			if (res.error) {
				_notification("error", "Error", res.message);
			} else if (res.message === "success") {
				_notification(
					"success",
					"Success",
					"Report added successfully"
				);
				setRefresh(!refresh);

				form.setFieldsValue({
					// patientstatus: "",
					testPerformed: "",
					testReport: "",
					rating: "",
					comment: ""
				});
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	const data = patients
		? patients.map((pat, i) => {
				const {
					_id,
					name,
					gender,
					age,
					phone,
					address,
					district,
					caseId,
					email
				} = pat;
				return {
					index: ++i,
					key: _id,
					name,
					gender,
					age,
					phone,
					address,
					district,
					caseId,
					email
				};
		  })
		: null;
	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "ID",
			dataIndex: "caseId",
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
			key: "updatereportbtn",
			dataIndex: "update",
			render: () => (
				<Button type="primary" onClick={showModal}>
					Update Report
				</Button>
			)
		}
	];
	return (
		<div style={{ padding: "10px 30px" }}>
			<PageTitle title="Update Report" />
			<Row>
				<Col span={8}>
					<Statistic
						title="Number of Patients Admitted"
						value={number}
						valueStyle={{ color: "#008db9" }}
					/>
				</Col>
				<Col span={8}>
					<Input.Search
						className="input-field"
						type="text"
						style={{ width: 200, marginBottom: 12 }}
						placeholder="Search-patients"
						allowClear
						onSearch={value => handleQuery(value)}
					/>
				</Col>
			</Row>

			<Table
				size="middle"
				loading={isLoading}
				title={() => "List of Patients"}
				columns={columns}
				bordered={true}
				dataSource={data}
				pagination={{ position: ["none", "bottomCenter"] }}
				onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							setrowData(record);
							console.log(record);
						}
					};
				}}
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
			>
				{rowData ? (
					<>
						<Row>
							<Col span={4}>Name</Col>
							<Col span={7}>{rowData.name}</Col>
							<Col span={5}>ID</Col>
							<Col span={8}>{rowData.caseId}</Col>
						</Row>
						<Row>
							<Col span={4}>Gender</Col>
							<Col span={7}>{rowData.gender}</Col>
							<Col span={5}>Age</Col>
							<Col span={8}>{rowData.age}</Col>
						</Row>
						<Row>
							<Col span={4}>Ph. Number</Col>
							<Col span={7}> {`+91-${rowData.phone}`}</Col>
							<Col span={5}>District</Col>
							<Col span={8}>{rowData.district}</Col>
						</Row>
						<Row>
							<Col span={4}>E-mail</Col>
							<Col span={7}> {rowData.email}</Col>
							<Col span={5}>Patient Address</Col>
							<Col span={8}>{rowData.address}</Col>
						</Row>
						<Form
							form={form}
							name="update_patient_report"
							className="login-form"
							onFinish={onFinish}
							// initialValues={{ remember: true }}
						>
							<Row>
								<Col xl={12} lg={12} md={12} sm={12}>
									<Form.Item
										name="patientstatus"
										label="Patient Status"
									>
										<Select placeholder="select status">
											<Option value="hospitalised">
												Hospitalised
											</Option>
											<Option value="discharged">
												Discharged
											</Option>
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
										<Select
											defaultValue="No"
											onChange={handleChange}
										>
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
										<Select placeholder="select">
											<Option value="Negative">
												Negative
											</Option>
											<Option value="Positive">
												Positive
											</Option>
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
					</>
				) : null}
			</Modal>
		</div>
	);
};

export default UpdateDailyReport;
