/* global pyscript */
// import react library
import React from 'react';
// import Button of moaui library
import { Button } from '@midasit-dev/moaui';

// Define Component
const Component = () => {
	return (
		<Button
			color="negative"
			onClick={() => {
				// FOR PYTHON SCRIPTING (GET FUNCTION PY PYTHON CODE)
				// @see ./public/python/Code.py
				const func = pyscript.interpreter.globals.get("helloWorld");
				alert(func());
			}}
		>
			{'"helloWorld" of Python Script :)'}
		</Button>
	)
}

export default Component;