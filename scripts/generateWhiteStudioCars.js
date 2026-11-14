const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET_WIDTH = 1376;
const TARGET_HEIGHT = 768;

// All cars with transparent cutouts to render onto pure white studio cyclorama background (#ffffff)
const carsToProcess = [
  { src: 'public/images/cars/geely-gx3-pro.png', out: 'public/images/cars/geely-gx3-pro-studio.jpg' },
  { src: 'public/images/cars/geely-coolray.png', out: 'public/images/cars/geely-coolray-studio.jpg' },
  { src: 'public/images/cars/geely-starray.png', out: 'public/images/cars/geely-starray-studio.jpg' },
  
  // Chery
  { src: 'public/images/cars/chery-tiggo-8-pro.png', out: 'public/images/cars/chery-tiggo-8-pro-studio.jpg' },
  { src: 'public/images/cars/chery-arrizo-8.png', out: 'public/images/cars/chery-arrizo-8-studio.jpg' },
  { src: 'public/images/cars/chery-tiggo-7-pro.png', out: 'public/images/cars/chery-tiggo-7-pro-studio.jpg' },
  { src: 'public/images/cars/chery-tiggo-4-pro.png', out: 'public/images/cars/chery-tiggo-4-pro-studio.jpg' },
  { src: 'public/images/cars/chery-tiggo-2-pro.png', out: 'public/images/cars/chery-tiggo-2-pro-studio.jpg' },
  { src: 'public/images/cars/chery-arrizo-5.png', out: 'public/images/cars/chery-arrizo-5-studio.jpg' },

  // Fiat
  { src: 'public/images/cars/fiat-tipo.png', out: 'public/images/cars/fiat-tipo-studio.jpg' },
  { src: 'public/images/cars/fiat-titano.png', out: 'public/images/cars/fiat-titano-studio.jpg' },
  { src: 'public/images/cars/fiat-doblo.png', out: 'public/images/cars/fiat-doblo-studio.jpg' },
  { src: 'public/images/cars/fiat-500x-kv.png', out: 'public/images/cars/fiat-500x-studio.jpg' },
  { src: 'public/images/cars/fiat-scudo-kv.png', out: 'public/images/cars/fiat-scudo-studio.jpg' },
  { src: 'public/images/cars/fiat-ducato-kv.png', out: 'public/images/cars/fiat-ducato-studio.jpg' },

  // Opel
  { src: 'public/images/cars/opel-mokka.png', out: 'public/images/cars/opel-mokka-studio.jpg' },
  { src: 'public/images/cars/opel-grandland.png', out: 'public/images/cars/opel-grandland-studio.jpg' },
  { src: 'public/images/cars/opel-astra.png', out: 'public/images/cars/opel-astra-studio.jpg' },

  // Jetour
  { src: 'public/images/cars/jetour-dashing.png', out: 'public/images/cars/jetour-dashing-studio.jpg' },
  { src: 'public/images/cars/jetour-x70-plus.png', out: 'public/images/cars/jetour-x70-plus-studio.jpg' },

  // BAIC
  { src: 'public/images/cars/baic-bj40-plus.webp', out: 'public/images/cars/baic-bj40-plus-studio.jpg' },
  { src: 'public/images/cars/baic-x55.webp', out: 'public/images/cars/baic-x55-studio.jpg' }
];

async function compositeOnWhite(item) {
  if (!fs.existsSync(item.src)) {
    console.log('File does not exist:', item.src);
    return;
  }

  try {
    const meta = await sharp(item.src).metadata();
    
    // Fit car inside 1150 x 580 so it has breathing room on the 1376 x 768 white canvas
    const maxW = Math.round(TARGET_WIDTH * 0.82);
    const maxH = Math.round(TARGET_HEIGHT * 0.72);

    const resizedCar = await sharp(item.src)
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

    // Solid #ffffff canvas with smooth studio rendering
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
    .toFile(item.out);

    console.log('Rendered studio car on pure white:', item.out);
  } catch (e) {
    console.log('Error compositing', item.src, e.message);
  }
}

async function run() {
  for (const item of carsToProcess) {
    await compositeOnWhite(item);
  }
}

run();
