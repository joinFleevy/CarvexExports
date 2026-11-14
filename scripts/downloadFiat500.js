const fs = require('fs');

async function run() {
  const url = 'https://www.fiat.fr/content/dam/fiat2023/fr/fiat-world/news/500-hybrid-dolcevita/canvas/v2/mobile.png';
  console.log('Downloading Fiat 500 Hybrid cutout:', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync('public/images/cars/fiat-500-hybrid-cutout.png', buf);
    console.log('Saved fiat-500-hybrid-cutout.png, size:', buf.length);
  } else {
    console.log('Failed:', res.status);
  }
}

run();
