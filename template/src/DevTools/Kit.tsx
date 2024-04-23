import React from 'react';
import { GuideBox, } from '@midasit-dev/moaui';
import Home from './Tools/Home';
import Playground from '@midasit-dev/playground';

const useStateKit = () => {
	const [title, setTitle] = React.useState('');
  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/manifest.json`)
      .then(response => response.json())
      .then(data => data.name ? setTitle(data.name) : null)
      .catch(error => console.error('Error fetching manifest.json:', error));
  }, []);

	const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
	const [currentMenu, setCurrentMenu] = React.useState('Home');

	return { 
		title, 
		setTitle, 
		containerSize, 
		setContainerSize, 
		currentMenu, 
		setCurrentMenu,
	}
}

interface KitProps {
	children: React.ReactNode;
	bgColorState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const Kit = (props: KitProps) => {
	const { 
		children,
		bgColorState,
	} = props;

	const [bgColor, setBgColor] = bgColorState;
	const { 
		title, 
		setTitle, 
		containerSize, 
		setContainerSize, 
		currentMenu, 
		setCurrentMenu,
	} = useStateKit();

	const currentMenuState: { currentMenuState: [string, React.Dispatch<React.SetStateAction<string>>]; } = { currentMenuState: [currentMenu, setCurrentMenu] };

	return (
		<GuideBox row width="100%" height='100vh'>

			{/* <GuideBox width="auto" height='inherit' paddingY={2} paddingLeft={2}>
				<GuideBox row height="inherit" spacing={3}>
					<GuideBox height='inherit' spacing={2}>
						<SideBarButton {...currentMenuState} iconName='Home' menuName='Home' placement='right' />
						<SideBarButton {...currentMenuState} iconName='GridOn' menuName='Layout' placement='right' />
					</GuideBox>
				</GuideBox>
			</GuideBox> */}

			<GuideBox width="100%">

				{currentMenu === 'Home' && (
					<Home
						title={title}
						setTitle={setTitle}
						containerSize={containerSize}
						setContainerSize={setContainerSize}
						bgColor={bgColor}
						setBgColor={setBgColor}
					>
						{children}
					</Home>
				)}

				{currentMenu === 'Layout' && ( <Playground /> )}
			</GuideBox>

		</GuideBox>
	)
}

export default Kit;