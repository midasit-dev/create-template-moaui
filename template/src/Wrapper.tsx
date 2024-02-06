
/**
* 
* ██████╗       ██╗    ██╗██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ 
* ╚════██╗      ██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
*  █████╔╝█████╗██║ █╗ ██║██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝
* ██╔═══╝ ╚════╝██║███╗██║██╔══██╗██╔══██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗
* ███████╗      ╚███╔███╔╝██║  ██║██║  ██║██║     ██║     ███████╗██║  ██║
* ╚══════╝       ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
* 
* @description Wrapper for Pyscript
* @next ./src/App.tsx
*/

import React from 'react';
import { RecoilRoot } from 'recoil';
import App from './App';
import {
	GuideBox,
	IconButton,
	Icon,
} from '@midasit-dev/moaui';
import {
	SnackbarProvider,
	closeSnackbar
} from 'notistack';
import devTools from "./DevTools"
import { Signature as SignatureMoaui } from '@midasit-dev/moaui';
import Signature from './Signature';

const ValidWrapper = () => {
	const [bgColor, setBgColor] = React.useState('#eee');
	React.useEffect(() => {
		fetch(`${process.env.PUBLIC_URL}/manifest.json`)
			.then(response => response.json())
			.then(data => data.name ? setBgColor(data.background_color) : null)
			.catch(error => console.error('Error fetching manifest.json:', error));
	}, []);

	React.useEffect(() => {
		Signature.log();
		SignatureMoaui.log();
	}, []);

	return (
		<>
			<RecoilRoot>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					action={(key) => (
						<IconButton transparent transparentColor="white" onClick={() => closeSnackbar(key)}>
							<Icon iconName="Close" />
						</IconButton>
					)}
				>
					{/** Production Mode */}
					{!devTools.IsDevEnv() &&
						<GuideBox tag="AppBackground" show center fill={bgColor} width="100%">
							<App />
						</GuideBox>
					}

					{/** Development Mode */}
					{devTools.IsDevEnv() &&
						<devTools.Kit bgColorState={[bgColor, setBgColor]}>
							<GuideBox tag="AppBackground" show center fill={bgColor} borderRadius='0 0 4px 4px' spacing={3}>
								<App />
							</GuideBox>
						</devTools.Kit>
					}
				</SnackbarProvider>
			</RecoilRoot>
		</>
	);
};

export default ValidWrapper;