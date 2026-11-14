async function getChery() {
  const res = await fetch('https://cheryalgerie.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const srcs = [...html.matchAll(/src=["']([^"']+\.(?:png|jpg|webp|jpeg))/gi)].map(m => m[1]);
  console.log('Total srcs:', srcs.length);
  [...new Set(srcs)].forEach(s => console.log(s));
}
getChery();
