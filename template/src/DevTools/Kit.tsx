import React from 'react';
import {
	GuideBox,
	Panel,
} from '@midasit-dev/moaui';
import MidasController from '@midasit-dev/moaui/Components/MidasController';
import SideBarButton from './Tools/Shared/SideBarButton';
import { default as ToolsHome } from './Tools/Home';
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

	const currentMenuState: { currentMenuState: [string, React.Dispatch<React.SetStateAction<string>>]; } 
		= { currentMenuState: [currentMenu, setCurrentMenu] };

	return (
		<GuideBox show row width="100%" height='100vh' fill={"transparent"}>

			{/** Sidebar */}
			<GuideBox width="auto" height='inherit' paddingY={2} paddingLeft={2}>
				<GuideBox row height="inherit" spacing={3}>
					{/** Sidebar Buttons */}
					<GuideBox height='inherit' spacing={2}>
						<SideBarButton {...currentMenuState} iconName='Home' menuName='Home' placement='right' />
						<SideBarButton {...currentMenuState} iconName='GridOn' menuName='Layout' placement='right' />
					</GuideBox>
				</GuideBox>
			</GuideBox>

			<GuideBox width="100%" padding={2}>

				{currentMenu === 'Home' && (
					<GuideBox width='100%' row>
						<GuideBox flexGrow={1} center height="100vh">
							<div id='container'>
								<Panel variant="shadow2" padding={0} borderRadius='4px' border='1px solid #a7a777a'>
									<GuideBox width="auto">
										<MidasController icoSrc={`${process.env.PUBLIC_URL}/favicon.ico`} title={title} />
										{children}
									</GuideBox>
								</Panel>
							</div>
						</GuideBox>

						<GuideBox>
							<Panel variant="box" backgroundColor='#fff' padding={0} borderRadius='4px' border='1px solid #d1d1d1'>
								<GuideBox width={350} padding={2}>
									<GuideBox width='100%'>
										<ToolsHome titleState={[title, setTitle]} containerSizeState={[containerSize, setContainerSize]} bgColorState={[bgColor, setBgColor]} />
									</GuideBox>
								</GuideBox>
							</Panel>
						</GuideBox>
					</GuideBox>
				)}

				{currentMenu === 'Layout' && ( <Playground /> )}
			</GuideBox>

		</GuideBox>
	)
}

export default Kit;