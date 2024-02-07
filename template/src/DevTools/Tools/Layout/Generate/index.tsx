import React from 'react';
import {
  GuideBox,
  Icon,
  IconButton,
  Panel,
	Typography,
} from '@midasit-dev/moaui';
import { useBoxes } from './useBoxes';
import { useController } from './useController';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CanvasState, LayerRenderingBoxesState, LayersState } from '../recoilState';
import PanelCanvas from './PanelCanvas';
import PanelControllerVirtualLayerValues from './PanelControllerVirtualLayerValues';
import PanelControllerJoystick from './PanelControllerJoystick';
import PanelJsonDropListLayerImport from './PanelJsonDropListLayerImport';
import PanelJsonButtonLayerView from './PanelJsonButtonLayerView';
import PanelJsonButtonLayerSave from './PanelJsonButtonLayerExport';

const App = () => {
	const [boxes, setBoxes] = useRecoilState(LayerRenderingBoxesState);
	const layers = useRecoilValue(LayersState);

	const canvasState = useRecoilValue(CanvasState);

  const {
    initialize: initializeInputs,
		getCurrentControllerInputs,
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
		if (e.ctrlKey && e.key === 'Enter') handleClickAddBox('default', getCurrentControllerInputs());
		if (e.ctrlKey && e.key === 'ArrowLeft') handleClickAddBox('left', getCurrentControllerInputs());
		if (e.ctrlKey && e.key === 'ArrowRight') handleClickAddBox('right', getCurrentControllerInputs());
		if (e.ctrlKey && e.key === 'ArrowUp') handleClickAddBox('top', getCurrentControllerInputs());
		if (e.ctrlKey && e.key === 'ArrowDown') handleClickAddBox('bottom', getCurrentControllerInputs());
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

	//setBoxes를 newBoxes로 업데이트 해도 import한 key가 같으면 리렌더링되지 않는 문제해결을 위해
	//강제 리렌더링용 상태 정의
	const [forceRender, setForceRender] = React.useState(true);

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
						<GuideBox width="100%" row horSpaceBetween verCenter>
							<Typography variant='h1'>Canvas</Typography>
						</GuideBox>
						<PanelCanvas />
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
								<PanelControllerVirtualLayerValues />
								<PanelControllerJoystick />
								</GuideBox>
						</GuideBox>
					</Panel>
				</div>
				<Panel width="100%" variant="box" padding={2} border='1px solid #d1d1d1' backgroundColor='#fff'>
					<GuideBox width="100%" spacing={2}>
						<GuideBox width="100%" row horSpaceBetween verCenter>
							<Typography variant='h1'>JSON</Typography>
						</GuideBox>
						<PanelJsonDropListLayerImport />
						<PanelJsonButtonLayerView />
						<PanelJsonButtonLayerSave />
					</GuideBox>
				</Panel>
			</GuideBox>
    </GuideBox>
  );
};

export default App;
