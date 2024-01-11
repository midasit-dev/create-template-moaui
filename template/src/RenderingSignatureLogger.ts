const currentVersionFromPackageJson = '1.1.18';

export const RenderingSignatureLogger = () => {
	const logo = `███╗   ███╗ ██████╗  █████╗ ██╗   ██╗██╗       ██████╗██████╗  █████╗ \n████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║      ██╔════╝██╔══██╗██╔══██╗\n██╔████╔██║██║   ██║███████║██║   ██║██║█████╗██║     ██████╔╝███████║\n██║╚██╔╝██║██║   ██║██╔══██║██║   ██║██║╚════╝██║     ██╔══██╗██╔══██║\n██║ ╚═╝ ██║╚██████╔╝██║  ██║╚██████╔╝██║      ╚██████╗██║  ██║██║  ██║\n╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝       ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝`;
	const title = `cra-template with moaui v${currentVersionFromPackageJson}`;
	const deploy = `- deploy: https://www.npmjs.com/package/@midasit-dev/cra-template-moaui`
	const repository = `- repository: https://github.com/midasit-dev/create-template-moaui`;

	console.log(`${logo}\n${title}\n${deploy}\n${repository}`);

	return null;
}