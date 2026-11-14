const fs = require('fs');

async function checkSite(name, url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log(name, 'status:', res.status);
    const html = await res.text();
    const imgs = [...html.matchAll(/(https?:\/\/[^"'\s)]+\.(?:png|jpg|jpeg|webp))/gi)].map(m => m[1]);
    const unique = [...new Set(imgs)];
    console.log(name, 'total images:', unique.length);
    unique.filter(u => /emgrand|coolray|starray|gx3|car|vehicle|slider/i.test(u)).slice(0, 10).forEach(u => console.log('  ', u));
  } catch(e) {
    console.log(name, 'error:', e.message);
  }
}

async function run() {
  const res = await fetch('https://geelyalgerie.dz/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const imgs = [...html.matchAll(/(https?:\/\/[^"'\s)]+\.(?:png|jpg|jpeg|webp))/gi)].map(m => m[1]);
  [...new Set(imgs)].forEach(i => console.log(i));
}
run();
