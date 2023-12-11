import React from 'react';
import { Button } from '@midasit-dev/moaui';

const defaultButtonString = 'API POST Python Script :)';

const Component = () => {
	const [clicked, setClicked] = React.useState(false);
	const [buttonString, setButtonString] = React.useState(defaultButtonString);

  const handleClick = async () => {
    try {
			if (clicked === false) {
				// FOR PYTHON SCRIPTING (GET FUNCTION PY PYTHON CODE)
				// To invoke the function asynchronously, retrieve the method from pyscript.interpreter.
				// @see ./public/python/Code.py
				const pyFunction = pyscript.interpreter.globals.get('apiPost');

				// Awaits the Promise returned by the Python function.
				const response = await pyFunction('API.KEY.TEST');
				const result = JSON.parse(response);

				setClicked(true);
				setButtonString(JSON.stringify(result, null, 2));
			} else {
				setClicked(false);
				setButtonString(defaultButtonString);
			}
    } catch (error) {
      console.error('Failed to fetch data from Python function:', error);
      alert('An error occurred while fetching data.');
    }
  };

  return (
		<Button
			color={clicked ? 'normal' : 'negative'}
			onClick={handleClick}
		>
			{buttonString}
		</Button>
  );
};

export default Component;