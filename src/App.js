import logo from "./logo.svg";
import "./App.css";
import {
	GenerateSmartSendContainerDimension,
	generateNewContainer,
} from "./function.js";
import { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import { NewContainer } from "./component/NewContainer.js";

function App() {
	// create new container
	let newContainer = {
		length: 0,
		width: 0,
		height: 0,
	};
	const [originalL, setOriginalL] = useState(400);
	const [originalW, setoriginalW] = useState(400);
	const [originalH, setoriginalH] = useState(400);
	const [quantity, setquantity] = useState(2001);
	const [weight, setWeight] = useState(5000);
	const [data, setData] = useState([]);
	//carItem object
	function createCarItem(length, width, height, quantity, weight) {
		let cartItem = new Object();
		cartItem.length = length;
		cartItem.width = width;
		cartItem.height = height;
		cartItem.quantity = quantity;
		cartItem.Weight = weight;
		return cartItem;
	}

	const getData = async function () {
		const cartItem = createCarItem(400, 400, 400, 2001, 5000);
		let result = await generateNewContainer(cartItem);
		setData(result);
	};

	// const getData = async function () {
	// 	let result = await GenerateSmartSendContainerDimension(
	// 		400, // original length
	// 		200, //original width
	// 		400, //original height
	// 		2001, //quantitye
	// 		1, //l Step
	// 		1, // w Step
	// 		true
	// 	);

	// 	console.log(result);
	// 	setLength(result.length);
	// 	setWidth(result.width);
	// 	setHeight(result.height);
	// };
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
				<Row>
					{" "}
					<Col sm={4}>
						<h2>Quantity of items</h2>
						{quantity}
					</Col>
					<Col sm={4}>
						<h2>weight of item</h2>
						{weight}g
					</Col>
				</Row>
				<hr />
				<h1> The Size of New Express boxes:</h1>
				<NewContainer data={data}> </NewContainer>
			</Container>
		</div>
	);
}

export default App;
