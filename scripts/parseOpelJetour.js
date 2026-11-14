async function getImages(name, url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const imgs = [...new Set([...html.matchAll(/(?:src|srcset)=["']([^"']+\.(?:png|jpg|webp|jpeg))/gi)].map(m => m[1]))];
    console.log(`=== ${name} (${imgs.length} images) ===`);
    imgs.forEach(i => console.log('  ', i));
  } catch(e) {
    console.log(name, 'error:', e.message);
  }
}

async function run() {
  await getImages('Opel DZ', 'https://www.opel.dz/');
  await getImages('Jetour DZ', 'https://jetour.dz/');
}
run();
