import logo from "./logo.svg";
import "./App.css";
import { GenerateSmartSendContainerDimension } from "./function.js";
import { useState } from "react";
import { Container, Row, Col } from "react-grid-system";

function App() {
	// create new container
	let newContainer = {
		length: 0,
		width: 0,
		height: 0,
	};
	const [length, setLength] = useState("unknow");
	const [width, setWidth] = useState("unknow");
	const [height, setHeight] = useState("unknow");
	const [originalL, setOriginalL] = useState(400);
	const [originalW, setoriginalW] = useState(200);
	const [originalH, setoriginalH] = useState(400);
	const [quantity, setquantity] = useState(500);

	const getData = async function () {
		let result = await GenerateSmartSendContainerDimension(
			400, // original length
			200, //original width
			400, //original height
			500, //quantity
			1, //l Step
			1, // w Step
			true
		);

		console.log(result);
		setLength(result.length);
		setWidth(result.width);
		setHeight(result.height);
	};
	return (
		<div>
			<button className="btn-worker" onClick={getData}>
				{" "}
				Get new box size
			</button>
			<Container>
				<h1> The Original Express box Size</h1>
				<Row>
					<Col sm={4}>
						<h2>length of original box </h2>
						{originalL}mm
					</Col>
					<Col sm={4}>
						<h2>width of original box </h2>
						{originalW}mm
					</Col>
					<Col sm={4}>
						<h2>height of original box </h2>
						{originalH}mm
					</Col>
				</Row>
				<h1> Quantity Of Items</h1>
				<Row>
					{" "}
					<Col sm={4}>
						<h2>Number </h2>
						{quantity}
					</Col>
				</Row>
				<hr />
				<h1> The New Express box Size :</h1>
				<Row>
					<Col sm={4}>
						<h2>length of the new box </h2>
						<h3 className="h3">{length}mm</h3>
					</Col>
					<Col sm={4}>
						<h2>width of the new box </h2>
						<h3 className="h3">{width}mm</h3>
					</Col>
					<Col sm={4}>
						<h2>height of the new box </h2>
						<h3 className="h3">{height}mm</h3>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
