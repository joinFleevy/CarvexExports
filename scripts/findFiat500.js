const fs = require('fs');

async function run() {
  const res = await fetch('https://www.fiat.dz/modeles/fiat-500', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const imgs = [...new Set([...html.matchAll(/https?:\/\/[^"'<>\s]+\.(?:png|webp|jpg)/gi)].map(m => m[0]))];
  console.log('fiat-500 imgs on fiat.dz:', imgs.filter(i => i.includes('500') || i.includes('model') || i.includes('car') || i.includes('transp')));
}

run();
