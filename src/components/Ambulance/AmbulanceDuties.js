import React, { useEffect, useState } from "react";
import {
	getAmbulanceDuty,
	declinedPatientService,
	endTripService
} from "../../utils/services";
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
	Spin,
	Timeline
} from "antd";
import ProfileDetails from "../common/ProfileDetails";

const AmbulanceDuties = props => {
	const { form } = Form.useForm;
	const { TextArea } = Input;
	const [isLoading, setIsLoading] = useState(false);
	const [declineCheck, setDeclineCheck] = useState(false);
	const [completeCheck, setCompleteCheck] = useState(false);
	const [checkValue, setCheckValue] = useState(null);
	const [showMap, setShowMap] = useState(false);
	const [data, setData] = useState(false);
	const [tripModal, setTripModal] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [endTripSpin, setEndTripSpin] = useState(false);

	useEffect(() => {
		console.log(props);
		setIsLoading(true);
		(async () => {
			try {
				const res = await getAmbulanceDuty(props.match.params.did);
				if (res.error === false && res.message === "success") {
					setData(res.data);
					setIsLoading(false);
					console.log(res.data);
				}
				if (props.location.state !== undefined) {
					if (
						props.location.state.title === "End Trip Request" &&
						res.data.tripStatus === "started"
					) {
						_notification(
							"warning",
							"Pending Request !",
							"A request is pending, process it soon !"
						);
					}
				}
			} catch (err) {
				_notification("error", "Error", err.message);
				setIsLoading(false);
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.match.params.did, refresh]);

	const handleFinish = async values => {
		console.log(values);
		setEndTripSpin(true);
		setIsLoading(true);
		try {
			const res = await declinedPatientService(data.ambulance._id, {
				comments: values.declinedComment ? values.declinedComment : null
			});
			if (res.error === false && res.message === "success") {
				_notification(
					"success",
					"Success",
					"Status was successfully changed !"
				);
				setEndTripSpin(false);
				setTripModal(false);
				setDeclineCheck(false);
				setCompleteCheck(false);
				setRefresh(!refresh);
				setIsLoading(false);
			}
		} catch (err) {
			setEndTripSpin(false);
			setIsLoading(false);
			_notification("error", "Error", err.message);
		}
	};

	const handleEndTrip = () => {
		setTripModal(true);
	};

	const handleMap = e => {
		setShowMap(true);
	};

	const handleTripConfirm = async () => {
		setEndTripSpin(true);
		setIsLoading(true);
		try {
			const res = await endTripService(data.ambulance._id);
			if (res.error === false && res.message === "success") {
				setIsLoading(false);
				_notification(
					"success",
					"Success",
					"Status was successfully changed !"
				);
				setIsLoading(false);
				setEndTripSpin(false);
				setDeclineCheck(false);
				setCompleteCheck(false);
				setTripModal(false);
				setRefresh(!refresh);
				//console.log(res.data);
			}
		} catch (err) {
			setEndTripSpin(false);
			setIsLoading(false);
			_notification("error", "Error", err.message);
		}
	};

	return (
		<>
			<Spin tip="Loading..." spinning={isLoading}>
				<Divider
					style={{
						paddingBottom: "10px",
						fontWeight: "800",
						fontSize: "20px"
					}}
				>
					Journey Details
				</Divider>
				<Timeline mode={"left"}>
					{data.allotedAt ? (
						<Timeline.Item
							label={moment(data ? data.allotedAt : null).format(
								"Do MMMM YYYY, h:mm:ss a"
							)}
						>
							<ProfileDetails label="Ambulance Alloted" />
						</Timeline.Item>
					) : null}
					{data.tripStartedAt ? (
						<Timeline.Item
							label={moment(
								data ? data.tripStartedAt : null
							).format("Do MMMM YYYY, h:mm:ss a")}
						>
							<ProfileDetails label="Trip Started" />
						</Timeline.Item>
					) : null}
					{data.completedAt ? (
						<Timeline.Item
							label={moment(
								data ? data.completedAt : null
							).format("Do MMMM YYYY, h:mm:ss a")}
						>
							<ProfileDetails label="Trip Completed" />
						</Timeline.Item>
					) : null}
				</Timeline>

				<Row style={{ fontSize: "18px" }}>
					<Col
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={24}
						style={{ fontSize: "18px" }}
					>
						<ProfileDetails
							label="Vehicle Number"
							data={data ? data.ambulance.vehicleNo : ""}
						/>
					</Col>
					<Col
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={24}
						style={{ fontSize: "18px" }}
					>
						<ProfileDetails
							label="Ambulance Status"
							data={
								<Tag
									style={{ fontSize: "16px" }}
									color={
										data
											? data.ambulance.status ===
											  "available"
												? "green"
												: data.ambulance.status ===
												  "onDuty"
												? "orange"
												: "red"
											: null
									}
								>
									{data
										? data.ambulance.status.toUpperCase()
										: null}
								</Tag>
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={24}
						style={{ fontSize: "18px" }}
					>
						<ProfileDetails
							label="Driver Name"
							data={data ? data.driver.name : ""}
						/>
					</Col>
					<Col
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={24}
						style={{ fontSize: "18px" }}
					>
						<ProfileDetails
							label="Driver Contact"
							data={data ? data.driver.contact : ""}
						/>
					</Col>
				</Row>
				<Row style={{ paddingBottom: "8px", fontSize: "16px" }}>
					<Col
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={24}
						style={{
							fontWeight: "700",
							fontSize: "18px",
							paddingBottom: "10px"
						}}
					>
						<ProfileDetails
							label={`Patient
                            ${
								data
									? data.status === "completed"
										? "carried: "
										: data.status === "declined"
										? "alloted: "
										: "carrying: "
									: null
							}`}
							data={
								data ? (
									<>
										<Col
											span={13}
											style={{ marginTop: "0px" }}
										>
											Name : {data.patient.name}
										</Col>
										<Col span={13}>
											Address : {data.patient.address}
										</Col>
										<Col span={13}>
											Gender : {data.patient.gender}
										</Col>
										<Col span={13}>
											Contact : {data.patient.phone}
										</Col>
									</>
								) : null
							}
						/>
					</Col>
					<Col
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={24}
						style={{
							fontWeight: "700",
							fontSize: "18px",
							paddingBottom: "10px"
						}}
					>
						<ProfileDetails
							label={"Destination Hospital: "}
							data={
								data ? (
									<>
										<Col span={13}>
											Name : {data.hospital.name}
										</Col>
										<Col span={13}>
											Address : {data.hospital.address}
										</Col>
										<Col span={13}>
											Category : {data.hospital.category}
										</Col>
										<Col span={13}>
											Contact : {data.hospital.contact}
										</Col>
									</>
								) : null
							}
						/>
					</Col>
				</Row>
				{props.location.state === undefined ? (
					data.tripStatus !== "pending" ? (
						data.status === "onDuty" ? (
							<Form
								form={form}
								onFinish={
									checkValue === "declined"
										? handleFinish
										: handleTripConfirm
								}
								name="ambulanceDetails"
								layout="vertical"
							>
								{declineCheck ? null : (
									<Form.Item name={`checkBox`}>
										<Checkbox
											onChange={e => {
												setCompleteCheck(
													e.target.checked
												);
												setCheckValue("completed");
											}}
											checked={completeCheck}
										>
											Trip completed successfully !
										</Checkbox>
									</Form.Item>
								)}
								{completeCheck ? null : (
									<Form.Item name={`checkBox`}>
										<Checkbox
											onChange={e => {
												setDeclineCheck(
													e.target.checked
												);
												setCheckValue("declined");
											}}
											checked={declineCheck}
										>
											Declined to come ?
										</Checkbox>
									</Form.Item>
								)}

								{declineCheck && checkValue === "declined" ? (
									<>
										<Form.Item
											name="declinedComment"
											label="Add a comment"
										>
											<TextArea placeholder="Write here" />
										</Form.Item>
									</>
								) : null}
								{declineCheck || completeCheck ? (
									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											style={{ float: "right" }}
										>
											Submit
										</Button>
									</Form.Item>
								) : null}
							</Form>
						) : null
					) : (
						<div
							style={{
								color: "#ff0000",
								fontSize: "18px",
								fontWeight: "600"
							}}
						>
							Journey has not started yet !
						</div>
					)
				) : props.location.state.title === "End Trip Request" &&
				  data.tripStatus === "started" ? (
					<>
						<div
							style={{
								fontSize: "18px",
								fontWeight: "600",
								paddingBottom: "10px"
							}}
						>
							Pending Request :
						</div>
						<div
							style={{ fontSize: "18px", paddingBottom: "20px" }}
						>
							<div>
								{props.location.state.description.slice(
									0,
									props.location.state.completed === -1
										? props.location.state.declined + 8
										: props.location.state.completed + 9
								)}
							</div>
							<div>
								{props.location.state.description.slice(
									props.location.state.completed === -1
										? props.location.state.declined + 8
										: props.location.state.completed + 9,
									props.location.state.description.length
								)}
							</div>
						</div>
						<Button
							type="primary"
							style={{ marginBottom: "30px" }}
							onClick={handleEndTrip}
						>
							End this Trip
						</Button>
					</>
				) : null}
				{data.tripStatus !== "pending" ? (
					<>
						<Row style={{ paddingBottom: "30px" }}>
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
					</>
				) : null}
			</Spin>
			<Modal
				closable={true}
				visible={showMap}
				footer={false}
				style={{ top: "35px" }}
				width={1300}
				bodyStyle={{ height: "630px" }}
				onCancel={() => setShowMap(false)}
				destroyOnClose={true}
			>
				<Map
					data={data}
					did={props.match.params.did}
					setShowMap={setShowMap}
				/>
			</Modal>

			<Modal
				centered={true}
				style={{ fontSize: "18px" }}
				closable={true}
				bodyStyle={{ height: "210px" }}
				visible={tripModal}
				footer={false}
				onCancel={() => setTripModal(false)}
				destroyOnClose={true}
			>
				{props.location.state !== undefined ? (
					<Spin tip="Processing..." spinning={endTripSpin}>
						<div>
							<div
								style={{
									fontSize: "24px",
									fontWeight: "600",
									paddingBottom: "10px"
								}}
							>
								Warning !
							</div>
							<div
								style={{
									fontSize: "18px",
									paddingBottom: "5px"
								}}
							>
								This trip is ending with the status{" "}
								{props.location.state.completed === -1
									? "DECLINED"
									: "COMPLETED"}
							</div>
							<div
								style={{
									fontSize: "18px",
									paddingBottom: "20px"
								}}
							>
								Do you really want to end this trip ?
							</div>
							<Button
								type="primary"
								style={{ float: "right" }}
								onClick={
									props.location.state.completed === -1
										? handleFinish
										: handleTripConfirm
								}
							>
								Confirm
							</Button>
						</div>
					</Spin>
				) : null}
			</Modal>
		</>
	);
};

export default AmbulanceDuties;
