import React from 'react';
import { GuideBox, Icon, IconButton, TextField } from '@midasit-dev/moaui';
import onClickHandler from '../../Shared/OnClickHandler';
import { useRecoilValue } from 'recoil';
import { CanvasState, LayersState } from '../recoilState';
import { ExportLayers } from '../../../types';
import { useSnackbar } from 'notistack';

interface Time {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	full: () => string;
	fullWithExtension: (postfix: string) => string;
	sample: () => string;
}

const getCurrentTime = (): Time => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const fullString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}-${hour < 10 ? `0${hour}` : hour}-${minute < 10 ? `0${minute}` : minute}-${second < 10 ? `0${second}` : second}`;
	return {
		year,
		month,
		day,
		hour,
		minute,
		second,
		full: () => fullString,
		fullWithExtension: (postfix: string) => `${fullString}.${postfix}`,
		sample: () => '{{Current Date}}.json'
	};
};

const App = () => {
	const [value, setValue] = React.useState<string>('');
	const canvas = useRecoilValue(CanvasState);
	const layers = useRecoilValue(LayersState);

	const { enqueueSnackbar } = useSnackbar();

	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox flexGrow={1}>
				<TextField 
					width='100%'
					placeholder={getCurrentTime().sample()}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</GuideBox>
			<IconButton
				transparent
				onClick={async () => {
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
						layers: layers,
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