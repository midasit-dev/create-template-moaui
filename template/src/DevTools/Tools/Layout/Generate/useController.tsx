import React, { useState } from 'react';
import { ControllerInputs } from '../../../types';
import { Rnd } from 'react-rnd';
import './VirtualLayer.css';

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
		setX(inputs.x);
		setY(inputs.y);
		setWidth(inputs.width);
		setHeight(inputs.height);
		setSpacing(inputs.spacing);
	}, [defaultInputs]);

	const [showVirtualLayer, setShowVirtualLayer] = useState(true);

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

	const VirtualLayer = React.useCallback(() => {
		if (!showVirtualLayer) return null;
		return (
			<Rnd
				className='virtual-layer'
				default={{
					x: x,
					y: y,
					width: width,
					height: height,
				}}
				bounds="parent"
				enableResizing={false}
				disableDragging={true}
			/>
		);
	}, [showVirtualLayer, x, y, width, height]);

	return {
		initialize,
		x, setX, handleChangeX,
		y, setY, handleChangeY,
		width, handleChangeWidth,
		height, handleChangeHeight,
		spacing, handleChangeSpacing,
		getInputs,
		showVirtualLayer, setShowVirtualLayer,
		VirtualLayer,
	};
};
