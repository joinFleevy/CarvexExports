const fs = require('fs');

const cheryCars = [
  { id: 'chery-tiggo-2-pro', url: 'https://cheryalgerie.com/media/images/tiggo2pro__1_-removebg-preview.png' },
  { id: 'chery-tiggo-4-pro', url: 'https://cheryalgerie.com/media/images/tiggo-4-Pro_1-removebg-preview.png' },
  { id: 'chery-tiggo-7-pro', url: 'https://cheryalgerie.com/media/images/Tiggo_7_Pro_car_img_2023-07-27_141429.880174.png' },
  { id: 'chery-tiggo-8-pro', url: 'https://cheryalgerie.com/media/images/Tiggo_8_Pro_car_img_2022-12-04_083828.569234.png' },
  { id: 'chery-arrizo-5', url: 'https://cheryalgerie.com/media/images/Arrizo%205.png' },
  { id: 'chery-arrizo-8', url: 'https://cheryalgerie.com/media/images/Arrizo_8__1_-removebg-preview.png' }
];

async function downloadChery() {
  for (const car of cheryCars) {
    try {
      const res = await fetch(car.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(`public/images/cars/${car.id}.png`, buf);
      console.log(`Saved public/images/cars/${car.id}.png (${buf.length} bytes)`);
    } catch(e) {
      console.log(`Error ${car.id}:`, e.message);
    }
  }
}

downloadChery();
