import fs from 'fs';
import https from 'https';

const pkg = JSON.parse(fs.readFileSync('package.json').toString());
const outPath = './web_modules/';

if (pkg.webDependencies) {
  for (let fileName in pkg.webDependencies) {
    https.get(pkg.webDependencies[fileName], (resp) => {
      let fileData = '';
      resp.on('data', (chunk) => {
        fileData += chunk;
      });
      resp.on('end', () => {
        if (!fs.existsSync(outPath)) {
          fs.mkdirSync(outPath);
        }
        fs.writeFileSync(outPath + fileName, fileData);
      });
    });
  }
}