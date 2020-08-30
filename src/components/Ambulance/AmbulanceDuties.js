import React, { useEffect, useState } from "react";
import { getAmbulanceDuty, declinedPatientService } from "../../utils/services";
import { _notification } from "../../utils/_helper";
import moment from "moment";
import Map from "./Map";
import {
	Divider,
	Tag,
	Row,
	Col,
	Form,
	Input,
	Checkbox,
	Button,
	Modal,
	Spin
} from "antd";

const AmbulanceDuties = props => {
	const { form } = Form.useForm;
	const { TextArea } = Input;
	const [isLoading, setIsLoading] = useState(false);
	const [check, setCheck] = useState(false);
	const [showMap, setShowMap] = useState(false);
	const [data, setData] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			try {
				const res = await getAmbulanceDuty(props.match.params.did);
				if (res.error === false && res.message === "success") {
					setData(res.data);
					setIsLoading(false);
					// console.log(res.data);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
				setIsLoading(false);
			}
		})();
	}, [props.match.params.did]);

	const handleFinish = async values => {
		setIsLoading(true);
		try {
			const res = await declinedPatientService(data.ambulance._id, {
				comments: values.declinedComment ? values.declinedComment : null
			});
			if (res.error === false && res.message === "success") {
				_notification(
					"success",
					"Success",
					"Status updated successfully"
				);
				setCheck(false);
				setIsLoading(false);
			}
		} catch (err) {
			setIsLoading(false);
			_notification("error", "Error", err.message);
		}
	};

	const onChange = e => {
		setCheck(e.target.checked);
	};

	const handleMap = e => {
		setShowMap(true);
	};

	return (
		<>
			<Spin tip="Loading..." spinning={isLoading}>
				<Divider
					style={{
						fontSize: "25px"
					}}
					orientation="left"
				>
					Ambulance status :{" "}
					<Tag
						style={{ fontSize: "16px" }}
						color={
							data
								? data.ambulance.status === "available"
									? "green"
									: data.ambulance.status === "onDuty"
									? "orange"
									: "red"
								: null
						}
					>
						{data ? data.ambulance.status.toUpperCase() : null}
					</Tag>
				</Divider>
				<Divider
					style={{
						paddingBottom: "10px",
						fontWeight: "800",
						fontSize: "20px"
					}}
				>
					Journey details
				</Divider>
				<Row
					style={{
						fontSize: "14px"
					}}
				>
					<Col span={4}>Alloted At :</Col>
					<Col span={20}>
						{moment(data ? data.allotedAt : null).format(
							"Do MMMM YYYY, h:mm:ss a"
						)}
					</Col>

					<>
						<Col span={4}>Trip Started :</Col>
						<Col span={20}>
							{moment(data ? data.tripStartedAt : null).format(
								"Do MMMM YYYY, h:mm:ss a"
							)}
						</Col>
					</>

					<>
						<Col span={4}>Completed At :</Col>
						<Col span={20}>
							{moment(data ? data.completedAt : null).format(
								"Do MMMM YYYY, h:mm:ss a"
							)}
						</Col>
					</>
				</Row>
				<Row style={{ fontSize: "18px" }}>
					Vehicle Number : {data ? data.ambulance.vehicleNo : null}
				</Row>
				<Row>
					<Col span={13} style={{ fontSize: "18px" }}>
						Driver Name : {data ? data.driver.name : ""}
					</Col>
					<Col span={11} style={{ fontSize: "18px" }}>
						Driver Contact : {data ? data.driver.contact : ""}
					</Col>
				</Row>
				<Row style={{ paddingBottom: "8px" }}>
					<Col
						span={13}
						style={{
							fontWeight: "700",
							fontSize: "18px",
							paddingBottom: "10px"
						}}
					>
						Patient{" "}
						{data
							? data.status === "completed"
								? "carried"
								: data.status === "declined"
								? "alloted"
								: "carrying"
							: null}
					</Col>
					<Col
						span={11}
						style={{
							fontWeight: "700",
							fontSize: "18px",
							paddingBottom: "10px"
						}}
					>
						Destination Hospital :
					</Col>
					{data ? (
						<>
							<Col span={13}>Name : {data.patient.name}</Col>
							<Col span={11}>Name : {data.hospital.name}</Col>
							<Col span={13}>
								Address : {data.patient.address}
							</Col>
							<Col span={11}>
								Address : {data.hospital.address}
							</Col>
							<Col span={13}>Gender : {data.patient.gender}</Col>
							<Col span={11}>
								Category : {data.hospital.category}
							</Col>
							<Col span={13}>Contact : {data.patient.phone}</Col>
							<Col span={11}>
								Contact : {data.hospital.contact}
							</Col>
						</>
					) : null}
				</Row>
				{data.status === "onDuty" ? (
					<Form
						form={form}
						onFinish={handleFinish}
						name="ambulanceDetails"
						layout="vertical"
					>
						{data.status === "onDuty" ? (
							<Form.Item name={`checkBox`}>
								<Checkbox onChange={onChange} checked={check}>
									Declined to come ?
								</Checkbox>
							</Form.Item>
						) : null}

						{check ? (
							<>
								<Form.Item
									name="declinedComment"
									label="Add a comment"
								>
									<TextArea placeholder="Write here" />
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										style={{ float: "right" }}
									>
										Submit
									</Button>
								</Form.Item>
							</>
						) : null}
					</Form>
				) : null}
				<Row style={{ paddingBottom: "40px" }}>
					Journey Status :{" "}
					<Tag
						color={
							data
								? data.status === "completed"
									? "green"
									: data.status === "onDuty"
									? "orange"
									: "red"
								: null
						}
					>
						{data ? data.status.toUpperCase() : null}
					</Tag>{" "}
				</Row>
				<Button type="primary" onClick={handleMap}>
					Show route
				</Button>
			</Spin>
			<Modal
				closable={true}
				visible={showMap}
				footer={false}
				style={{ top: "35px" }}
				width={1300}
				bodyStyle={{ height: "630px" }}
				onCancel={() => setShowMap(false)}
			>
				<Map data={data} did={props.match.params.did} />
			</Modal>
		</>
	);
};

export default AmbulanceDuties;
