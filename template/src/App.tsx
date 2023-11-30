import React from 'react';
import { CodeBlock, Color } from "@midasit-dev/moaui";

function App() {
	return (
		<>
			<div style={backgroundStyle} />
			<div style={outlineStyle}>
				<img 
					style={imgStyle}
					src="https://raw.githubusercontent.com/midasit-dev/moaui/feature/storybook-from-dev/midas_ci_350x150.svg"  
					alt="Midas IT" 
				/>
				<p style={pStyle}>Enjoy, moaui components</p>
				<p style={pStyle2}>Copy and paste to src/App.tsx and save reload this page.</p>
				<div style={{ opacity: 0.95, }} >
					<CodeBlock title="Sample Code" language='typescript'>
						{SampleCode}
					</CodeBlock>
				</div>
				<a href="https://feature-storybook-from-dev--6556d17f924e868b000ddaf5.chromatic.com/" target="_blank" rel="noopener noreferrer"><p style={pStyle3}>Learn moaui</p></a>
			</div>
		</>
	);
}

export default App;

const SampleCode = `import React from 'react';
import Sample from './Sample';

function App() {
	return <Sample />;
}

export default App;
`

const backgroundStyle: any = {
	position: 'absolute',
	top: '0px',
	left: '0px',
	width: '100%',
	height: '100%',
	backgroundColor: Color.primary.enable,
}

let outlineValue = 600;
const outlineStyle: any = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	width: outlineValue,
	height: outlineValue,
	marginTop: -(outlineValue * 0.5),
	marginLeft: -(outlineValue * 0.5),
}

const imgStyle: any = {
	display: 'block',
	marginLeft: 'auto',
	marginRight: 'auto',
	width: '350px',
	height: '150px',
}

const pStyle: any = {
	fontSize: '30px',
	textAlign: 'center',
	color: Color.text.secondary
}

const pStyle2: any = {
	fontSize: '20px',
	textAlign: 'center',
	color: Color.text.third,
	marginBottom: '40px',
}

const pStyle3: any = {
	fontSize: '20px',
	textAlign: 'center',
	color: Color.secondary.main,
	marginBottom: '40px',
	textDecoration: 'underline',
}