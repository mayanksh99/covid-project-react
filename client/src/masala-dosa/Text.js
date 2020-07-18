import styled from "styled-components";

const Text = styled.p`
	${props => {
		const getColor = () => {
			switch (props.color) {
				case "red":
					return "#fe7676";
				case "blue":
					return "#1A73E8";
				case "green":
					return "#0F9D58";
				case "yellow":
					return "#F4B400";
				case "dark":
					return "#222222";
				case "transparent":
					return "transparent";
				default:
					return "#d5d5d5";
			}
		};
		const getFontSize = () => {
			switch (props.size) {
				case "xs":
					return 10;
				case "sm":
					return 12;
				case "md":
					return 14;
				case "lg":
					return 18;
				case "xl":
					return 20;
				case "2xl":
					return 24;
				case "2xl":
					return 28;
				case "4xl":
					return 32;
				case "5xl":
					return 40;
				default:
					return 16;
			}
		};
		return {
			fontWeight: 700,
			fontSize: getFontSize(),
			color: getColor(),
			textAlign: props.align
		};
	}}
`;

export default Text;
