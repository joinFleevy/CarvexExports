const fs = require('fs');

const cheryPages = [
  { id: 'chery-arrizo-5', path: 'en/car/arrizo-5.html' },
  { id: 'chery-tiggo-2-pro', path: 'en/car/tiggo-2-pro.html' },
  { id: 'chery-tiggo-4-pro', path: 'en/car/tiggo-4-pro.html' },
  { id: 'chery-tiggo-7-pro', path: 'en/car/tiggo-7-pro.html' },
  { id: 'chery-tiggo-8-pro', path: 'en/car/tiggo-8-pro.html' },
  { id: 'chery-arrizo-8', path: 'en/car/arrizo-8.html' }
];

async function downloadCheryInteriors() {
  for (const item of cheryPages) {
    const url = `https://cheryalgerie.com/${item.path}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const imgs = [...new Set([...html.matchAll(/(?:src|data-src)=["']([^"']+\.(?:png|jpg|jpeg|webp))["']/gi)].map(m => m[1]))];
      console.log(`=== ${item.id} (${imgs.length} images) ===`);
      const interiorImgs = imgs.filter(i => /interior|cockpit|steering|seat|console|inside|dash|tab|car_interior|wheel/i.test(i) || i.includes('media/images') || i.includes('media/Interior'));
      console.log(interiorImgs.slice(0, 10));
      
      let count = 1;
      for (const imgPath of interiorImgs.slice(0, 5)) {
        const fullImgUrl = imgPath.startsWith('http') ? imgPath : `https://cheryalgerie.com/${imgPath.replace(/^\//, '')}`;
        try {
          const imgRes = await fetch(fullImgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
          if (imgRes.ok) {
            const buf = Buffer.from(await imgRes.arrayBuffer());
            const ext = imgPath.includes('.png') ? 'png' : 'jpg';
            const filename = `public/images/cars/${item.id}-interior-${count}.${ext}`;
            fs.writeFileSync(filename, buf);
            console.log(`  Saved ${filename} (${buf.length} bytes)`);
            count++;
          }
        } catch(e) {
          console.log(`  Failed ${fullImgUrl}:`, e.message);
        }
      }
    } catch(e) {
      console.log(`Error ${item.id}:`, e.message);
    }
  }
}

downloadCheryInteriors();
