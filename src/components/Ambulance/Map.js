import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import io from "socket.io-client";
import { _notification } from "../../utils/_helper";
import { Button } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/userContext";
import { EndPoint } from "../../utils/services";
mapboxgl.accessToken =
	"pk.eyJ1IjoicGFkbWFuc2gyMCIsImEiOiJja2U2cGNoN2cwNDduMnlybjlhNDNudm44In0.TEKnrC1ehJj6oGB3i9Opeg";

// let bounds = [
// 	[76.115807, 28.044923], // Southwest coordinates
// 	[78.508601, 29.310049] // Northeast coordinates
// ];

let popupFinal = new mapboxgl.Popup({ offset: 25 }).setText(
	"Final Destination"
);

let popupStart = new mapboxgl.Popup({ offset: 25 }).setText(
	"Start Destination"
);

let socket;
const Map = props => {
	const Data = useContext(AuthContext);
	const [lng, setLng] = useState(77.498709);
	const [lat, setLat] = useState(28.752535);
	const [mapState, setMapState] = useState(null);
	const [startMarker, setStartMarker] = useState(null);
	const [finishMarker, setFinishMarker] = useState(null);
	const [coordinates, setCoordinates] = useState(null);
	const mapRef = useRef();

	useEffect(() => {
		socket = io(EndPoint, { transports: ["websocket", "polling"] });
		socket.on("AMBULANCE_LOCATIONS_FOR_MAP", res => {
			if (res.location !== undefined) {
				setLng(res.location.coordinates[0][0]);
				setLat(res.location.coordinates[0][1]);
				setCoordinates(res.location.coordinates);
			} else {
				_notification("error", "Error", "Location not found !");
				props.setShowMap(false);
			}
		});
		socket.emit("ambulanceLocationsForMap", {
			token: Data.token,
			did: props.did,
			aoid: props.data.operator._id
		});

		setStartMarker(new mapboxgl.Marker({ color: "#0055ff", scale: 1 }));
		setFinishMarker(new mapboxgl.Marker({ color: "red", scale: 1.5 }));

		const map = new mapboxgl.Map({
			container: mapRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [77.498709, 28.752535],
			zoom: 15
			// maxBounds: bounds
		});

		map.addControl(new mapboxgl.FullscreenControl(), "top-left");
		map.addControl(new mapboxgl.NavigationControl(), "top-left");

		map.on("load", () => {
			map.addSource("route", {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						coordinates: [[77.498709, 28.752535]]
					}
				}
			});

			map.addLayer({
				id: "route",
				type: "line",
				source: "route",
				layout: {
					"line-join": "round",
					"line-cap": "round"
				},
				paint: {
					"line-color": "#0055ff",
					"line-width": 8,
					"line-opacity": 0.8
				}
			});
		});

		setMapState(map);

		return () => {
			socket.off();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Data.token]);

	useEffect(() => {
		if (mapState !== null) {
			mapState.flyTo({
				center: coordinates[coordinates.length - 1],
				essential: true
			});

			finishMarker
				.setLngLat(coordinates[coordinates.length - 1])
				.setPopup(popupFinal)
				.addTo(mapState);

			startMarker
				.setLngLat([lng, lat])
				.setPopup(popupStart)
				.addTo(mapState);

			mapState.getSource("route").setData({
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates: coordinates
				}
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coordinates]);

	return (
		<>
			<div
				ref={mapRef}
				style={{
					position: "absolute",
					top: "0",
					right: "0",
					left: "0",
					bottom: "0",
					height: "100%",
					width: "100%"
				}}
			></div>
			<div>
				<Button
					type="primary"
					onClick={() =>
						mapState.flyTo({
							center: coordinates
								? coordinates[coordinates.length - 1]
								: null,
							essential: true
						})
					}
					style={{
						position: "absolute",
						background: "white",
						border: "none",
						borderRadius: "5px",
						WebkitBoxShadow: "0px 0px 5px rgb(170,170,170)",
						boxShadow: "0px 0px 5px rgb(170,170,170)",
						top: "9px",
						left: "150px",
						height: "30px",
						width: "90px",
						color: "black"
					}}
				>
					<AimOutlined
						style={{
							marginLeft: "-8px",
							marginTop: "2px",
							fontWeight: "700",
							fontSize: "18px",
							color: "black"
						}}
					/>
					Finish
				</Button>
				<Button
					type="primary"
					onClick={() =>
						mapState.flyTo({
							center: coordinates ? coordinates[0] : null,
							essential: true
						})
					}
					style={{
						position: "absolute",
						background: "white",
						border: "none",
						borderRadius: "5px",
						WebkitBoxShadow: "0px 0px 5px rgb(170,170,170)",
						boxShadow: "0px 0px 5px rgb(170,170,170)",
						top: "9px",
						left: "50px",
						height: "30px",
						width: "90px",
						color: "black"
					}}
				>
					<AimOutlined
						style={{
							marginLeft: "-8px",
							marginTop: "2px",
							fontWeight: "700",
							fontSize: "18px",
							color: "black"
						}}
					/>
					Start
				</Button>
			</div>
		</>
	);
};

export default Map;
