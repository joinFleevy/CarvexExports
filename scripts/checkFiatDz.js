async function run() {
  try {
    const res = await fetch('https://www.fiat.dz/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log('fiat.dz status:', res.status);
    const html = await res.text();
    const imgs = [...new Set([...html.matchAll(/src=["']([^"']+\.(?:png|jpg|webp|jpeg))/gi)].map(m => m[1]))];
    console.log('Images on fiat.dz:', imgs.length);
    imgs.slice(0, 20).forEach(i => console.log(i));
  } catch(e) {
    console.log('Error:', e.message);
  }
}
run();
