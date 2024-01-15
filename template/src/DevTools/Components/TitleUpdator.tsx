import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Constant from '../constant.json';

interface ToolProps {
	titleState: [string, React.Dispatch<React.SetStateAction<string>>];
}

/**
 * Title Updator
 * 
 * @description You can change the title of the plug-in.
 */
const Tool = (props: ToolProps) => {
	const [title, setTitle] = props.titleState;

	const changeManifestJson = React.useCallback(async (_title: string) => {
		const newInfo = { 
			short_name: _title, 
			name: _title,
		};
  
		try {
			const response = await fetch(`${Constant.baseUrl}/public/manifest-json`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newInfo),
			});
	
			if (response.ok) {
				console.log('Change Manifest.json successfully');
			} else {
				console.error('Update failed');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	}, []);

	return (
		<Moaui.GuideBox width="100%" spacing={2} center>

			<Moaui.GuideBox width="100%" spacing={1.5} verCenter>
				<Moaui.GuideBox width="100%" spacing={1} row>
					<Moaui.Icon iconName='Title' />
					<Moaui.Typography variant='h1'>Plug-in Title</Moaui.Typography>
				</Moaui.GuideBox>
				<Moaui.Separator />
			</Moaui.GuideBox>

			<Moaui.GuideBox row width="100%" horSpaceBetween verCenter spacing={2}>
				<Moaui.TextField
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<Moaui.Tooltip 
					title={
						<Moaui.GuideBox center>
							<Moaui.GuideBox center row>
								<Moaui.Chip color='primary' size="small" label='public/manifest.json' />
								<Moaui.Chip color='primary' size="small" label='public/index.html' />
							</Moaui.GuideBox>
							<Moaui.Typography>It will be refresh this page.</Moaui.Typography>
						</Moaui.GuideBox>
					}
					placement='left'
				>
					<Moaui.Button
						color='negative'
						onClick={async () => await changeManifestJson(title)}
					>
						Update
					</Moaui.Button>
				</Moaui.Tooltip>
			</Moaui.GuideBox>

		</Moaui.GuideBox>
	)
}

export default Tool;