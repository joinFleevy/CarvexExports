const fs = require('fs');
const path = require('path');

const downloads = [
  // Geely
  { url: 'https://geelylb.com/wp-content/uploads/2023/09/Coolray.png', dest: 'public/images/cars/geely-coolray.png' },
  { url: 'https://geelylb.com/wp-content/uploads/2025/09/StarRay-Plate-copy-1.png', dest: 'public/images/cars/geely-starray.png' },
  
  // Jetour
  { url: 'https://jetour.dz/wp-content/uploads/2024/10/t2.jpg', dest: 'public/images/cars/jetour-t2.jpg' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/10/dashing_info-2.png', dest: 'public/images/cars/jetour-dashing.png' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/dashing_int.jpg', dest: 'public/images/cars/jetour-dashing-interior-cockpit.jpg' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/dashing_int2.jpg', dest: 'public/images/cars/jetour-dashing-interior-console.jpg' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/dashing_int3.jpg', dest: 'public/images/cars/jetour-dashing-interior-seats.jpg' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/dashing_smartkey.jpg', dest: 'public/images/cars/jetour-dashing-interior-gear.jpg' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/a391e5e9-ecdc-483d-afae-c6fd3a573af0.png', dest: 'public/images/cars/jetour-x70-plus.png' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/x70plus_1.jpg', dest: 'public/images/cars/jetour-x70-interior-cockpit.jpg' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/x70plus_2.jpg', dest: 'public/images/cars/jetour-x70-interior-seats.jpg' },
  { url: 'https://jetour.dz/wp-content/uploads/2024/05/x70plus_3.jpg', dest: 'public/images/cars/jetour-x70-interior-console.jpg' },

  // Opel
  { url: 'https://www.opel.fr/content/dam/opel/master/vehicles/carousel/cars/mokka/OPEL_Mokka_srgb.png', dest: 'public/images/cars/opel-mokka.png' },
  { url: 'https://www.opel.fr/content/dam/opel/master/vehicles/carousel/cars/grandland/OPEL_Grandland_srgb.png', dest: 'public/images/cars/opel-grandland.png' },
  { url: 'https://www.opel.fr/content/dam/opel/master/vehicles/carousel/cars/astra/OPEL_Astra_HB-MCM_srgb.png', dest: 'public/images/cars/opel-astra.png' },

  // BAIC
  { url: 'https://baic.ph/wp-content/uploads/2026/03/baic-b40-ProTrailmaster-model-slider.webp', dest: 'public/images/cars/baic-bj40-plus.webp' },
  { url: 'https://baic.ph/wp-content/uploads/2026/03/baic-x55-Verve-model-slider.webp', dest: 'public/images/cars/baic-x55.webp' }
];

async function downloadAll() {
  for (const item of downloads) {
    try {
      console.log('Downloading', item.url, '->', item.dest);
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
      if (!res.ok) {
        console.log('Failed:', res.status, item.url);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.dest, buffer);
      console.log('Saved', item.dest, buffer.length, 'bytes');
    } catch (e) {
      console.log('Error downloading', item.url, e.message);
    }
  }
}

downloadAll();
