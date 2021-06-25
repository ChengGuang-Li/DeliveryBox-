/* eslint-disable no-new-object */
/* eslint-disable no-array-constructor */
export function GenerateSmartSendContainerDimension(
	l,
	w,
	h,
	quantity,
	lStep,
	wStep,
	canModify
) {
	let newContainer = {
		length: 1,
		width: 1,
		height: 1,
	};
	let hStep = Math.ceil(quantity / (wStep * lStep));
	let minorStep = Math.floor(l / h);
	let vHeight = h * hStep;

	let LENGTH_LAYER_MAX4 = 4000;

	let maxwStep = Math.floor(LENGTH_LAYER_MAX4 / w);
	let maxlStep = Math.floor(LENGTH_LAYER_MAX4 / l);
	let maxhStep = Math.floor(LENGTH_LAYER_MAX4 / h);

	if (minorStep * lStep * wStep < quantity) {
		//region setup the LENGTH_LAYER_MAX
		let LENGTH_LAYER_MAX = 250; //mm
		let LENGTH_LAYER_MAX0 = 250;
		let LENGTH_LAYER_MAX1 = 500;
		let LENGTH_LAYER_MAX2 = 1000;
		let LENGTH_LAYER_MAX3 = 2000;
		// single product's height
		let LENGTH_LAYER_SINGLE0 = 50; //mm
		let LENGTH_LAYER_SINGLE1 = 100;
		let LENGTH_LAYER_SINGLE2 = 200;
		let LENGTH_LAYER_SINGLE3 = 400;
		if (h <= LENGTH_LAYER_SINGLE0) {
			if (vHeight < LENGTH_LAYER_MAX1) LENGTH_LAYER_MAX = LENGTH_LAYER_MAX0;
			else if (vHeight < LENGTH_LAYER_MAX2)
				LENGTH_LAYER_MAX = LENGTH_LAYER_MAX1;
			else if (vHeight < LENGTH_LAYER_MAX3)
				LENGTH_LAYER_MAX = LENGTH_LAYER_MAX2;
			else if (vHeight < LENGTH_LAYER_MAX4)
				LENGTH_LAYER_MAX = LENGTH_LAYER_MAX3;
			else LENGTH_LAYER_MAX = LENGTH_LAYER_MAX4;
		} else if (h <= LENGTH_LAYER_SINGLE1) {
			if (vHeight < LENGTH_LAYER_MAX2) LENGTH_LAYER_MAX = LENGTH_LAYER_MAX1;
			else if (vHeight < LENGTH_LAYER_MAX3)
				LENGTH_LAYER_MAX = LENGTH_LAYER_MAX2;
			else if (vHeight < LENGTH_LAYER_MAX4)
				LENGTH_LAYER_MAX = LENGTH_LAYER_MAX3;
			else LENGTH_LAYER_MAX = LENGTH_LAYER_MAX4;
		} else if (h <= LENGTH_LAYER_SINGLE2) {
			if (vHeight < LENGTH_LAYER_MAX3) LENGTH_LAYER_MAX = LENGTH_LAYER_MAX2;
			else if (vHeight < LENGTH_LAYER_MAX4)
				LENGTH_LAYER_MAX = LENGTH_LAYER_MAX3;
			else LENGTH_LAYER_MAX = LENGTH_LAYER_MAX4;
		} else if (h <= LENGTH_LAYER_SINGLE3) {
			if (vHeight < LENGTH_LAYER_MAX4) LENGTH_LAYER_MAX = LENGTH_LAYER_MAX3;
			else LENGTH_LAYER_MAX = LENGTH_LAYER_MAX4;
		} else LENGTH_LAYER_MAX = LENGTH_LAYER_MAX4;
		//endregion
		if (canModify) {
			wStep = Math.ceil(vHeight / LENGTH_LAYER_MAX);
			wStep = wStep > maxwStep ? maxwStep : wStep;
			while (lStep + 1 <= maxlStep && (wStep - 1) * w > (lStep + 1) * l) {
				if (minorStep * lStep * wStep < quantity) {
					lStep += 1;
					wStep -= 1;
				} else {
					break;
				}
			}
		}
	}
	hStep = Math.ceil(quantity / (wStep * lStep));
	//console.log("hStep:", hStep, "  ", "maxhStep:", maxhStep);
	newContainer.length = lStep * l;
	newContainer.width = wStep * w;
	newContainer.height = hStep * h;

	if (hStep > maxhStep) {
		//console.log("pase");
		if (wStep + 1 > maxwStep) lStep += 1;
		else wStep += 1;

		newContainer = GenerateSmartSendContainerDimension(
			l,
			w,
			h,
			quantity,
			lStep,
			wStep,
			false
		);
	} else if (Math.ceil(newContainer.height / newContainer.length) > 3) {
		lStep += 1;
		newContainer = GenerateSmartSendContainerDimension(
			l,
			w,
			h,
			quantity,
			lStep,
			wStep,
			true
		);
	}
	//console.log(wStep, "++");
	return newContainer;
}

export function generateNewContainer(cartItem) {
	let lssc = [];
	//create object
	const MAX_CONTAINER_WEIGHT = 1000000; //1000kg
	const VOLUME_LAYER_MAX = 64000000000; //64 cubic meters
	let array = new Array(cartItem.length, cartItem.width, cartItem.height);
	array.sort((v1, v2) => {
		return v2 - v1;
	});

	const l = array[0];
	const w = array[1];
	const h = array[2];
	//let length, width, height;
	const wbatch = Math.ceil(MAX_CONTAINER_WEIGHT / cartItem.Weight);
	const vbatch = Math.ceil(VOLUME_LAYER_MAX / (l * w * h));
	//console.log(vbatch, "vbatch");
	let left = cartItem.quantity;
	while (left > 0) {
		let process = Math.min(left, Math.min(wbatch, vbatch));
		let result = GenerateSmartSendContainerDimension(
			l,
			w,
			h,
			process,
			1,
			1,
			true
		);
		//console.log(result, "xxx");

		let shoppingCart = new Array();
		//deep clone
		let _obj = JSON.stringify(cartItem);
		let singleShoppingCartItem = JSON.parse(_obj);

		singleShoppingCartItem.quantity = process;
		//console.log(singleShoppingCartItem, "singleItem");
		shoppingCart.push(singleShoppingCartItem);
		//console.log(result.height, "height");
		//console.log(cart, "cart");
		//console.log(result.height, "height");
		//console.log(cart, "cart");
		const newContainer = {
			height: result.height,
			length: result.length,
			width: result.width,
			cart: shoppingCart,
		};
		console.log(newContainer, "newContainer");
		//ssc.Cart = cart;
		lssc.push(newContainer);
		left -= process;
	}
	return lssc;
}
