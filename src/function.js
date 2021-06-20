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
	console.log("hStep:", hStep, "  ", "maxhStep:", maxhStep);
	newContainer.length = lStep * l;
	newContainer.width = wStep * w;
	newContainer.height = hStep * h;

	if (hStep > maxhStep) {
		console.log("pase");
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
	console.log(wStep, "++");
	return newContainer;
}
