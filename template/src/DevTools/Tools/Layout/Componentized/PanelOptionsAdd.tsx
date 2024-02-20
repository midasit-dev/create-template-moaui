import { useState, useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Moaui, {
	Panel,
	GuideBox,
	Typography,
	DropList,
	Button,
	Dialog,
} from '@midasit-dev/moaui';
import ToPropComponents from './ToPropComponents';
import { LayersState, OpacityBySelectedLayerIdState, PropComponentLayerAddValueState, SelectedLayerIdState, SelectedLayerState } from '../recoilState';
import { Layer, Layers } from '../../../types';
import { v4 as uuid4 } from 'uuid';

const App = () => {
	//itemList를 만들기 위한 useState
	const [items, setItems] = useState(new Map<string, number>());
	const [reverseItems, setReverseItems] = useState(new Map<number, string>());
	useEffect(() => {
		setItems(new Map<string, number>(Object.keys(Moaui)
			.filter((key => !excludeComponentList.includes(key)))
				.map((key: string, index: number) => [key, index + 1])));
	}, []);
	useEffect(() => {
		if (items.size !== 0) {
			const reverse = new Map<number, string>();
			items.forEach((value, key) => reverse.set(value, key));
			setReverseItems(reverse);
		}
	}, [items]);

	//for Drop List
	const [value, setValue] = useState(1);
	function onChangeHandler(event: any){
		setValue(event.target.value);
	}

	//Add 버튼 클릭 시, 

	//Component Type이 변경되면 propCompLayerAddValue를 초기화
	const [propCompLayerAddValue, setPropCompLayerAddValue] = useRecoilState(PropComponentLayerAddValueState);
	const selectedLayer = useRecoilValue(SelectedLayerState);
	useEffect(() => {
		const curComponentType = reverseItems.get(value) as string;
		if (curComponentType === undefined) return;
		setPropCompLayerAddValue((prev: Layer) => {
			const isEqualType = curComponentType === prev.type;
			//생성 시점 UUID 기록
			const addUUID = uuid4().slice(0, 8);
			const countChildrenLength = (selectedLayer?.children?.length || 0) + 1;
			const newId = `${countChildrenLength}-${curComponentType}-${addUUID}`;
			return {
				id: newId,
				type: curComponentType,
				props: isEqualType ? prev.props : {},
				children: isEqualType ? prev.children : [],
			}
		});
	}, [reverseItems, setPropCompLayerAddValue, value, selectedLayer?.children]);

	//Layer State
	const [, setLayers] = useRecoilState(LayersState);

	//for selected ID
	const [selectedLayerId,] = useRecoilState(SelectedLayerIdState);
	const opacityBySelectedLayerId = useRecoilValue(OpacityBySelectedLayerIdState);

	//for dialog
	const [open, setOpen] = useState(false);

	//for onAddHandler
	const onClickHandlerAdd = useCallback(() => {
		setLayers((prev: Layers) => {
			return prev.map((layer: Layer) => {
				if (layer.id === selectedLayerId) {
					const updatedChildren =
						layer.children ? [...layer.children, propCompLayerAddValue] : [propCompLayerAddValue];
					return {
						...layer,
						children: updatedChildren,
					};
				}
				return layer;
			});
		});
	}, [propCompLayerAddValue, selectedLayerId, setLayers]);

	const onKeyDownHandler = useCallback((e: React.KeyboardEvent) => {
		if (e.ctrlKey && e.key === 'Enter') onClickHandlerAdd();
	}, [onClickHandlerAdd]);

	return (
		<div onKeyDown={onKeyDownHandler}>
			<Panel width={300} variant="shadow2" padding={2} border='1px solid #d1d1d1' backgroundColor='#fff'>

				<GuideBox spacing={2} opacity={opacityBySelectedLayerId}>
					<Typography variant='h1'>Add Component</Typography>
					<GuideBox width="100%" spacing={2}>
						<GuideBox width="100%" row horSpaceBetween verCenter>
							<DropList
								itemList={items}
								width="100%"
								defaultValue="Korean"
								value={value}
								onChange={onChangeHandler}
							/>
						</GuideBox>
						<GuideBox width="100%" spacing={1}>
							<GuideBox width="100%" spacing={1}>
								<ToPropComponents componentType={reverseItems.get(value) as string} customHookType="Add" />
							</GuideBox>
							<GuideBox width="100%" row spacing={2}>
								<GuideBox flexGrow={1}>
									<GuideBox width="100%" row horRight verCenter spacing={2}>
										<Typography color='#a5a5a7'>Ctrl + Enter</Typography>
										<Button
											color='negative'
											onClick={onClickHandlerAdd}
											disabled={selectedLayerId === null}
										>
											Add
										</Button>
										<Button 
											onClick={() => setOpen(true)}
											disabled={selectedLayerId === null}
										>
											JSON
										</Button>
									</GuideBox>
								</GuideBox>
								<Dialog
									headerTitle='JSON for Creating Component'
									open={open}
									setOpen={setOpen}
									onClose={() => setOpen(false)}
								>
									<pre>
										{JSON.stringify(propCompLayerAddValue, null, 2)}
									</pre>
								</Dialog>
							</GuideBox>
						</GuideBox>
					</GuideBox>
				</GuideBox>

			</Panel>
		</div>
	)
}

export default App;

const excludeComponentList = [
	'Color',
	'Font',
	// 'Button',
	'Check',
	'CheckGroup',
	'DataGrid',
	// 'DropList',
	'Grid',
	'IconButton',
	// 'Panel',
	'Radio',
	'RadioGroup',
	'Separator',
	'Stack',
	'Switch',
	'SwitchGroup',
	'Tab',
	'TabGroup',
	'Table',
	'TableBody',
	'TableCell',
	'TableHead',
	'TableRow',
	// 'TextField',
	// 'TextFieldV2',
	'Typography',
	'TypographyGroup',
	'Icon',
	'CodeBlock',
	'Scrollbars',
	'List',
	'ListItem',
	'ListItemButton',
	'MidasController',
	'Dialog',
	'ChartLine',
	'GuideBox',
	'Alert',
	'Chip',
	'Tooltip',
	'FloatingBox',
	'VerifyDialog',
	'VerifyUtil',
	'Signature',
]