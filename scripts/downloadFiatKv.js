const fs = require('fs');

const fiatKv = [
  { id: 'fiat-tipo-kv.png', path: '/content/dam/fiat2023/dz/dz/my24/new-kv-dimensions-d2/home/tipo/mobile.png' },
  { id: 'fiat-500x-kv.png', path: '/content/dam/fiat2023/dz/dz/my24/new-kv-dimensions-d2/home/500x/mobile.png' },
  { id: 'fiat-titano-kv.png', path: '/content/dam/fiat2023/dz/dz/my24/new-kv-dimensions-d2/home/titano/mobile.png' },
  { id: 'fiat-ducato-kv.png', path: '/content/dam/fiat2023/dz/dz/my24/new-kv-dimensions-d2/home/ducato/mobile.png' },
  { id: 'fiat-scudo-kv.png', path: '/content/dam/fiat2023/dz/dz/my24/new-kv-dimensions-d2/scudo/mobile.png' }
];

async function run() {
  for (const item of fiatKv) {
    try {
      const url = `https://www.fiat.dz${encodeURI(item.path)}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(`public/images/cars/${item.id}`, buf);
        console.log(`Saved ${item.id} (${buf.length} bytes)`);
      } else {
        console.log(`Failed ${item.id}: ${res.status}`);
      }
    } catch(e) {
      console.log(`Error ${item.id}:`, e.message);
    }
  }
}

run();
