import React from 'react';
import {
  GuideBox,
  Icon,
  IconButton,
  TextFieldV2,
  Panel,
  Tooltip,
	Button,
	Typography,
	Dialog,
} from '@midasit-dev/moaui';
import { useBoxes } from './useBoxes';
import { useController } from './useController';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CanvasState, LayerRenderingBoxesState, LayersState } from '../recoilState';

const App = () => {
	const [boxes, setBoxes] = useRecoilState(LayerRenderingBoxesState);
	const layers = useRecoilValue(LayersState);

  const {
    initialize: initializeInputs,
    x, handleChangeX,
    y, handleChangeY,
    width, handleChangeWidth,
    height, handleChangeHeight,
    spacing, handleChangeSpacing,
		getInputs,
		showVirtualLayer, setShowVirtualLayer,
		VirtualLayer,
  } = useController();

	const {
		handleClickPrevDelete,
		handleClickDelAllBoxes,
		handleClickAddBox,
		createNewBox,
	} = useBoxes({initializeInputs});

	// shortcut
	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		//input
		if (e.ctrlKey && e.key === 'i') initializeInputs();

		//button
		if (e.ctrlKey && e.key === 'Enter') handleClickAddBox('default', getInputs());
		if (e.ctrlKey && e.key === 'ArrowLeft') handleClickAddBox('left', getInputs());
		if (e.ctrlKey && e.key === 'ArrowRight') handleClickAddBox('right', getInputs());
		if (e.ctrlKey && e.key === 'ArrowUp') handleClickAddBox('top', getInputs());
		if (e.ctrlKey && e.key === 'ArrowDown') handleClickAddBox('bottom', getInputs());
		if (e.ctrlKey && e.key === 'Backspace') handleClickPrevDelete();
		if (e.ctrlKey && e.key === 'Delete') handleClickDelAllBoxes();
	};

	React.useEffect(() => {
		//layers가 초기에 값이 []인데, 채워져 있으면 실행한다.
		const newBoxes = [];
		for (const schema of layers) {
			newBoxes.push(createNewBox(schema.props.id, {
				x: schema.props.x,
				y: schema.props.y,
				width: schema.props.width,
				height: schema.props.height,
				spacing: 0,
			}));
		}

		setBoxes(newBoxes);
	}, [createNewBox, layers, setBoxes]);

	//for Canvas local values
	const [canvasState, setCanvasState] = useRecoilState(CanvasState);
	const [_canvasWidth, _setCanvasWidth] = React.useState<number>(canvasState.width);
	const [_canvasHeight, _setCanvasHeight] = React.useState<number>(canvasState.height);

	//json
	const [openLayerJson, setOpenLayerJson] = React.useState<boolean>(false);

  return (
    <GuideBox row width="100%">
			<div
				style={{
					width: '100%',
					height: 'calc(100vh - 32px)',
				}}
			>
				<div
					className='wrapper-box'
					style={{
						width: canvasState.width,
						height: canvasState.height,
						maxWidth: '100%',
						maxHeight: 'calc(100vh - 32px)',
						boxSizing: 'border-box',
						display: 'flex',
						flexWrap: 'wrap',
						alignContent: 'flex-start',
						backgroundColor: 'var(--color-bg, #ffffff)',
						boxShadow: 'var(--elevation-200-canvas, 0px 0px .5px rgba(0, 0, 0, .18), 0px 3px 8px rgba(0, 0, 0, .1), 0px 1px 3px rgba(0, 0, 0, .1))',
						borderRadius: '0.25rem',
					}}
					tabIndex={0}
					onKeyDown={handleOnKeyDown}
				>
					<VirtualLayer />
					{boxes.map((box) => box.element)}
				</div>
			</div>
			<GuideBox spacing={2} marginLeft={2}>
				<Panel width="100%" variant="box" padding={2} marginLeft={2} border='1px solid #d1d1d1' backgroundColor='#fff'>
					<GuideBox spacing={2}>
						<Typography variant='h1'>Canvas</Typography>
						<GuideBox width='100%' spacing={1} horRight>
							<TextFieldV2
								title="width"
								onChange={(e: any) => _setCanvasWidth(Number(e.target.value))}
								numberOptions={{ onlyInteger: true, min: 0, step: 16 }}
								type="number"
								value={_canvasWidth.toString()}
							/>
							<TextFieldV2
								title="height"
								onChange={(e: any) => _setCanvasHeight(Number(e.target.value))}
								numberOptions={{ onlyInteger: true, min: 0, step: 16 }}
								type="number"
								value={_canvasHeight.toString()}
							/>
						</GuideBox>
						<GuideBox width="100%" horRight>
							<Button onClick={() => {
									setCanvasState({
										width: _canvasWidth,
										height: _canvasHeight,
									});
								}}>
									Apply
							</Button>
						</GuideBox>
					</GuideBox>
				</Panel>
				<div tabIndex={1} onKeyDown={handleOnKeyDown}>
					<Panel variant="box" padding={2} border='1px solid #d1d1d1' backgroundColor='#fff'>
						<GuideBox row spacing={2}>
							<GuideBox width="100%" spacing={2}>
								<GuideBox width="100%" row horSpaceBetween verCenter>
									<Typography variant='h1'>Controller</Typography>
									<IconButton transparent onClick={() => setShowVirtualLayer(!showVirtualLayer)}>
										<Icon iconName='Visibility' />
									</IconButton>
								</GuideBox>
								<GuideBox width="100%">
									<GuideBox width='100%' spacing={1}>
										<TextFieldV2
											title="x"
											onChange={handleChangeX}
											numberOptions={{ onlyInteger: true, min: 0 }}
											type="number"
											value={x.toString()}
										/>
										<TextFieldV2
											title="y"
											onChange={handleChangeY}
											numberOptions={{ onlyInteger: true, min: 0 }}
											type="number"
											value={y.toString()}
										/>
										<TextFieldV2
											title="width"
											onChange={handleChangeWidth}
											numberOptions={{ onlyInteger: true, min: 0 }}
											type="number"
											value={width.toString()}
										/>
										<TextFieldV2
											title="height"
											onChange={handleChangeHeight}
											numberOptions={{ onlyInteger: true, min: 0 }}
											type="number"
											value={height.toString()}
										/>
										<GuideBox width="100%" horRight borderRadius={1}>
											<Tooltip title="refresh Ctrl + i">
												<IconButton color='negative' onClick={() => initializeInputs()}>
													<Icon iconName='Refresh' />
												</IconButton>
											</Tooltip>
										</GuideBox>
									</GuideBox>
								</GuideBox>
								<GuideBox show fill='#f1f1f1' width="100%" borderRadius={1} padding={1} border='1px solid #ddd' spacing={1}>
									<GuideBox width='100%' row horSpaceBetween verCenter>
										<GuideBox>
											<GuideBox row>
												<div style={{ opacity: 0 }}>
													<IconButton transparent disabled>
														<Icon iconName="ExpandMore" />
													</IconButton>
												</div>
												<Tooltip title="add top Ctrl + Up">
													<IconButton transparent onClick={() => handleClickAddBox('top', getInputs())} color="negative">
														<Icon iconName="ExpandLess" />
													</IconButton>
												</Tooltip>
												<div style={{ opacity: 0 }}>
													<IconButton transparent disabled>
														<Icon iconName="ExpandMore" />
													</IconButton>
												</div>
											</GuideBox>
											<GuideBox row>
												<Tooltip title="add left Ctrl + Left">
													<IconButton transparent onClick={() => handleClickAddBox('left', getInputs())} color="negative">
														<Icon iconName="NavigateBefore" />
													</IconButton>
												</Tooltip>
												<Tooltip title="add bottom Ctrl + Bottom">
													<IconButton transparent onClick={() => handleClickAddBox('bottom', getInputs())} color="negative">
														<Icon iconName="ExpandMore" />
													</IconButton>
												</Tooltip>
												<Tooltip title="add right Ctrl + Right">
													<IconButton transparent onClick={() => handleClickAddBox('right', getInputs())} color="negative">
														<Icon iconName="NavigateNext" />
													</IconButton>
												</Tooltip>
											</GuideBox>
										</GuideBox>
										<GuideBox row>
											<Tooltip title="add Ctrl + Enter">
												<IconButton transparent onClick={() => handleClickAddBox('default', getInputs())} color='negative'>
													<Icon iconName='Add' />
												</IconButton>
											</Tooltip>
											<Tooltip title="del Ctrl + Backspace">
												<IconButton transparent onClick={handleClickPrevDelete}>
													<Icon iconName="Clear" />
												</IconButton>
											</Tooltip>
											<Tooltip title="del all Ctrl + Delete">
												<IconButton transparent onClick={handleClickDelAllBoxes}>
													<Icon iconName="ClearAll" />
												</IconButton>
											</Tooltip>
										</GuideBox>
									</GuideBox>
									<GuideBox show fill='#e8e8e8' padding={1} border='1px solid #ddd'>
										<TextFieldV2 title="spacing" onChange={handleChangeSpacing} numberOptions={{ onlyInteger: true, min: 0 }} type="number" value={spacing.toString()} />
									</GuideBox>
								</GuideBox>
							</GuideBox>
						</GuideBox>
					</Panel>
				</div>
				<Panel width="100%" variant="box" padding={2} border='1px solid #d1d1d1' backgroundColor='#fff'>
					<Button onClick={() => {setOpenLayerJson(true)}}>Layer json</Button>
					<Dialog
						open={openLayerJson}
						setOpen={setOpenLayerJson}
						onClose={() => setOpenLayerJson(false)}
						headerTitle='layer json'
					>
						<GuideBox row spacing={2}>
							<pre style={{ fontSize: '12px' }}>{JSON.stringify(boxes, null, 2)}</pre>
							<pre style={{ fontSize: '12px' }}>{JSON.stringify(layers, null, 2)}</pre>
						</GuideBox>
					</Dialog>
				</Panel>
			</GuideBox>
    </GuideBox>
  );
};

export default App;
