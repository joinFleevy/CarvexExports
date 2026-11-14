const fs = require('fs');

const fiatAssets = [
  { id: 'fiat-tipo', path: '/content/dam/fiat2023/dz/dz/my23/home/canvas-hp/tipo/278x143.png' },
  { id: 'fiat-titano', path: '/content/dam/fiat2023/dz/dz/titano/278x143.png' },
  { id: 'fiat-500x', path: '/content/dam/fiat2023/dz/dz/my23/model-menu/500X-Cult-menu-Portrait-278x143.jpg' },
  { id: 'fiat-doblo', path: '/content/dam/fiat2023/dz/dz/my24/doblo/nouveau_doblo/doblo-vitré/menudoblocombi.png' },
  { id: 'fiat-ducato', path: '/content/dam/fiat2023/dz/dz/my23/model-menu/Ducato-menu-Portrait-278x143.jpg' },
  { id: 'fiat-scudo', path: '/content/dam/fiat2023/dz/dz/my23/model-menu/Scudo-menu-Portrait-278x143.jpg' },
  { id: 'fiat-500', path: '/content/dam/fiat2023/dz/dz/500-500c/menu-modelli/500_278x143.jpg' }
];

async function downloadFiat() {
  for (const item of fiatAssets) {
    try {
      const url = `https://www.fiat.dz${encodeURI(item.path)}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        const ext = item.path.includes('.png') ? 'png' : 'jpg';
        const filename = `public/images/cars/${item.id}.${ext}`;
        fs.writeFileSync(filename, buf);
        console.log(`Saved ${filename} (${buf.length} bytes)`);
      } else {
        console.log(`Failed ${item.id}: ${res.status}`);
      }
    } catch(e) {
      console.log(`Error ${item.id}:`, e.message);
    }
  }
}

downloadFiat();
