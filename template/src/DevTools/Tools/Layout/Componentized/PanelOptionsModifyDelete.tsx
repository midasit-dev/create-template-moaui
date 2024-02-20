import { useState, useEffect, useCallback } from 'react';
import {
	Panel,
	Typography,
	GuideBox,
	IconButton,
	Icon,
	FloatingBox,
	Button,
	Color,
} from '@midasit-dev/moaui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LayersState, OpacityBySelectedLayerIdState, SelectedLayerIdState, SelectedLayerState, PropComponentLayerModifyValueState, defaultLayerProps } from '../recoilState';
import { Layer } from '../../../types';
import ToPropComponents from './ToPropComponents';

const ModifyDeleteComponent = (props: { layer: Layer, index: number, }) => {
	const { layer, index, } = props;
	const selectedLayerId = useRecoilValue(SelectedLayerIdState);
	const [, setLayers] = useRecoilState(LayersState);

	const [modifyValue, setModifyValue] = useRecoilState(PropComponentLayerModifyValueState);

	const [selected, setSelected] = useState(false);
	useEffect(() => {
		if (modifyValue && modifyValue.id === layer.id) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [layer.id, modifyValue]);

	return (
		<GuideBox width="100%" spacing={2}>
			<GuideBox width="100%" row verCenter horSpaceBetween>
				<GuideBox row verCenter spacing={1}>
					<Typography variant='body1'>{`(${index})`}</Typography>
					<Typography variant='body1'>{layer.type}</Typography>
				</GuideBox>
				<GuideBox row horSpaceBetween verCenter spacing={1}>
					{selected &&
						<IconButton transparent onClick={() => setModifyValue(null)}>
							<Icon iconName='KeyboardDoubleArrowLeft'  />
						</IconButton>
					}
					{!selected &&
						<IconButton disabled={selected} onClick={() => setModifyValue(layer)}>
							<Icon iconName='Palette'/>
						</IconButton>
					}
					<IconButton 
						disabled={selectedLayerId === null} 
						color='negative'
						onClick={() => {
							if (modifyValue && modifyValue.id === layer.id) {
								setModifyValue(null);
							}
							setLayers((prev: Layer[]) => {
								return prev.map((prevLayer: Layer) => {
									if (prevLayer.id === selectedLayerId) {
										return {
											...prevLayer,
											children: prevLayer.children?.filter((_, i) => i !== index),
										};
									}
									return prevLayer;
								});
							});
						}}
					>
						<Icon iconName='Clear' />
					</IconButton>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	)
}

const PanelModify = () => {
	const [, setLayers] = useRecoilState(LayersState);
	const selectedLayer = useRecoilValue(SelectedLayerState);
	const [modifyValue, setModifyValue] = useRecoilState(PropComponentLayerModifyValueState);

	const onClickApply = useCallback(() => {
		setLayers((prev: Layer[]) => {
			return prev.map((prevLayer: Layer) => {
				if (selectedLayer && modifyValue && prevLayer.id === selectedLayer.id) {
					//children 배열 안에서 modifyValue.id와 동일한 id를 가진 Layer를 찾아서 변경해준다.
					return {
						...prevLayer,
						children: prevLayer.children?.map((child: Layer) => {
							if (child.id === modifyValue.id) return modifyValue;
							return child;
						}),
					}
				}
				return prevLayer;
			});
		});
	}, [modifyValue, selectedLayer, setLayers]);

	const onKeyDownHandler = useCallback((e: React.KeyboardEvent) => {
		if (e.ctrlKey && e.key === 'Enter') onClickApply();
		if (e.key === 'Escape') setModifyValue(null);
	}, [onClickApply, setModifyValue]);

	return (
		<FloatingBox {...{ x: 300 + 8, y: 0, width: 300, height: 300, border: '1px solid #d1d1d1'}}>
			<div onKeyDown={onKeyDownHandler} style={{width: '100%', height: 'auto'}}>
				<Panel width="100%" variant='shadow2' padding={2} border={`1px solid ${Color.primaryNegative.main}`} backgroundColor='#f5f5f7'>
					<GuideBox width="100%" spacing={2}>
						<GuideBox width='100%' row verCenter horSpaceBetween>
							<Icon iconName='KeyboardDoubleArrowLeft' toButton onClick={() => setModifyValue(null)} />
							<Typography variant='h1'>Modify Component Props</Typography>
						</GuideBox>
						{modifyValue && 
							<GuideBox width="100%" spacing={2}>
								<Typography variant='body1'>{`${modifyValue.id}`}</Typography>
								<ToPropComponents componentType={modifyValue.type} customProps={modifyValue.props} customHookType="Modify" />
								<GuideBox width="100%" row horRight verCenter spacing={2}>
									<Typography color='#a5a5a7'>Ctrl + Enter</Typography>
									<Button color='negative' onClick={onClickApply}>Apply</Button>
									<Button onClick={() => setModifyValue(null)}>Cancel</Button>
								</GuideBox>
							</GuideBox>
						}
					</GuideBox>
				</Panel>
			</div>
		</FloatingBox>	
	)
}

const App = () => {
	const opacityBySelectedLayerId = useRecoilValue(OpacityBySelectedLayerIdState);
	const [selectedLayerId,] = useRecoilState(SelectedLayerIdState);
	const selectedLayer = useRecoilValue(SelectedLayerState);
	const [modifyValue, setModifyValue] = useRecoilState(PropComponentLayerModifyValueState);

	//Selected Layer (FloatingBox)의 id값이 달라지면, PanelModify를 닫는다.
	useEffect(() => setModifyValue(null), [selectedLayerId, setModifyValue]);

	return (
		<Panel width={300} variant="shadow2" padding={2} border='1px solid #d1d1d1' backgroundColor='#fff'>
			<GuideBox spacing={2} opacity={opacityBySelectedLayerId}>
				<Typography variant='h1'>Modify / Delete Components</Typography>
				{selectedLayer && selectedLayer.children && selectedLayer.children.length > 0 &&
					<GuideBox width="100%" spacing={2}>
						{selectedLayer.children.map((layer: Layer, index: number) => {
							return <ModifyDeleteComponent key={index} index={index} layer={layer} />;
						})}
					</GuideBox>
				}
			</GuideBox>
			{selectedLayer && modifyValue && <PanelModify />}
		</Panel>
	)
}

export default App;