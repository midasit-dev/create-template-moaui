import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Header from '../Shared/Header';
import { rowHeaderHeight } from '../Shared/HeaderBodyStyles';
import { TextField, Typography, TextFieldProps } from '@mui/material';
import _ from 'lodash';
import { motion } from 'framer-motion';
import { InnerContentSizeAutoState, InnerContentSizeState } from "../../../../recoilState";
import { useRecoilState } from "recoil";

const InnerContentSize = (props: any) => {
	const {
		containerSizeState
	} = props;

	const [, setContainerSize] = containerSizeState;
	const [isAuto, setIsAuto] = useRecoilState(InnerContentSizeAutoState);
	const [size, setSize] = useRecoilState(InnerContentSizeState);

	const debounceModifySize = _.debounce((width: number, height: number) => {
		setSize({ width, height });
	}, 500);

	React.useEffect(() => {
		//Get the width and height values of the entire container.
		const myElement = document.getElementById('container');
		if (myElement === null) return;
		const width = myElement.offsetWidth;
		const height = myElement.offsetHeight;
		setContainerSize({ width, height });
	}, [setContainerSize]);

	const [reRender, setRerender] = React.useState(false);

	const textWidthProps = {
		width: 60,
		variant: 'standard',
		defaultValue: size.width,
		sx: { width: 60 },
		onChange: (e: any) => debounceModifySize(Number(e.target.value), size.height),
		disabled: isAuto
	} as TextFieldProps;

	const textHeightProps = {
		type: "number",
		defaultValue: size.height,
		variant: 'standard',
		sx: { width: 60 },
		onChange: (e: any) => debounceModifySize(size.width, Number(e.target.value)),
		disabled: isAuto
	} as TextFieldProps;

	return (
		<Moaui.GuideBox width="100%" height={rowHeaderHeight} horSpaceBetween verCenter row>

			<Moaui.GuideBox row spacing={1} verCenter>
				<Header title="Inner-Content Size" noSeparator />
				<Moaui.Tooltip title="Auto" placement='top'>
					<Moaui.Switch checked={isAuto} onChange={() => {
						if (isAuto) {
							//Auto 상태에서 수동으로 변경할 때
							const myElement = document.getElementById('container');
							if (myElement === null) return;
							const width = myElement.offsetWidth;
							const height = myElement.offsetHeight;
							setSize({ width, height: height - 32 });
							setRerender(true);
						} else {
							setRerender(false);
						}

						setIsAuto(!isAuto);
					}} />
				</Moaui.Tooltip>
			</Moaui.GuideBox>

			{isAuto && (
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0  }}
				>
					<Typography>Calculated automatically</Typography>
				</motion.div>
			)}
			{!isAuto && reRender && (
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0  }}
				>
					<Moaui.GuideBox row spacing={1} verCenter>
						<TextField {...textWidthProps} />
						<Typography>x</Typography>
						<TextField {...textHeightProps} />
					</Moaui.GuideBox>
				</motion.div>
			)}

		</Moaui.GuideBox>
	)
}

export default InnerContentSize;