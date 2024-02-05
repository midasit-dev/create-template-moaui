import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import {
	GuideBox,
	Icon,
	IconButton, Typography
} from '@midasit-dev/moaui';
import { type LayoutSchema, type LayoutSchemas } from '../../../types';
import { useRecoilState } from 'recoil';
import { LayoutSchemaState } from '../recoilState';

export const style: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export interface RndBoxProps {
  bounds?: string;
  defaultX: number;
  defaultY: number;
  defaultWidth: number;
  defaultHeight: number;
  dragGrid?: [number, number];
  resizeGrid?: [number, number];
  children?: React.ReactNode;

  id?: string;
  spacing: number;

	//Buttons
  onDelete?: (id: string) => void;
  onSendStyleToController?: (inputs: any) => void;
}

export const DraggableResizableBox: React.FC<RndBoxProps> = ({
	children, id, onDelete, onSendStyleToController, ...props
}) => {
	const [schemas, setSchemas] = useRecoilState(LayoutSchemaState);

	const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
	};

	const onMouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
	};

	const [width, setWidth] = useState(props.defaultWidth);
	const [height, setHeight] = useState(props.defaultHeight);
	const [x, setX] = useState(props.defaultX);
	const [y, setY] = useState(props.defaultY);

	const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
		const _x = parseInt(position.x);
		const _y = parseInt(position.y);
		setX(_x);
		setY(_y);

		const _width = parseInt(ref.style.width);
		const _height = parseInt(ref.style.height);
		setWidth(_width);
		setHeight(_height);

		handleBoxSchemas(_x, _y, _width, _height);
	};

	const handleDragStop = (e: any, d: any) => {
		const _x = parseInt(d.x);
		const _y = parseInt(d.y);
		setX(_x);
		setY(_y);

		handleBoxSchemas(_x, _y, width, height);
	};

	const handleBoxSchemas = (x: number, y: number, width: number, height: number) => {
		if (setSchemas) {
			setSchemas((prev) => {
				const newBoxSchemas = prev.map((box) => {
					if (box.id === id) {
						return {
							...box,
							x,
							y,
							width,
							height,
						};
					}
					return box;
				});
				return newBoxSchemas;
			});

			setUpdateSchema4Parent && setUpdateSchema4Parent(true);
		}
	};

	// add parent key to box schemas
	const [updateBoxSchemas4Parent, setUpdateSchema4Parent] = useState(false);
	React.useEffect(() => {
		if (!updateBoxSchemas4Parent) return;

		const findParent = (curSchema: LayoutSchema, schemas: LayoutSchemas): string | null => {
			const parents: LayoutSchemas = [];
			for (const schema of schemas) {
				if (
					curSchema.x >= schema.x &&
					curSchema.y >= schema.y &&
					curSchema.x + curSchema.width <= schema.x + schema.width &&
					curSchema.y + curSchema.height <= schema.y + schema.height
				) {
					if (curSchema.id === schema.id) continue;
					parents.push(schema);
				}
			}
			parents.sort((a, b) => a.x - b.x);
			return parents.length > 0 ? parents[parents.length - 1].id : null;
		};

		const addParentId = (schemas: LayoutSchemas): LayoutSchemas => {
			return schemas.map((schema) => {
				const parentId = findParent(schema, schemas) || null;
				return { ...schema, parent: schema.id === parentId ? undefined : parentId };
			});
		};

		const temp = addParentId(schemas);
		setSchemas(temp);

		setUpdateSchema4Parent(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateBoxSchemas4Parent]);

	//해당 컴포넌트 생성 시 parent 구조 추가
	React.useEffect(() => {
		setUpdateSchema4Parent(true);
	}, []);

	return (
		<div onClick={onClickHandler} onMouseDown={onMouseDownHandler}>
			<Rnd
				style={{
					...style,
					backgroundColor: `rgba(0, 0, 0, .1)`,
				}}
				default={{
					x: props.defaultX,
					y: props.defaultY,
					width: props.defaultWidth,
					height: props.defaultHeight,
				}}
				bounds={props.bounds}
				dragGrid={props.dragGrid}
				resizeGrid={props.resizeGrid}
				onResizeStop={handleResizeStop}
				onDragStop={handleDragStop}
			>
				<Typography>{`[${x}, ${y}] ${width} x ${height}`}</Typography>
				{onDelete && (
					<div style={{ position: 'absolute', top: 0, right: 0 }}>
						<GuideBox row>
							<IconButton
								transparent
								onClick={() => {
									onSendStyleToController &&
										onSendStyleToController({
											x,
											y,
											width,
											height,
											spacing: props.spacing,
										});
								}}
							>
								<Icon iconName='Style' />
							</IconButton>
							<IconButton transparent onClick={() => onDelete(id || '')}>
								<Icon iconName='Close' />
							</IconButton>
						</GuideBox>
					</div>
				)}
				{children}
			</Rnd>
		</div>
	);
};
