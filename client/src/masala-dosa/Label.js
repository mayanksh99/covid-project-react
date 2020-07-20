import styled from "styled-components";

const Label = styled.p`
	${props => {
		return {
			fontWeight: 400,
			margin: 0,
			padding: 0,
			color: "#a0aec0",
			textTransform: "uppercase",
			fontSize: "12px"
		};
	}}
`;

export default Label;
