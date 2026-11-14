async function checkPngImg(brand) {
  try {
    const res = await fetch(`https://pngimg.com/uploads/${brand}/`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    const imgs = [...html.matchAll(/src="(\/uploads\/[^"]+\.png)"/g)].map(m => 'https://pngimg.com' + m[1]);
    console.log(`pngimg ${brand}: found ${imgs.length} images:`);
    console.log(imgs.slice(0, 5));
  } catch(e) {
    console.log('Error:', e.message);
  }
}

checkPngImg('fiat');
checkPngImg('opel');
