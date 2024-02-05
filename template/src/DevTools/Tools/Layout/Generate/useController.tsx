import React, { useState } from 'react';
import { ControllerInputs } from '../../../types';

const handleSetter = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setter(Number(e.target.value));
};

export const useController = () => {
	const defaultInputs: ControllerInputs = React.useMemo(() => ({
		x: 0,
		y: 0,
		width: 160,
		height: 48,
		spacing: 0,
	}), []);

	const initialize = React.useCallback((inputs = defaultInputs) => {
		console.log(inputs);

		setX(inputs.x);
		setY(inputs.y);
		setWidth(inputs.width);
		setHeight(inputs.height);
		setSpacing(inputs.spacing);
	}, [defaultInputs]);

	const [x, setX] = useState(defaultInputs.x);
	const handleChangeX = handleSetter(setX);

	const [y, setY] = useState(defaultInputs.y);
	const handleChangeY = handleSetter(setY);

	const [width, setWidth] = useState(defaultInputs.width);
	const handleChangeWidth = handleSetter(setWidth);

	const [height, setHeight] = useState(defaultInputs.height);
	const handleChangeHeight = handleSetter(setHeight);

	const [spacing, setSpacing] = useState(defaultInputs.spacing);
	const handleChangeSpacing = handleSetter(setSpacing);

	const getInputs = React.useCallback(() => {
		return { x, y, width, height, spacing, };
	}, [x, y, width, height, spacing]);

	return {
		initialize,
		x, setX, handleChangeX,
		y, setY, handleChangeY,
		width, handleChangeWidth,
		height, handleChangeHeight,
		spacing, handleChangeSpacing,
		getInputs,
	};
};
