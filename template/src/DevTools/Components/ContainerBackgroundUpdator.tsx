import React from 'react';
import Moaui from '@midasit-dev/moaui';
import { HexColorPicker } from "react-colorful";
import { debounce } from 'lodash';

/**
 * Container Background Color Updator
 * 
 * @description You can change the background color of the container (your plug-in item).
 */

interface ToolProps {
	containerBackgroundColorState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const Tool = (props: ToolProps) => {
	const { containerBackgroundColorState } = props;
	const [color, setColor] = containerBackgroundColorState;

	const debouncedSetColor = debounce((newColor: string) => {
    setColor(newColor);
  }, 500);

	return (
		<Moaui.GuideBox width="100%" spacing={2} center>
		
			<Moaui.GuideBox width="100%" spacing={1.5} verCenter>
				<Moaui.GuideBox width="100%" spacing={1} row>
					<Moaui.Icon iconName='Palette' />
					<Moaui.Typography variant='h1'>Container Background Color</Moaui.Typography>
				</Moaui.GuideBox>
				<Moaui.Separator />
			</Moaui.GuideBox>

			<HexColorPicker color={color} onChange={setColor} />
			<Moaui.GuideBox row width="100%" center spacing={2}>
				<Moaui.Typography>Hex</Moaui.Typography>
				<Moaui.TextField
					width={70}
					value={color}
					onChange={(e) => debouncedSetColor(e.target.value)}
				/>
			</Moaui.GuideBox>

		</Moaui.GuideBox>
	)
}

export default Tool;