//You must run the development mode once to normalize the function below.
export const IsDevEnv = () => process.env.NODE_ENV !== 'development';

const Utils = {
	IsDevEnv,
};

export default Utils;