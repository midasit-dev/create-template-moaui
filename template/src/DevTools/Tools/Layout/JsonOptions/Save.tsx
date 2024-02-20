import React from 'react';
import { GuideBox, Icon, IconButton, TextField } from '@midasit-dev/moaui';
import onClickHandler from '../../Shared/OnClickHandler';
import { useRecoilValue } from 'recoil';
import { CanvasState, LayersState } from '../recoilState';
import { ExportLayers, Layer, Layers } from '../../../types';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';

function replaceIds(layers: Layers, saveUUID: string): Layers {
	function createNewId(id: string) {
		const idArr = id.split('-');
		if (idArr.length === 3) idArr.push(saveUUID);
		if (idArr.length === 4) idArr[3] = saveUUID;
		if (idArr.length !== 3 && idArr.length !== 4) throw new Error('Invalid id Type');
		return idArr.join('-');
	}

	function findAndReplaceId(layer: Layer): Layer {
		return {
			...layer,
			id: createNewId(layer.id),
			children: layer.children ? layer.children.map(findAndReplaceId) : [],
		}
	}

	return layers.map(layer => findAndReplaceId(layer));
}

interface Time {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	fullString: string;
	fullStringWithDash: string;
	fullWithExtension: (postfix: string) => string;
	sample: () => string;
}

const getCurrentTime = (): Time => {
	const date = new Date();
	const year = date.getFullYear();
	const sYear = `${year}`.slice(2, 4);
	const month = date.getMonth() + 1;
	const sMonth = `${month}`.length === 1 ? `0${month}` : `${month}`;
	const day = date.getDate();
	const sDay = `${day}`.length === 1 ? `0${day}` : `${day}`;
	const hour = date.getHours();
	const sHour = `${hour}`.length === 1 ? `0${hour}` : `${hour}`;
	const minute = date.getMinutes();
	const sMinute = `${minute}`.length === 1 ? `0${minute}` : `${minute}`;
	const second = date.getSeconds();
	const sSecond = `${second}`.length === 1 ? `0${second}` : `${second}`;
	const fullString = `${sYear}${sMonth}${sDay}${sHour}${sMinute}${sSecond}`;
	const fullStringWithDash = `${year}${sMonth}${sDay}-${sHour}${sMinute}${sSecond}`;
	return {
		year,
		month,
		day,
		hour,
		minute,
		second,
		fullString,
		fullStringWithDash,
		fullWithExtension: (postfix: string) => `${fullStringWithDash}.${postfix}`,
		sample: () => '{{Current Date}}.json'
	};
};

const App = () => {
	const [value, setValue] = React.useState<string>('');
	const canvas = useRecoilValue(CanvasState);
	const layers = useRecoilValue(LayersState);

	const { enqueueSnackbar } = useSnackbar();

	return (
		<GuideBox row horSpaceBetween spacing={1}>
			<GuideBox flexGrow={1}>
				<TextField 
					width='250px'
					placeholder={getCurrentTime().sample()}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</GuideBox>
			<IconButton
				color='negative'
				onClick={async () => {
					//동일한 id, key일 경우 리렌더링이 되지 않는 문제 해결을 위해
					//id값에 uuid를 붙여준다.
					//저장 시점 UUID 기록
					const saveUUID = uuidv4().slice(0, 8);

					let prevValue = value;
					if (prevValue === '') {
						prevValue = getCurrentTime().fullWithExtension('json');
					}
					if (!prevValue.includes('.json')) prevValue += '.json';
					const exportLayers: ExportLayers = {
						canvas: {
							width: canvas.width,
							height: canvas.height,
						},
						layers: replaceIds(layers, saveUUID),
					};

					const data = await onClickHandler({
						path: '/exports/layers',
						body: {
							fileName: prevValue,
							content: JSON.stringify(exportLayers, null, 2),
						},
						method: 'post',
					});

					if (data.message) {
						enqueueSnackbar(data.message, { variant: 'success' });
					}
				}}
			>
				<Icon iconName='Save' />
			</IconButton>
		</GuideBox>
	)
}

export default App;