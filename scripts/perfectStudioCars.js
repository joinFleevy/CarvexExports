const sharp = require('sharp');
const fs = require('fs');

async function processCar(srcPath, outPath, targetW = 1376, targetH = 768) {
  try {
    // 1. Trim transparent padding
    const trimmedBuffer = await sharp(srcPath)
      .trim()
      .toBuffer();

    const trimmedMeta = await sharp(trimmedBuffer).metadata();
    console.log(srcPath, 'trimmed size:', trimmedMeta.width, 'x', trimmedMeta.height);

    // 2. Resize to fit nicely in 1220 x 600
    const desiredCarWidth = Math.min(1240, Math.round(targetW * 0.88));
    const desiredCarHeight = Math.min(620, Math.round(targetH * 0.78));

    const resizedCar = await sharp(trimmedBuffer)
      .resize({
        width: desiredCarWidth,
        height: desiredCarHeight,
        fit: 'inside',
        withoutEnlargement: false
      })
      .toBuffer();

    const resizedMeta = await sharp(resizedCar).metadata();
    const left = Math.round((targetW - resizedMeta.width) / 2);
    const top = Math.round((targetH - resizedMeta.height) / 2) + 20;

    // 3. Composite onto pure white #ffffff
    await sharp({
      create: {
        width: targetW,
        height: targetH,
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
    .jpeg({ quality: 95 })
    .toFile(outPath);

    console.log('Successfully generated seamless pure white studio photo:', outPath);
  } catch (e) {
    console.error('Error processing', srcPath, e.message);
  }
}

async function run() {
  const cars = [
    { src: 'public/images/cars/geely-gx3-pro.png', out: 'public/images/cars/geely-gx3-pro-studio.jpg' },
    { src: 'public/images/cars/geely-coolray.png', out: 'public/images/cars/geely-coolray-studio.jpg' },
    { src: 'public/images/cars/geely-starray.png', out: 'public/images/cars/geely-starray-studio.jpg' },
    { src: 'public/images/cars/chery-tiggo-8-pro.png', out: 'public/images/cars/chery-tiggo-8-pro-studio.jpg' },
    { src: 'public/images/cars/chery-arrizo-8.png', out: 'public/images/cars/chery-arrizo-8-studio.jpg' },
    { src: 'public/images/cars/chery-tiggo-7-pro.png', out: 'public/images/cars/chery-tiggo-7-pro-studio.jpg' },
    { src: 'public/images/cars/chery-tiggo-4-pro.png', out: 'public/images/cars/chery-tiggo-4-pro-studio.jpg' },
    { src: 'public/images/cars/chery-tiggo-2-pro.png', out: 'public/images/cars/chery-tiggo-2-pro-studio.jpg' },
    { src: 'public/images/cars/chery-arrizo-5.png', out: 'public/images/cars/chery-arrizo-5-studio.jpg' },
    { src: 'public/images/cars/fiat-500-hybrid-cutout.png', out: 'public/images/cars/fiat-500-hybrid-studio.jpg' },
    { src: 'public/images/cars/fiat-tipo.png', out: 'public/images/cars/fiat-tipo-studio.jpg' },
    { src: 'public/images/cars/fiat-titano.png', out: 'public/images/cars/fiat-titano-studio.jpg' },
    { src: 'public/images/cars/fiat-doblo.png', out: 'public/images/cars/fiat-doblo-studio.jpg' },
    { src: 'public/images/cars/fiat-500x-kv.png', out: 'public/images/cars/fiat-500x-studio.jpg' },
    { src: 'public/images/cars/fiat-scudo-kv.png', out: 'public/images/cars/fiat-scudo-studio.jpg' },
    { src: 'public/images/cars/fiat-ducato-kv.png', out: 'public/images/cars/fiat-ducato-studio.jpg' },
    { src: 'public/images/cars/opel-mokka.png', out: 'public/images/cars/opel-mokka-studio.jpg' },
    { src: 'public/images/cars/opel-grandland.png', out: 'public/images/cars/opel-grandland-studio.jpg' },
    { src: 'public/images/cars/opel-astra.png', out: 'public/images/cars/opel-astra-studio.jpg' },
    { src: 'public/images/cars/jetour-dashing.png', out: 'public/images/cars/jetour-dashing-studio.jpg' },
    { src: 'public/images/cars/jetour-x70-plus.png', out: 'public/images/cars/jetour-x70-plus-studio.jpg' },
    { src: 'public/images/cars/baic-bj40-plus.webp', out: 'public/images/cars/baic-bj40-plus-studio.jpg' },
    { src: 'public/images/cars/baic-x55.webp', out: 'public/images/cars/baic-x55-studio.jpg' }
  ];

  for (const c of cars) {
    if (fs.existsSync(c.src)) {
      await processCar(c.src, c.out);
    }
  }
}

run();
