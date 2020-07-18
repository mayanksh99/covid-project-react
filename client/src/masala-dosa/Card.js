import styled from "styled-components";

const Card = styled.div`
	width: ${props => {
		return props.width;
	}};
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
	background: ${props => {
		switch (props.type) {
			case "red":
				return "#DB4437";
			case "light":
				return "#ffffff";
			case "blue":
				return "#1A73E8";
			case "green":
				return "#0F9D58";
			case "yellow":
				return "#F4B400";
			default:
				return "#565859";
		}
	}};
	color: #424242;
	/* align-items: center; */
	border: 1.2px solid #db4437;
	box-sizing: border-box;
	border-bottom-width: 4px;
	border-radius: 8px;
	/* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16); */
`;

export default Card;
