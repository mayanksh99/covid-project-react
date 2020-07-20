import styled from "styled-components";

const TextInput = styled.input`
	${props => {
		return {
			fontWeight: 400,
			color: props.color,
			border: "none",
			background: "transparent",
			width: "100%",
			fontSize: "16px",
			borderBottom: "1px solid #707070",
			marginBottom: "4px"
		};
	}};
`;

export default TextInput;
