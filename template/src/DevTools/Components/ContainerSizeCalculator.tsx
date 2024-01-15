import React from 'react';
import Utils from '../Utils';

interface ToolProps {
	setContainerSize: React.Dispatch<React.SetStateAction<any>>;
}

/**
 * Container Size Checker
 * 
 * @description You can see the size of the container (your plug-in item).
 * 							The code below is for testing. 
 * 							You can delete it, but it is code that shows the final size of the Plug-in.
 */
const Tool = (props: ToolProps) => {
	const { setContainerSize, } = props;
	
	React.useEffect(() => {
		if (!Utils.IsDevEnv()) return;

		//Get the width and height values of the entire container.
		const myElement = document.getElementById('container');
		if (myElement === null) return;
		const width = myElement.offsetWidth;
		const height = myElement.offsetHeight;

		setContainerSize({ width: width, height: height });
	}, [setContainerSize]);

	return <></>;
}

export default Tool;