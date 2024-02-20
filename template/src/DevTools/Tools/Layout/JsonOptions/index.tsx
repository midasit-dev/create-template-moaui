import Load from './Load';
import View from './View';
import Save from './Save';
import { 
	GuideBox, 
	Separator,
} from '@midasit-dev/moaui';

const App = () => {
	return (
		<GuideBox row verCenter spacing={2}>
			<GuideBox>
				<GuideBox row verCenter spacing={1}>
					<Save />
					<Separator direction='vertical' />
					<Load />
				</GuideBox>
			</GuideBox>
			<GuideBox>
				<View />
			</GuideBox>
		</GuideBox>
	)
}

export default App;