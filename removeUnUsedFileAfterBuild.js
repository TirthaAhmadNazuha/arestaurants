const fs = require('fs');
const path = require('path');

const hashDeletedFile = [];
fs.readdirSync('dist').forEach((file) => {
  if (file.endsWith('LICENSE.txt')) {
    hashDeletedFile.push(file);
    fs.rmSync(path.join('dist', file));
  }
  if (file.includes('sw.bundle.js') && file.endsWith('.gz')) {
    hashDeletedFile.push(file);
    fs.rmSync(path.join('dist', file));
  }
});
if (hashDeletedFile.length) {
  console.log('Hash remove: ', ...hashDeletedFile);
} else console.log('Not removing file');
