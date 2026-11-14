const sharp = require('sharp');
const fs = require('fs');

async function cleanGeely() {
  const { data, info } = await sharp('public/images/cars/geely-gx3-pro.png').raw().toBuffer({ resolveWithObject: true });
  
  // Clean all faint shadow box pixels
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const a = data[idx + 3];

      // Any pixel outside the car body
      if (y < 1020 || y > 2800 || a < 45) {
        data[idx + 3] = 0; // pure transparent
      } else if (y > 2720) {
        // Smoothly fade contact shadow under tires
        const fade = (2800 - y) / 80;
        data[idx + 3] = Math.round(data[idx + 3] * Math.max(0, Math.min(1, fade)));
      }
    }
  }

  // Create cleaned png buffer
  const cleanedBuffer = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .extract({
    left: 0,
    top: 1020,
    width: 3300,
    height: 1780
  })
  .png()
  .toBuffer();

  const TARGET_WIDTH = 1376;
  const TARGET_HEIGHT = 768;

  // Scale to fit nicely at 1220px wide (matching Audi A4 and Opel Insignia!)
  const resizedCar = await sharp(cleanedBuffer)
    .resize({
      width: 1220,
      height: 600,
      fit: 'inside'
    })
    .toBuffer();

  const resizedMeta = await sharp(resizedCar).metadata();
  const left = Math.round((TARGET_WIDTH - resizedMeta.width) / 2);
  const top = Math.round((TARGET_HEIGHT - resizedMeta.height) / 2) + 25;

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
  .jpeg({ quality: 95 })
  .toFile('public/images/cars/geely-gx3-pro-studio.jpg');

  console.log('Generated PERFECT Geely GX3 Pro studio image without any box artifacts!');
}

cleanGeely();
