const express = require('express');
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

app.post('/update-manifest', (req, res) => {
  const { width, height } = req.body;

  // 현재 스크립트의 디렉토리를 기준으로 manifest.json의 경로 생성
  const manifestPath = path.join(__dirname, '../../public/manifest.json');

  try {
    const manifestJson = fs.readFileSync(manifestPath, 'utf-8');
    const prevData = JSON.parse(manifestJson);
    const newData = { 
      ...prevData, 
      width: width,
      height: height,
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
  }
});

app.listen(port, () => {
	console.log(`\n\x1b[32m┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ╔═╗╔╗╔\n└─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  ║ ║║║║\n└─┘└─┘┴└─ └┘ └─┘┴└─  ╚═╝╝╚╝\x1b[0m\n`);
  console.log(`Welcome, moaui-cra dev mode!\n`);
	console.log(`  %cPort:\t\t${port}`, 'font-weight: bold;');
	console.log(`  %cBase URL:\t%c${baseUrl}\n`, 'font-weight: bold;', 'font-weight: normal;');
});
