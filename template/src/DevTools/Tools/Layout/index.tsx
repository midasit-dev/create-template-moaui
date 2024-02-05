import React from 'react';

import {
	GuideBox,
} from '@midasit-dev/moaui';

import SideBarButton from '../SharedComponents/SideBarButton';
import Generate from './Generate';
import Sketch from './Sketch';

function useStateApp() {
	const [menu, setMenu] = React.useState<'Generate' | 'Sketch' | 'FloatingBox'>('Generate');
	return {
		menu, setMenu,
	};
}

const App = () => {
	const {
		menu, setMenu,
	} = useStateApp();

	return (
		<GuideBox width="100%" height='inherit'>
			<GuideBox width="100%" row height="inherit" spacing={3}>
				{/** Sidebar Buttons */}
				<GuideBox height='inherit' spacing={2}>
					<SideBarButton currentMenuState={[menu, setMenu]} iconName='Gesture' menuName='Generate' />
					<SideBarButton currentMenuState={[menu, setMenu]} iconName='HighlightAlt' menuName='Sketch' />
					<SideBarButton currentMenuState={[menu, setMenu]} iconName='Houseboat' menuName='FloatingBox' />
				</GuideBox>

				{menu === 'Generate' && <Generate />}
				{menu === 'Sketch' && <Sketch />}
			</GuideBox>
		</GuideBox>
	)
}

export default App;