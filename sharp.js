const sharp = require('sharp');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/hero-image_2.jpg');
const to = path.resolve(__dirname, 'src/public/images/');

// small
sharp(target)
  .resize(480)
  .toFile(path.resolve(to, 'hero-image_2-small.jpg'));

// medium
sharp(target)
  .resize(800)
  .toFile(path.resolve(to, 'hero-image_2-medium.jpg'));
