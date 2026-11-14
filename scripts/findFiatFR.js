const fs = require('fs');

async function run() {
  const res = await fetch('https://www.fiat.fr/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const imgs = [...new Set([...html.matchAll(/(?:src|srcset)=["']([^"']+\.png)/gi)].map(m => m[1]))];
  console.log('Fiat FR PNGs:', imgs.filter(i => i.includes('500') || i.includes('carousel') || i.includes('model') || i.includes('range')));
}

run();
