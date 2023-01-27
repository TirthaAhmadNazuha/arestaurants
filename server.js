/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();

app.get('*.js', (req, res) => {
  try {
    if (req.url.includes('sw.bundle')) {
      res.sendFile(path.resolve(__dirname, `dist/${req.url}`));//
      return;
    }
    if (req.headers['accept-encoding'].includes('gzip')) {
      res.set('Content-Encoding', 'gzip');
      res.sendFile(path.resolve(__dirname, `dist/${req.url}.gz`));
      return;
    }
    res.sendFile(path.resolve(__dirname, `dist/${req.url}`));
  } catch (err) {
    console.error(err);
    res.sendFile(path.resolve(__dirname, `dist/${req.url}`));
  }
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(8080, () => console.log('Server runner in: ', 'http://localhost:8080/'));
