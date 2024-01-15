import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Utils from '../Utils';
import Constant from '../constant.json';

/**
 * Container Size Updator
 * 
 * @description You can see the size of the container (your plug-in item).
 * 							The code below is for testing. 
 * 							You can delete it, but it is code that shows the final size of the Plug-in.
 */
const Tool = () => {
	const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
	const [constainerSizeUpdate, setContainerSizeUpdate] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (!Utils.IsDevEnv()) return;

		if (constainerSizeUpdate) {
			//Get the width and height values of the entire container.
			const myElement = document.getElementById('container');
			if (myElement === null) return;
			const width = myElement.offsetWidth;
			const height = myElement.offsetHeight;

			setContainerSize({ width: width, height: height });
			setContainerSizeUpdate(false);
		}
	}, [constainerSizeUpdate, setContainerSize]);

	const changeManifestJson = React.useCallback(async (width: number, height: number) => {
		const newInfo = { width: width, height: height };
  
		try {
			const response = await fetch(`${Constant.baseUrl}/public/manifest-json`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newInfo),
			});
	
			if (response.ok) {
				console.log('Change Manifest.json updated successfully');
			} else {
				console.error('Update failed');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	}, []);

	if (!Utils.IsDevEnv()) return null;

	return (
		<Moaui.GuideBox width="100%" spacing={2} center>
			<Moaui.GuideBox width="100%" spacing={1.5} verCenter>
				<Moaui.GuideBox width="100%" row horSpaceBetween verCenter>
					<Moaui.GuideBox width="100%" spacing={1} row verCenter>
						<Moaui.Icon iconName='PhotoSizeSelectActual' />
						<Moaui.Typography variant='h1'>Container Size</Moaui.Typography>
					</Moaui.GuideBox>


				</Moaui.GuideBox>
				<Moaui.Separator />
			</Moaui.GuideBox>

			<Moaui.GuideBox row width="100%" spacing={5} verCenter height={30} horSpaceBetween>
				<Moaui.GuideBox row verCenter spacing={1} loading={loading}>
					<Moaui.Tooltip title="re-calculate the container size" placement='top'>
						<Moaui.IconButton
							transparent
							onClick={() => {
								setLoading(true);
								setTimeout(() => {
									try {
										setContainerSizeUpdate(true);
									} finally {
										setLoading(false);
									}
								}, 500);
							}}
						>
							<>
								<Moaui.Icon iconName='Refresh' />
								<Moaui.Typography>{`${containerSize.width}px x ${containerSize.height}px`}</Moaui.Typography>
							</>
						</Moaui.IconButton>
					</Moaui.Tooltip>
				</Moaui.GuideBox>

				<Moaui.Tooltip 
					title={
						<Moaui.GuideBox center>
							<Moaui.GuideBox center row>
								<Moaui.Chip color='primary' size="small" label='public/manifest.json' />
							</Moaui.GuideBox>
							<Moaui.Typography>It will be refresh this page.</Moaui.Typography>
						</Moaui.GuideBox>
					}
					placement='left'
				>
					<Moaui.Button
						color='negative'
						onClick={async () => await changeManifestJson(containerSize.width, containerSize.height)}	
					>
						Update
					</Moaui.Button>
				</Moaui.Tooltip>
			</Moaui.GuideBox>
			
		</Moaui.GuideBox>
	)
}

export default Tool;