import { Container, Row, Col } from "react-grid-system";
import React, { useState } from "react";

export const NewContainer = (props) => {
	const { data } = props;
	console.log(data, "eee");
	const result = React.useMemo(() =>
		data.map((an, i) => (
			<Row key={i}>
				<Col sm={3}>
					<h3>length of the new box {i}</h3>
					<h3 className="h3">{an.length}mm</h3>
				</Col>
				<Col sm={3}>
					<h3>width of the new box {i}</h3>
					<h3 className="h3">{an.width}mm</h3>
				</Col>
				<Col sm={3}>
					<h3>height of the new box {i}</h3>
					<h3 className="h3">{an.height}mm</h3>
				</Col>
				<Col sm={3}>
					<h3>quantity of items {i}</h3>
					<h3 className="h3">{an.cart[0].quantity}</h3>
				</Col>
			</Row>
		))
	);
	return <>{result}</>;
};
