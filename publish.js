const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Read package.json
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Bump up the version
const currentVersion = packageJson.version;
const newVersion = bumpVersion(currentVersion);
packageJson.version = newVersion;

// Update package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
console.log(`Updated package.json version to ${newVersion}`);

// Update logRenderingSignature.ts
const logRenderingSignaturePath = path.resolve(__dirname, 'template', 'src', 'Signature.tsx');
const logRenderingSignatureContent = fs.readFileSync(logRenderingSignaturePath, 'utf-8');

// Replace the version string in logRenderingSignature.ts
const updatedContent = logRenderingSignatureContent.replace(
  /const currentVersionFromPackageJson = '[^']*'/,
  `const currentVersionFromPackageJson = '${newVersion}'`
);

fs.writeFileSync(logRenderingSignaturePath, updatedContent, 'utf-8');
console.log(`Updated logRenderingSignature.ts with the new version ${newVersion}`);

//npm publish
exec('npm publish', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during npm publish: ${error}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
console.log(`Published to NPM ${newVersion}`);

function bumpVersion(version) {
  const versionParts = version.split('.');
  const newPatch = parseInt(versionParts[2]) + 1;
  return `${versionParts[0]}.${versionParts[1]}.${newPatch}`;
}
