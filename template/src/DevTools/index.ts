import { default as ManifestUpdater } from './Components/ManifestUpdater';
import { default as TitleBarSample } from './Components/TitleBarSample';
import { default as ContainerSizeCalculator } from './Components/ContainerSizeCalculator';

import { IsDevEnv } from './Utils';

export {
	ManifestUpdater,
	TitleBarSample,
	ContainerSizeCalculator,
	
	IsDevEnv,
}

const Tools = {
	ManifestUpdater,
	TitleBarSample,
	ContainerSizeCalculator,

	IsDevEnv,
};

export default Tools;