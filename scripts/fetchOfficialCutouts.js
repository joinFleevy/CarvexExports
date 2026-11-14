const fs = require('fs');

async function searchCommons(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=3&prop=imageinfo&iiprop=url|size&format=json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages).map(p => ({
      title: p.title,
      url: p.imageinfo?.[0]?.url,
    })).filter(x => x.url && /\.(jpe?g|png|webp)$/i.test(x.url));
  } catch (e) {
    return [];
  }
}

async function run() {
  const queries = ['Yixuan', 'Geely Emgrand', 'Forthing T5', 'Fengon 500'];
  for (const q of queries) {
    const results = await searchCommons(q);
    console.log('Query:', q);
    results.forEach(r => console.log('  ', r.title, r.url));
  }
}

run();
