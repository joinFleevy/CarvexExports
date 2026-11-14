const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('lib/vehiclesData.ts', 'utf8');

// Match all local image paths (/images/cars/...)
const imagePaths = [...new Set([...content.matchAll(/['"](\/images\/cars\/[^'"]+)['"]/g)].map(m => m[1]))];

console.log('Total unique local car image paths:', imagePaths.length);

let missing = 0;
for (const p of imagePaths) {
  const localFile = path.join('public', p);
  if (!fs.existsSync(localFile)) {
    console.error('MISSING FILE:', localFile);
    missing++;
  } else {
    const stats = fs.statSync(localFile);
    console.log('OK:', p, `(${stats.size} bytes)`);
  }
}

if (missing === 0) {
  console.log('ALL CAR IMAGES EXIST ON DISK AND ARE VERIFIED!');
} else {
  console.error(`ERROR: ${missing} files missing!`);
}
