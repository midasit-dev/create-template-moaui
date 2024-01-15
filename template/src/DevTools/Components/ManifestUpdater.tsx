import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Utils from '../Utils';
import Constant from '../constant.json';

interface ToolProps { 
	containerSize: {
		width: number; 
		height: number;
	};
}

const Tool = (props: ToolProps) => {
	if (!Utils.IsDevEnv()) return null;

	const { containerSize } = props;

	const changeManifest = async (width: number, height: number) => {
		const newInfo = { width: width, height: height };
  
		try {
			const response = await fetch(`${Constant.baseUrl}/update-manifest`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newInfo),
			});
	
			if (response.ok) {
				console.log('Info updated successfully');
			} else {
				console.error('Update failed');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	}

	return (
		<Moaui.Panel variant='shadow2' padding={2} borderRadius='4px'>
			<Moaui.GuideBox width="100%" row spacing={3} center>
				<Moaui.GuideBox spacing={2} row verCenter>
					<Moaui.GuideBox spacing={1} center row>
						<Moaui.Icon iconName='PhotoSizeSelectActual' />
						<Moaui.Typography variant='h1'>Container Size</Moaui.Typography>
					</Moaui.GuideBox>
					<Moaui.Separator direction='vertical' />
					<Moaui.Tooltip title="this size is automatically calculated" placement='top'>
						<Moaui.Typography>{`${containerSize.width} x ${containerSize.height}`}</Moaui.Typography>
					</Moaui.Tooltip>
				</Moaui.GuideBox>

				<Moaui.Tooltip 
					title={
						<Moaui.GuideBox center>
							<Moaui.Typography>"public/manifest.json" will be updated</Moaui.Typography>
							<Moaui.Typography>It will be refresh this page.</Moaui.Typography>
						</Moaui.GuideBox>
					}
					placement='top'
				>
					<Moaui.Button
						color='negative'
						onClick={async () => await changeManifest(containerSize.width, containerSize.height)}
					>
						Update
					</Moaui.Button>
				</Moaui.Tooltip>
			</Moaui.GuideBox>
		</Moaui.Panel>
	)
}

export default Tool;