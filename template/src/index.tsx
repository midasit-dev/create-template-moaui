import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.Fragment>
		<App />
		{/** FOR PYTHON SCRIPTING (PYTHON CODE LINKING) */}
		{React.createElement('py-script', { src: './Python/Code.py' })}
	</React.Fragment>
);
