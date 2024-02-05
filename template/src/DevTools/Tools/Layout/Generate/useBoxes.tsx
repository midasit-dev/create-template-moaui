import React from 'react';
import { DraggableResizableBox } from './DraggableResizableBox';
import { ControllerInputs } from '../../../types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LayoutBoxState, LayoutSchemaState } from '../recoilState';

interface useBoxesProps {
	initializeInputs: any;
}

export const useBoxes = (props: useBoxesProps) => {
	const [boxes, setBoxes] = useRecoilState(LayoutBoxState);
	const setSchemas = useSetRecoilState(LayoutSchemaState);

	const {
		initializeInputs,
	} = props;

	const handleClickDelete = React.useCallback((id: string) => {
		setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
		setSchemas((prevBoxSchemas) => prevBoxSchemas.filter((box) => box.id !== id));
	}, [setBoxes, setSchemas]);

	const handleClickPrevDelete = React.useCallback(() => {
		let prevId = '';
		if (boxes.length > 0) {
			const temp = boxes.map((box) => box.id);
			prevId = temp.pop() || '';
			setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== prevId));
		}
		handleClickDelete(prevId);
	}, [boxes, handleClickDelete, setBoxes]);

	const handleClickDelAllBoxes = React.useCallback(() => {
		setBoxes([]);
		setSchemas([]);
	}, [setBoxes, setSchemas]);

	const createNewBox = React.useCallback((id: string, inputs: ControllerInputs) => {
		return {
			id: id,
			element: (
				<DraggableResizableBox
					key={id}
					defaultX={inputs.x}
					defaultY={inputs.y}
					defaultWidth={inputs.width}
					defaultHeight={inputs.height}
					bounds=".wrapper-box"
					dragGrid={[8, 8]}
					resizeGrid={[8, 8]}
					spacing={0}
					id={id}
					onDelete={(id) => handleClickDelete(id)}
					onSendStyleToController={initializeInputs}
				/>
			),
		};
	}, [handleClickDelete, initializeInputs]);

	const handleClickAddBox = React.useCallback((
		type: 'default' | 'left' | 'right' | 'top' | 'bottom' = 'default',
		inputs: ControllerInputs
	) => {
		const newId = `box-${Date.now()}`;

		let modifiedX = inputs.x;
		if (boxes.length > 0) {
			if (type === 'left') modifiedX -= (inputs.width + inputs.spacing);
			if (type === 'right') modifiedX += (inputs.width + inputs.spacing);
		}

		let modifiedY = inputs.y;
		if (boxes.length > 0) {
			if (type === 'top') modifiedY -= (inputs.height + inputs.spacing);
			if (type === 'bottom') modifiedY += (inputs.height + inputs.spacing);
		}

		const newInputs = {
			x: modifiedX,
			y: modifiedY,
			width: inputs.width,
			height: inputs.height,
			spacing: inputs.spacing,
		}

		//input 최신화
		initializeInputs(newInputs);

		//새로운 box 생성
		const newBox = createNewBox(newId, newInputs);
		setBoxes((prevBoxes) => [...prevBoxes, newBox]);
		setSchemas((prevBoxSchemas) => [
			...prevBoxSchemas,
			{
				id: newId,
				x: modifiedX,
				y: modifiedY,
				width: inputs.width,
				height: inputs.height,
			},
		]);
	}, [boxes.length, createNewBox, initializeInputs, setBoxes, setSchemas]);

	return {
		handleClickDelete,
		handleClickPrevDelete,
		handleClickDelAllBoxes,
		handleClickAddBox,
		createNewBox,
	};
};
