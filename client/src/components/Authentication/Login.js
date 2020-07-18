import React, { useState } from "react";
import { Row, Col, Card, Input, Form } from "antd";
import styled from "styled-components";
import logo from "../../utils/assets/images/doctor5.jpg";
import { _notification } from "./../../utils/_helper";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
	Heading,
	TextInput,
	Label,
	InputWrapper,
	Button,
	Text as HelperText
} from "../../masala-dosa";

const SideSeen = styled.div`
	height: 100vh;
	background-image: url(${logo});
	background-size: contain;
	background-repeat: no-repeat;
`;

const GradDiv = styled.div`
	height: 100vh;
	background: linear-gradient(
		0deg,
		#fe7676 16.55%,
		rgba(196, 196, 196, 0.2) 99.9%
	);
`;

const SideText = styled.h2`
	color: white;
	font-weight: bold;
	font-size: 38px;
	text-align: center;
	padding-top: 600px;
`;

const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const EditCard = styled(Card)`
	width: 350px;
	background-color: #f1f1f1 !important;
	.ant-card-head-title {
	}
`;

const EditInput = styled(Input)`
	border-top: none;
	border-left: none;
	border-right: none;
	border-bottom: 1px solid;
	background-color: #f1f1f1;
	input {
		background-color: #f1f1f1;
	}
`;

const EditInputPass = styled(Input.Password)`
	border-top: none;
	border-left: none;
	border-right: none;
	border-bottom: 1px solid;
	background-color: #f1f1f1;
	input {
		background-color: #f1f1f1;
	}
`;

const EditButton = styled(Button)`
	background-color: #fe7676;
	border: none;
	&:hover {
		background-color: #fe7676;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
	}
	&:focus {
		background-color: #fe7676;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
	}
`;

const Login = props => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [errMessage, setErrMessage] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		try {
			setIsLoading(true);
			// no input
			setErrMessage("input field bhar de");
			_notification("success", "Success", "Sign In successfully");
			setIsLoading(false);
		} catch (err) {
			console.og(err);
			_notification("error", "Error", "Something went wrong");
			setIsLoading(false);
		}
	};

	return (
		<div>
			<Row>
				<Col span={10}>
					<SideSeen>
						<GradDiv>
							<SideText>
								Welcome <br /> Corona Warriors
							</SideText>
						</GradDiv>
					</SideSeen>
				</Col>
				<Col span={14}>
					<LoginWrapper>
						<Heading color="red" size="2xl" align="center">
							Sign In
						</Heading>
						<EditCard>
							<Form onSubmit={handleSubmit}>
								<InputWrapper>
									<Label>email address</Label>
									<TextInput
										placeholder="johndoe@gmail.com"
										type="email"
										required
									/>
									<HelperText color="red" size="xs">
										galat hai
									</HelperText>
								</InputWrapper>

								<InputWrapper>
									<Label>password</Label>
									<TextInput
										placeholder="*******"
										type="password"
										required
									/>
								</InputWrapper>

								<Button
									bg="red"
									htmlType="submit"
									size="large"
									loading={isLoading}
								>
									Sign In
								</Button>
							</Form>
						</EditCard>
					</LoginWrapper>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
