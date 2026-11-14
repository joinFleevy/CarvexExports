const fs = require('fs');

async function run() {
  const res = await fetch('https://jetour.dz/t2/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const imgs = [...new Set([...html.matchAll(/(https:\/\/jetour\.dz\/wp-content\/uploads\/[^\s"']+\.(?:png|jpg|jpeg|webp))/gi)].map(m => m[0]))];
  console.log('Jetour T2 page all imgs:', imgs);
}

run();
