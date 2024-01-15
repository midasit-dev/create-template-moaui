const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const constantPath = path.join(__dirname, 'constant.json');
const constantJson = fs.readFileSync(constantPath, 'utf-8');
const constant = JSON.parse(constantJson);
const port = constant.port;
const baseUrl = constant.baseUrl;

app.put('/public/manifest-json', (req, res) => {
	logServerON(port);
  console.log(`\n\x1b[36mPUT /public/manifest-json ...\x1b[0m\n`);

  const { 
		short_name, 
		name,
		width, 
		height,
	} = req.body;

  // 현재 스크립트의 디렉토리를 기준으로 manifest.json의 경로 생성
  const manifestPath = path.join(__dirname, '../../public/manifest.json');

  try {
    const manifestJson = fs.readFileSync(manifestPath, 'utf-8');
    const prevData = JSON.parse(manifestJson);
    const newData = { 
      ...prevData, 
			short_name: short_name || prevData.short_name,
			name: name || prevData.name,
			width: width || prevData.width,
			height: height || prevData.height,
    };

    fs.writeFileSync(manifestPath, JSON.stringify(newData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }
      res.send('manifest.json updated successfully!');
    });
  } catch (error) {
    console.error('Error updating manifest.json:', error);
    return res.status(500).send('An error occurred');
  } finally {
		logServerON(port);
		console.log(`\x1b[36mPUT /public/manifest-json Completed!\x1b[0m\n`);
	}
});

app.put('/public/index-html', (req, res) => {
	logServerON(port);
	console.log(`\n\x1b[36mPUT /public/index-html ...\x1b[0m\n`);

	const { 
		title, 
	} = req.body;

	// 현재 스크립트의 디렉토리를 기준으로 index.html의 경로 생성
	const indexPath = path.join(__dirname, '../../public/index.html');

	try {
		const preData = fs.readFileSync(indexPath, 'utf-8');
		let newData = preData;

		if (title) {
			newData = preData
				.replace(/<title>(.*)<\/title>/, `<title>${title}<\/title>`);
		}

		fs.writeFileSync(indexPath, newData, (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send('An error occurred');
			}
			res.send('index.html updated successfully!');
		});
	} catch (error) {
		console.error('Error updating index.html:', error);
		return res.status(500).send('An error occurred');
	} finally {
		logServerON(port);
		console.log(`\x1b[36mPUT /public/index-html Completed!\x1b[0m\n`);
	}
});

app.get('/build', (req, res) => {
	logServerON(port);
  console.log(`\n\x1b[36mStart Plug-in Item Package Build ...\x1b[0m\n`);

  try {
    // 동기적으로 npm run build 실행
    const buildStdout = execSync('npm run build');
		// console.log(buildStdout.toString());
    res.send(JSON.stringify({ message: buildStdout.toString() }));
  } catch (error) {
    console.error(`Error executing 'npm run build': ${error.stderr.toString()}`);
    res.status(500).send('An error occurred during npm run build');
  }

	logServerON(port);
  console.log(`\x1b[36mPlug-in Item Package Build Completed!\x1b[0m\n`);
});

const logServerON = () => {
	console.clear();
	console.log(`\n\x1b[32m┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ╔═╗╔╗╔\n└─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  ║ ║║║║\n└─┘└─┘┴└─ └┘ └─┘┴└─  ╚═╝╝╚╝\x1b[0m\n`);
  console.log(`Welcome, moaui-cra dev mode!\n`);
	console.log(`  %cPort:\t\t${port}`, 'font-weight: bold;');
	console.log(`  %cBase URL:\t%c${baseUrl}\n`, 'font-weight: bold;', 'font-weight: normal;');	
}

app.listen(port, () => {
	logServerON();
});
