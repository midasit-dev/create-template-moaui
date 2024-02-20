import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
	CanvasState,
	LayersState,
} from '../recoilState';
import {
	Color,
	GuideBox,
	Panel,
} from '@midasit-dev/moaui';
import { Rnd } from 'react-rnd';
import { type Layer } from '../../../types';
import PanelSelectedLayerId from './PanelSelectedLayer';
import PanelOptionsAdd from './PanelOptionsAdd';
import PanelOptionsModifyDelete from './PanelOptionsModifyDelete';
import ToComponent from './ToComponent';
import '../SelectedLayer.css';

const App = () => {
	const [canvas,] = useRecoilState(CanvasState);
	const [layers,] = useRecoilState(LayersState);

	const canvasStyle = { relative: true, width: canvas.width, height: canvas.height, };

	return (
		<GuideBox row width="100%">

			<GuideBox width="100%" height='auto'>
				<Panel {...canvasStyle} variant='shadow2'>
					{layers.map((layer: Layer, index: number) => {
						return <ToComponent key={index} layer={layer} />;
					})}
				</Panel>
			</GuideBox>

			<GuideBox>
				<div style={{ position: 'relative', width: 'auto', height: 'auto' }}>
					<Rnd default={{ x: -300, y: 0, width: 300, height: 0, }}>
						<PanelOptionsAdd />
					</Rnd>
					<Rnd default={{ x: -300 - 16 - 300, y: 0, width: 300, height: 0, }}>
						<PanelOptionsModifyDelete />
					</Rnd>
					<Rnd default={{ x: -300 - 16 - 300 - 16 - 350, y: 0, width: 350, height: 0, }}>
						<PanelSelectedLayerId />
					</Rnd>
				</div>
			</GuideBox>

		</GuideBox>
	)
}

export default App;