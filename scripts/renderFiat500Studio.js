const sharp = require('sharp');

async function run() {
  const TARGET_WIDTH = 1376;
  const TARGET_HEIGHT = 768;
  const src = 'public/images/cars/fiat-500-hybrid-cutout.png';
  const out = 'public/images/cars/fiat-500-hybrid-studio.jpg';

  const maxW = Math.round(TARGET_WIDTH * 0.78);
  const maxH = Math.round(TARGET_HEIGHT * 0.72);

  const resizedCar = await sharp(src)
    .resize({
      width: maxW,
      height: maxH,
      fit: 'inside',
      withoutEnlargement: false
    })
    .toBuffer();

  const resizedMeta = await sharp(resizedCar).metadata();
  const left = Math.round((TARGET_WIDTH - resizedMeta.width) / 2);
  const top = Math.round((TARGET_HEIGHT - resizedMeta.height) / 2) + 20;

  await sharp({
    create: {
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
  .composite([
    {
      input: resizedCar,
      left: Math.max(0, left),
      top: Math.max(0, top)
    }
  ])
  .jpeg({ quality: 92 })
  .toFile(out);

  console.log('Saved fiat-500-hybrid-studio.jpg on pure white background!');
}

run();
